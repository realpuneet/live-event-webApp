import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OptionsService } from 'src/app/services/options.service';

@Component({
  selector: 'app-detele-update',
  templateUrl: './updateEvent.component.html',
  styleUrls: ['./updateEvent.component.css']
})
export class UpdateComponent {
  eventsData: any;
  updateEventData: any;
  updatedData: any = {
    title: '',
    location: '',
    date: ''
  };
  constructor(private showEventData: OptionsService) { }
  ngOnInit() {
    this.GeteventById()
  }



  GeteventById() {
    this.showEventData.eventData().subscribe(
      response => {
        this.eventsData = response;
      })
  }


  updateEvent() {
    console.info("updateCurrentEvent", this.updateEventData);

    // Assuming you want to update only non-empty fields
    const updatedData = {
      title: this.updatedData.title || this.updateEventData.title,
      location: this.updatedData.location || this.updateEventData.location,
      date: this.updatedData.date || this.updateEventData.date
    };

    this.showEventData
      .updateEventById(this.updateEventData._id, updatedData)
      .subscribe((response) => {
        console.info("updateCurrentEvent._id", this.updateEventData._id);
        console.log(response);
        // Optionally, update the displayed events
        // this.getEvents();
      });
  }


}
