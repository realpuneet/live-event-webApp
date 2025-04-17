import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  private API_URL = 'http://localhost:3000'
  // private addEventUrl = 'http://localhost:3000/events/addEvent'
  // private DeleteEventUrl = 'http://localhost:3000/events/deleteEvent'
  // private showEventUrl = 'http://localhost:3000/events/getEvent/'
  // private updateEventUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  addEvent(eventData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/events/addEvent`, eventData)
  }


  eventData() {
    return this.http.get(`${this.API_URL}/events/getEvent`)
  }

  public deleteEventById(Id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/events/deleteEvent/${Id}`).pipe(map((res) => res));
  }

  public updateEventById(Id: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.API_URL}/events/updateEvent/${Id}`, updatedData).pipe(map((res) => res));
  }

}
