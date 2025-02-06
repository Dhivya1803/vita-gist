import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Country {
  code: string;
  name: string;
  flag: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../../shared/styles/common.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  isLoading: boolean = false;
  errorMessage: string = '';
  countries: Country[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', [Validators.required]],
      country: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.loadCountries();
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  private loadCountries(): void {
    this.countries = [
      { code: 'US', name: 'United States', flag: 'usa.png' },
      { code: 'UK', name: 'United Kingdom', flag: 'uk.png' },
    ];
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const userData = {
        firstName: this.registerForm.get('firstName')?.value,
        lastName: this.registerForm.get('lastName')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        country: this.registerForm.get('country')?.value
      };

      this.authService.register(userData).subscribe({
        next: (response) => {
          this.snackBar.open('Registration successful! Verify your email.', 'Close', { duration: 3000 });
          this.router.navigate(['/verify-email'], { 
            queryParams: { 
              email: userData.email 
            } 
          });
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
          this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
        }
      });
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}