import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsRoutingModule } from './documents-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentService } from '../../core/services/document.service';
import { DocumentsComponent } from './documents.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AddDocumentDialogComponent } from './add-document-dialog/add-document-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipGrid, MatChipInput } from '@angular/material/chips';
import { SharedModule } from '../../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';
import {MatPaginatorModule} from '@angular/material/paginator';


const routes: Routes = [
  { path: '', component: DocumentsComponent } // Load DashboardComponent at the root of this module
];


@NgModule({
  declarations: [DocumentsComponent, AddDocumentDialogComponent,AddCategoryDialogComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    ReactiveFormsModule,
    MatChipInput,
    MatChipGrid,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatStepper,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatTableModule,
    SharedModule,
    MatMenuModule,
    MatMenu,
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[UserService, DocumentService],
  exports: [DocumentsComponent, RouterModule]
})
export class DocumentsModule {}

