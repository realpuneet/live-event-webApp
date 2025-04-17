import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserService } from './services/user.service';
import { MainModule } from './main/main.module';
import { HomeModule } from './home/home.module';
import { OptionsModule } from './options/options.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    UserModule,
    DashboardModule,
    MainModule,
    HomeModule,
    OptionsModule,

    
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
