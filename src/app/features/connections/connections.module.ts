import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionsRoutingModule } from './connections-routing.module';
import { ConnectionsComponent } from './connections.component';
import { AddConnectionDialogComponent } from './add-connection-dialog/add-connection-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { MatDialogModule } from '@angular/material/dialog';

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
    MatDialogModule,
    RouterModule
  ],
  providers: [UserService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ConnectionsComponent]
})
export class ConnectionsModule {}
