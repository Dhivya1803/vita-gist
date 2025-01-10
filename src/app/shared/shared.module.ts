import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockComponent } from './components/clock/clock.component';
import { WeatherComponent } from './components/weather/weather.component';
import { MedicationCardComponent } from './components/medication-card/medication-card.component';
import { DocumentCardComponent } from './components/document-card/document-card.component';
import { ConnectionCardComponent } from './components/connection-card/connection-card.component';
import { FileSizePipe } from './pipes/file-size.pipe';
import { DropdownComponent } from './dropdown/dropdown.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';



@NgModule({
  declarations: [
    ClockComponent,
    WeatherComponent,
    MedicationCardComponent,
    DocumentCardComponent,
    ConnectionCardComponent,
    FileSizePipe,
    DropdownComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDialogActions,
    MatDialogContent
  ]
})
export class SharedModule { }
