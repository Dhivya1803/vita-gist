import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrl: './add-category-dialog.component.css'
})
export class AddCategoryDialogComponent {
  categoryName: string = '';
  selectedIconIndex: number | null = null;
  icons: string[] = ['business','redeem','class','room','shopping_cart','store','supervisor_account','track_changes','security','directions_car','local_offer','cloud','account_balance','assessment','face', 'management','attach_money']; // Example icons

  constructor(
    public dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  selectIcon(index: number): void {
    this.selectedIconIndex = index;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.categoryName && this.selectedIconIndex !== null) {
      this.dialogRef.close({
        name: this.categoryName,
        icon: this.icons[this.selectedIconIndex],
      });
    }
  }
}
