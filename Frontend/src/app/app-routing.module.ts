import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { SignupComponent } from './user/signUp/signUp.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetComponent } from './auth/resetPassword/resetPassword.component';
import { ForgetComponent } from './auth/forgotPassword/forgotPassword.component';
import { UserdashboardComponent } from './dashboard/userDashboard/userDashboard.component';
import { HomeSectionComponent } from './main/home-section/home-section.component';
import { BookEventComponent } from './options/bookEvent/bookEvent.component';
import { AboutComponent } from './home/about/about.component';
import { GalleryComponent } from './home/gallery/gallery.component';
import { ContactComponent } from './home/contact/contact.component';
import { ProfileComponent } from './options/profile/profile.component';
import { UpdateComponent } from './options/updateEvent/updateEvent.component';
import { SignupComponent } from './user/signUp/signUp.component';

const routes: Routes = [
  {
    path: '',
    component: HomeSectionComponent
  },
  {
    path: 'user/signup',
    component: SignupComponent
  },
  {
    path: 'auth/signin',
    component: LoginComponent
  },
  {
    path: 'auth/reset',
    component: ResetComponent
  },
  {
    path: 'auth/forgot',
    component: ForgetComponent
  },
  {
    path: 'options/book-event',
    component: BookEventComponent
  },

  {
    path: 'dashboard',
    component: UserdashboardComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'gallery',
    component: GalleryComponent
  },
  {
    path: 'contact-us',
    component: ContactComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'table',
    component: UpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
