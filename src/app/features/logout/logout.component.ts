import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logout',
  host: { 'custom-attr': 'unique-id' }, 
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  // constructor(
  //   public dialogRef: MatDialogRef<LogoutComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: any,
  //   private router: Router // Inject MAT_DIALOG_DATA if needed
  // ) {}

  // onCancel(): void {
  //   this.dialogRef.close(false);
  // }

  // onConfirm(): void {
  //   this.dialogRef.close(true);
  // }
}
