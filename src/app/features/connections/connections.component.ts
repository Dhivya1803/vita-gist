import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { AddConnectionDialogComponent } from './add-connection-dialog/add-connection-dialog.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

interface Connection {
  id: string;
  name: string;
  email: string;
  avatar: string;
  categories: string[];
  status: 'pending' | 'connected' | 'none';
}

interface Category {
  id: string;
  title: string;
  count: number;
  icon: string;
  isActive: boolean;
}

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent implements OnInit {
  searchQuery: string = '';
  categories: Category[] = [
    { id: 'personal', title: 'Personal', count: 0, icon: 'person', isActive: true },
    { id: 'health', title: 'Health', count: 0, icon: 'favorite', isActive: false },
    { id: 'legal', title: 'Legal', count: 0, icon: 'gavel', isActive: false },
    { id: 'finance', title: 'Finance', count: 0, icon: 'account_balance', isActive: false }
  ];

  connections: Connection[] = [];
  filteredConnections: Connection[] = [];

  dropdownOptions = [
    { label: 'Add New Connection', icon: 'person_add', action: () => this.openAddConnectionDialog() },
    { label: 'Add New Contact', icon: 'contacts', action: () => this.openAddContactDialog() },
    { label: 'Add New Category', icon: 'category', action: () => this.openAddCategoryDialog() }
  ];
  
  searchForm!: FormGroup;
  data = {
    categories: [
      { id: 1, title: 'Friends' },
      { id: 2, title: 'Colleagues' },
      { id: 3, title: 'Family' }
    ]
  };

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ConnectionsComponent>
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      categories: [[]],
      searchQuery: ['']
    });
    this.loadConnections();
    this.updateCategoryCounts();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCategoryChange(event: any): void {
    console.log('Selected categories:', event.value);
    this.filterConnections();
  }

  onSearch(): void {
    const query = this.searchForm.get('searchQuery')?.value || '';
    this.searchQuery = query;
    this.filterConnections();
  }

  private loadConnections() {
    this.connections = [
      {
        id: '1',
        name: 'Messy Franklin',
        email: 'messyfrank34@gmail.com',
        avatar: 'M',
        categories: ['personal'],
        status: 'none'
      }
    ];
    this.filterConnections();
  }

  private updateCategoryCounts() {
    this.categories.forEach(category => {
      category.count = this.connections.filter(conn =>
        conn.categories.includes(category.id)
      ).length;
    });
  }

  setActiveCategory(categoryId: string) {
    this.categories = this.categories.map(cat => ({
      ...cat,
      isActive: cat.id === categoryId
    }));
    this.filterConnections();
  }

  filterConnections() {
    const activeCategory = this.categories.find(cat => cat.isActive);
    this.filteredConnections = this.connections.filter(conn => {
      const matchesCategory = activeCategory
        ? conn.categories.includes(activeCategory.id)
        : true;
      const matchesSearch = this.searchQuery
        ? conn.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          conn.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });
  }

  openAddConnectionDialog() {
    const dialogRef = this.dialog.open(AddConnectionDialogComponent, {
      width: '600px',
      data: { categories: this.categories }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleConnectionRequest(result);
      }
    });
  }

  async handleConnectionRequest(connection: Connection) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Relationship Request',
        message: `Are you sure you want to send a relationship request to "${connection.name}"?`,
        showDescription: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        connection.status = 'pending';
        this.connections.push(connection);
        this.updateCategoryCounts();
        this.filterConnections();
      }
    });
  }

  openAddContactDialog() {
    console.log('Add Contact Dialog Placeholder');
  }

  openAddCategoryDialog() {
    console.log('Add Category Dialog Placeholder');
  }
}
