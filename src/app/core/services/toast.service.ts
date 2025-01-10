// toast.service.ts
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  showToast(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Close', {
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}