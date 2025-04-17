import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OptionsService } from 'src/app/services/options.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})

export class UserdashboardComponent {

  events = []
  userData: any;
  eventsData: any;
  constructor(private eventDeleteService: OptionsService, private router: Router, private authService: AuthService, private showEventData: OptionsService) {
    this.showEventData.eventData().subscribe((data) => {
      this.eventsData = data;

    })
  }
  gotoTable() {
    this.router.navigate(['/table'])
  }

  gotoAddevent() {
    this.router.navigate(['/options/book-event'])
  }

  gotoHome() {
    this.router.navigate(['/'])
  }
  gotoProfile() {
    this.router.navigate(['/profile'])
  }

  logout() {
    this.router.navigate(['auth/signin'])
  }


  editEvent() {
    this.router.navigate(['auth/signin'])
  }


  deleteEvent(deleteCurrentEvent: any) {
    console.info("deleteCurrentEvent", deleteCurrentEvent)
    this.eventDeleteService
      .deleteEventById(`${deleteCurrentEvent._id}`)
      .subscribe((response) => {
        console.info("deleteCurrentStaffRow._id", deleteCurrentEvent._id)
        console.log(response)
        this.GeteventById()
      });
  }

  setDeleteEvent(event: any) {
    console.log('Selected event for deletion:', event);
    this.deleteEvent(event);

  }

  GeteventById() {
    this.showEventData.eventData().subscribe(
      response => {
        this.eventsData = response;
      })
  }
}
