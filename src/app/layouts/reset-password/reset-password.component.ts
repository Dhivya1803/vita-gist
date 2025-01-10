import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css','../../shared/styles/common.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParams['token'];
    if (!this.token) {
      this.snackBar.open('Invalid reset token', 'Close', { duration: 3000 });
      this.router.navigate(['/login']);
    }
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      this.isLoading = true;
      const newPassword = this.resetForm.get('password')?.value;

      this.authService.resetPassword(this.token, newPassword).subscribe({
        next: () => {
          this.snackBar.open('Password reset successful! Please login with your new password.', 'Close', { duration: 5000 });
          this.router.navigate(['/login']);
        },
        error: (error: string) => {
          this.snackBar.open(error, 'Close', { duration: 3000 });
          this.isLoading = false;
        }
      });
    }
  }
}
