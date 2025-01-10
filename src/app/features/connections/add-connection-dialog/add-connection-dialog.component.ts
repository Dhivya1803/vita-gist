import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-connection-dialog',
  templateUrl: './add-connection-dialog.component.html',
  styleUrls: ['./add-connection-dialog.component.scss']
})
export class AddConnectionDialogComponent {
  searchForm: FormGroup;
  selectedCategories: string[] = [];
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddConnectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.searchForm = this.fb.group({
      categories: ['', Validators.required],
      searchQuery: ['']
    });
  }

  onCategoryChange(event: any) {
    this.selectedCategories = event.value;
  }

  onSearch() {
    // Implement search functionality
  }

  sendRequest(connection: any) {
    this.dialogRef.close({
      ...connection,
      categories: this.selectedCategories
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}