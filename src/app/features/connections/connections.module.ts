import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionsRoutingModule } from './connections-routing.module';
import { ConnectionsComponent } from './connections.component';
import { AddConnectionDialogComponent } from './add-connection-dialog/add-connection-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: ConnectionsComponent } // Load DashboardComponent at the root of this module
];

@NgModule({
  declarations: [
    ConnectionsComponent,
    AddConnectionDialogComponent
  ],
  imports: [
    CommonModule,
    ConnectionsRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ConnectionsComponent, RouterModule]
})
export class ConnectionsModule { }
