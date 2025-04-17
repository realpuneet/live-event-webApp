import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OptionsService } from 'src/app/services/options.service';

@Component({
  selector: 'app-book-event',
  templateUrl: './bookEvent.component.html',
  styleUrls: ['./bookEvent.component.css']
})
export class BookEventComponent {

  eventData = {
    title: '',
    description: '',
    date: '',
    location: ''
  }

  constructor(private router: Router, private eventAddService: OptionsService) { }


  addEvent(userData: any) {
    this.eventAddService.addEvent(userData).subscribe(
      response => {
        console.log('Add Event successfully', response);
        this.router.navigate(['/dashboard']);

      },
      error => {
        console.log('failed', error);
      }
    )

  }
}
