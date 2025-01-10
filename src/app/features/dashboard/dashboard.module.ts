import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { format } from 'date-fns';
import { UserService } from '../../core/services/user.service';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTabHeader } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
  { path: '', component: DashboardComponent } // Load DashboardComponent at the root of this module
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatTabHeader,
    MatCardModule,
    MatIconModule,
    DashboardRoutingModule,
    RouterModule.forChild(routes)
  ],
  providers:[UserService]
})
export class DashboardModule implements OnInit{
  currentTime!: string;
  currentDate!: string;

  ngOnInit(): void {
     this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
  }
  updateDateTime() {
    const now = new Date();
    this.currentTime = format(now, 'hh:mm a');
    this.currentDate = format(now, 'EEEE\ndd MMMM yyyy');
  }

}
