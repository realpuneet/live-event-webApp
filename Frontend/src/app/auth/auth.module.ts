import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ResetComponent } from './resetPassword/resetPassword.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ForgetComponent } from './forgotPassword/forgotPassword.component';



@NgModule({
  declarations: [
    LoginComponent,
    ResetComponent,
    ForgetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    LoginComponent,
    ResetComponent
  ]
})
export class AuthModule { }
