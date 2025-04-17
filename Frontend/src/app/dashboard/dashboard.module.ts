import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserdashboardComponent } from './userDashboard/userDashboard.component';



@NgModule({
  declarations: [
    UserdashboardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserdashboardComponent
  ]
})
export class DashboardModule { }
