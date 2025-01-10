import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSelectChange } from '@angular/material/select';

interface DocumentCategory {
  id: string;
  title: string; // Updated to include title
  icon: string;
  documentTypes?: string[]; // Added documentTypes
}

@Component({
  selector: 'app-add-document-dialog',
  templateUrl: './add-document-dialog.component.html',
  styleUrls: ['./add-document-dialog.component.scss']
})
export class AddDocumentDialogComponent {
  documentForm: FormGroup;
  selectedFiles: File[] = [];
  uploadProgress: number = 0;
  isUploading: boolean = false;
  isIdentitySelected: boolean = false;
  currentStep: number = 1;
  tags: string[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  dialogMode: 'add' | 'edit';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddDocumentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      mode: 'add' | 'edit',
      document?: any,
      categories: DocumentCategory[],
      defaultCategory?: string
    }
  ) {
    this.dialogMode = data.mode;
    this.documentForm = this.createForm();
    if (this.dialogMode === 'edit' && data.document) {
      this.tags = [...data.document.tags];
      this.documentForm.patchValue(data.document);
      this.currentStep = 2; // Skip file upload step for edit mode
    }
  }

  ngOnInit() {
    this.documentForm.get('categories')?.valueChanges.subscribe(categories => {
      this.isIdentitySelected = categories.includes('identity');
      this.updateValidators();
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      id: [this.data.document?.id || ''],
      name: [this.data.document?.name || '', Validators.required],
      description: [this.data.document?.description || '', Validators.required],
      categories: [this.data.document?.categories || [this.data.defaultCategory], Validators.required],
      documentType: [this.data.document?.documentType || ''],
      documentId: [this.data.document?.documentId || ''],
      files: [[], this.dialogMode === 'add' ? Validators.required : null],
      expirationDate: [this.data.document?.expirationDate || ''],
      tags: [this.data.document?.tags || []]
    });
  }

  private updateValidators() {
    const documentTypeControl = this.documentForm.get('documentType');
    const documentIdControl = this.documentForm.get('documentId');

    if (this.isIdentitySelected) {
      documentTypeControl?.setValidators(Validators.required);
      documentIdControl?.setValidators(Validators.required);
    } else {
      documentTypeControl?.clearValidators();
      documentIdControl?.clearValidators();
    }

    documentTypeControl?.updateValueAndValidity();
    documentIdControl?.updateValueAndValidity();
  }

  onCategorySelect(event: MatSelectChange): void {
    const selectedCategories = event.value as string[];
    this.isIdentitySelected = selectedCategories.includes('identity');
    if (this.isIdentitySelected) {
      this.documentForm.patchValue({
        categories: ['identity']
      });
    }
  }

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFiles = Array.from(input.files);
      this.documentForm.patchValue({ files: this.selectedFiles });

      // Auto-fill form fields based on first file
      const firstFile = this.selectedFiles[0];
      this.documentForm.patchValue({
        name: firstFile.name,
        description: firstFile.name
      });

      this.startUpload();
    }
  }

  private startUpload(): void {
    this.isUploading = true;
    this.uploadProgress = 0;

    // Simulate upload progress
    const interval = setInterval(() => {
      this.uploadProgress += 5;
      if (this.uploadProgress >= 100) {
        clearInterval(interval);
        this.isUploading = false;
      }
    }, 100);
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  moveToNextStep(): void {
    if (this.currentStep === 1 && this.dialogMode === 'add') {
      if (this.documentForm.get('categories')?.valid && this.selectedFiles.length > 0) {
        this.currentStep = 2;
        if (this.selectedFiles[0]?.name) {
          this.documentForm.patchValue({
            name: this.selectedFiles[0].name,
            description: this.selectedFiles[0].name,
          });
        }
      }
    } else if (this.currentStep === 2 || this.dialogMode === 'edit') {
      if (this.documentForm.valid) {
        const formData = {
          ...this.documentForm.value,
          tags: this.tags,
          files: this.selectedFiles
        };
        this.dialogRef.close(formData);
      }
    }
  }

  removeFile(index: number): void {
    this.selectedFiles = this.selectedFiles.filter((_, i) => i !== index);
    if (this.selectedFiles.length === 0) {
      this.documentForm.get('files')?.setErrors({ required: true });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getFileSize(file: File): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    let size = file.size;
    let i = 0;
    while (size >= 1024 && i < sizes.length - 1) {
      size /= 1024;
      i++;
    }
    return `${size.toFixed(2)} ${sizes[i]}`;
  }

}
