import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ForgotPasswordComponent } from './forgot-password.component';

const routes: Routes = [
  { path: '', component: ForgotPasswordComponent } // Load DashboardComponent at the root of this module
];

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild(routes)
  ]
})
export class ForgotPasswordModule { }
