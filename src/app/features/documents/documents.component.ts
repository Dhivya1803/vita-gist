import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';
import { StorageserviceService } from '../../core/services/storageservice.service';
import { AddDocumentDialogComponent } from './add-document-dialog/add-document-dialog.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

interface Document {
  id: string;
  name: string;
  category: string[];
  documentType?: string; // For identity documents
  documentId?: string; // For identity documents
  uploadDate: Date;
  expirationDate?: Date;
  description: string;
  fileSize: string;
  tags: string[];
  thumbnail?: string;
  fileData?: File;
  fileDataUrl?:string;
  previewUrl?: SafeUrl;
  mimeType?: string;
  uploadProgress?: number;
}

interface DocumentCategory {
  id: string;
  title: string;
  count: number;
  icon: string;
  isActive: boolean;
  documentTypes?: string[]; // For identity category
}

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  viewMode: 'grid' | 'list' = 'list';
  sortBy: string = 'name';
  searchQuery: string = '';
  displayedColumns: string[] = [
    'name',
    'description',
    'uploadedOn',
    'expiringOn',
    'tags',
    'actions'
  ];
  sortOptions = [
    { label: 'Sort by Name', icon: 'sort_by_alpha', action: () => this.onSort('name') },
    { label: 'Sort by Date', icon: 'date_range', action: () => this.onSort('date') },
  ];

  dropdownOptions = [
    { label: 'Document', icon: 'description', action: this.onAddDocument.bind(this) },
    { label: 'Category', icon: 'category', action: this.onAddCategory.bind(this) },
  ];


  documents: Document[] = [];
  private allDocuments: Document[] = [];
  pageSize = 10;
  currentPage = 0;
  totalDocuments = 0;

  documentCategories: DocumentCategory[] = [
    { 
      id: 'identity', 
      title: 'Identity', 
      count: 0, 
      icon: 'person', 
      isActive: false,
      documentTypes: ['Aadhar', 'Passport', 'Driver License', 'Voter Id']
    },
    { id: 'health', title: 'Health', count: 0, icon: 'favorite', isActive: false },
    { id: 'legal', title: 'Legal', count: 0, icon: 'gavel', isActive: false },
    { id: 'personal', title: 'Personal', count: 0, icon: 'folder', isActive: true },
  ];

  // Add new properties for file preview
  previewDocument: Document | null = null;
  isPreviewOpen = false;


  constructor(
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private storageService: StorageserviceService
  ) {}

  ngOnInit(): void {
    this.loadDocuments();
    this.updateDocumentCounts();
    this.filterAndUpdateDocuments();
  }

  private loadDocuments(): void {
    try {
      const storedDocuments = this.storageService.getItem('documents');
      if (storedDocuments) {
        this.allDocuments = JSON.parse(storedDocuments).map((doc: any) => ({
          ...doc,
          uploadDate: new Date(doc.uploadDate),
          expirationDate: doc.expirationDate ? new Date(doc.expirationDate) : undefined,
          category: Array.isArray(doc.category) ? doc.category : [doc.category],
          previewUrl: doc.fileDataUrl ? this.sanitizer.bypassSecurityTrustUrl(doc.fileDataUrl) : undefined
        }));
      }
    } catch (error) {
      console.error('Failed to load documents:', error);
      this.allDocuments = [];
    }
  }



  private saveDocuments(): void {
    try {
      const documentsToSave = this.allDocuments.map((doc) => {
        const { fileData, previewUrl, ...docToSave } = doc;
        return docToSave;
      });
  
      const documentsString = JSON.stringify(documentsToSave);
  
      // Check if the size is within limits
      if (this.isStorageAvailable(documentsString)) {
        this.storageService.setItem('documents', documentsString);
      } else {
        console.error('Failed to save documents: Storage quota exceeded');
      }
    } catch (error) {
      console.error('Failed to save documents:', error);
    }
  }
  
  // Helper function to check localStorage quota
  private isStorageAvailable(data: string): boolean {
    try {
      const testKey = 'test';
      localStorage.setItem(testKey, data);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
  

  toggleView(): void {
    this.viewMode = this.viewMode === 'list' ? 'grid' : 'list';
  }

  onSort(criteria: string): void {
    this.sortBy = criteria;
    this.filterAndUpdateDocuments();
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  onAddDocument(category?: string): void {
    const dialogRef = this.dialog.open(AddDocumentDialogComponent, {
      width: '600px',
      panelClass: 'document-dialog',
      disableClose: true,
      data: { 
        mode: 'add',
        defaultCategory: category || 'personal',
        categories: this.documentCategories,
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.handleDocumentUpload(result);
      }
    });
  }

  async handleDocumentUpload(result: any): Promise<void> {
    const file = result.files[0];
    
    // Create new document object
    const newDocument: Document = {
      id: (this.allDocuments.length + 1).toString(),
      name: result.name,
      category: result.categories,
      documentType: result.documentType,
      documentId: result.documentId,
      uploadDate: new Date(),
      description: result.description,
      fileSize: this.calculateFileSize(file),
      tags: result.tags,
      expirationDate: result.expirationDate,
      fileData: file,
      mimeType: file.type,
      uploadProgress: 0,
      // previewUrl: file.type.startsWith('image/') ? this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file)) : undefined
    };

    // Simulate file upload progress
    const uploadInterval = setInterval(() => {
      if (newDocument.uploadProgress! < 100) {
        newDocument.uploadProgress! += 10;
        this.updateDocument(newDocument);
      } else {
        clearInterval(uploadInterval);
        this.finalizeDocumentUpload(newDocument);
      }
    }, 300);

    this.allDocuments.push(newDocument);
    this.filterAndUpdateDocuments();
    this.updateDocumentCounts();
  }

  private async fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  private updateDocument(document: Document): void {
    const index = this.allDocuments.findIndex(doc => doc.id === document.id);
    if (index !== -1) {
      this.allDocuments[index] = document;
      this.filterAndUpdateDocuments();
    }
  }

  private finalizeDocumentUpload(document: Document): void {
    document.uploadProgress = 100;
    this.updateDocument(document);
    this.saveDocuments();
  }


  private calculateFileSize(file: File): string {
    const sizeInBytes = file.size;
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return sizeInMB.toFixed(2) + ' MB';
  }

  private updateDocumentCounts(): void {
    this.documentCategories.forEach((card) => {
      card.count = this.allDocuments.filter(
        (doc) => doc.category.some(cat => cat.toLowerCase() === card.id)
      ).length;
    });
  }

  setActiveDocument(selectedId: string): void {
    this.documentCategories = this.documentCategories.map((card) => ({
      ...card,
      isActive: card.id === selectedId,
    }));
    this.filterAndUpdateDocuments();
  }

  public filterAndUpdateDocuments(): void {
    let filteredDocs = this.filterDocuments();
    this.totalDocuments = filteredDocs.length;
    this.documents = this.getPaginatedDocuments(filteredDocs);
  }

  private filterDocuments(): Document[] {
    let filteredDocs = [...this.allDocuments];

    const activeCard = this.documentCategories.find((card) => card.isActive);
    if (activeCard) {
      filteredDocs = filteredDocs.filter(
        (doc) => doc.category.some(cat => cat.toLowerCase() === activeCard.id)
      );
    }

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filteredDocs = filteredDocs.filter(
        (doc) =>
          doc.name.toLowerCase().includes(query) ||
          doc.description.toLowerCase().includes(query) ||
          doc.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    filteredDocs.sort((a, b) => {
      if (this.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (this.sortBy === 'date') {
        return b.uploadDate.getTime() - a.uploadDate.getTime();
      }
      return 0;
    });

    return filteredDocs;
  }

  onDocumentAction(action: string, document: Document): void {
    switch (action) {
      case 'view':
        this.viewDocument(document);
        break;
      case 'edit':
        this.editDocument(document);
        break;
      case 'share':
        this.shareDocument(document);
        break;
      case 'download':
        this.downloadDocument(document);
        break;
      case 'delete':
        this.deleteDocument(document);
        break;
    }
  }

  viewDocument(document: Document): void {
    if (document.fileData) {
      if (!document.previewUrl) {
        document.previewUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(document.fileData));
      }
      this.openPreview(document);
    } else {
      console.error('No file data available for preview');
    }

  }

  editDocument(document: Document): void {
    const dialogRef = this.dialog.open(AddDocumentDialogComponent, {
      width: '600px',
      panelClass: 'document-dialog',
      disableClose: true,
      data: { 
        mode: 'edit',
        document: { ...document },
        categories: this.documentCategories,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.allDocuments.findIndex(doc => doc.id === result.id);
        if (index !== -1) {
          this.allDocuments[index] = result;
          this.filterAndUpdateDocuments();
          this.updateDocumentCounts();
          this.saveDocuments();
        }
      }
    });
  }

  shareDocument(document: Document): void {
    const dialogRef = this.dialog.open(AddDocumentDialogComponent, {
      width: '400px',
      data: { document }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Document shared:', result);
        // Implement actual sharing logic here
      }
    });
  }
  downloadDocument(document: Document): void {
    if (document.fileDataUrl) {
      const link = window.document.createElement('a');
      link.href = document.fileDataUrl!;
      link.download = document.name;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
    } else {
      console.error('No file data available for download');
    }
  }


  deleteDocument(document: Document): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { title: 'Delete Document', message: 'Are you sure you want to delete this document?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.allDocuments = this.allDocuments.filter((doc) => doc.id !== document.id);
        this.filterAndUpdateDocuments();
        this.updateDocumentCounts();
        this.saveDocuments();
      }
    });
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/images/pdf.svg';
  }

  onAddCategory(): void {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      width: '500px',
      data: { existingCategories: this.documentCategories }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newCategory: DocumentCategory = {
          id: result.name.toLowerCase(),
          title: result.name,
          count: 0,
          icon: result.icon,
          isActive: false
        };
        this.documentCategories.push(newCategory);
        this.updateDocumentCounts();
      }
    });
  }

  // Pagination handling
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.filterAndUpdateDocuments();
  }

  private getPaginatedDocuments(documents: Document[]): Document[] {
    const startIndex = this.currentPage * this.pageSize;
    return documents.slice(startIndex, startIndex + this.pageSize);
  }

  getFileIcon(mimeType: string | undefined): string {
    if (!mimeType) return 'insert_drive_file'; // default icon

    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType === 'application/pdf') return 'picture_as_pdf';
    if (mimeType.includes('word')) return 'description';
    if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return 'table_chart';
    if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return 'slideshow';
    if (mimeType.includes('audio')) return 'audiotrack';
    if (mimeType.includes('video')) return 'videocam';
    if (mimeType.includes('zip') || mimeType.includes('compressed')) return 'folder_zip';

    return 'insert_drive_file'; // default icon for unknown types
  }

  // Preview document
  openPreview(document: Document): void {
    this.previewDocument = document;
    this.isPreviewOpen = true;
  }

  closePreview(): void {
    if (this.previewDocument?.previewUrl) {
      URL.revokeObjectURL(this.previewDocument.previewUrl.toString());
    }
    this.previewDocument = null;
    this.isPreviewOpen = false;
  }
}