import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudittrailsRoutingModule } from './audittrails-routing.module';
import { AudittrailsComponent } from './audittrails.component';


@NgModule({
  declarations: [
    AudittrailsComponent
  ],
  imports: [
    CommonModule,
    AudittrailsRoutingModule
  ]
})
export class AudittrailsModule { }
