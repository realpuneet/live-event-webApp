import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeSectionComponent } from './home-section/home-section.component';
import { HomeModule } from '../home/home.module';



@NgModule({
  declarations: [
    HomeSectionComponent
  ],
  imports: [
    CommonModule,
    HomeModule
  ],
  exports:[
    HomeSectionComponent
  ]
})
export class MainModule { }
