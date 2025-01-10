import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutRoutingModule } from './logout-routing.module';
import { MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LogoutComponent } from './logout.component';

@NgModule({
  declarations: [
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    LogoutRoutingModule,
    MatDialogModule,
    MatButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LogoutModule { }
