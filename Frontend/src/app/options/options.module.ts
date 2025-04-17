import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookEventComponent } from './bookEvent/bookEvent.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { UpdateComponent } from './updateEvent/updateEvent.component';



@NgModule({
  declarations: [
    BookEventComponent,
    ProfileComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    BookEventComponent,
    ProfileComponent
  ]
})
export class OptionsModule { }
