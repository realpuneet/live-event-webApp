import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginusers(data: any) {
    throw new Error('Method not implemented.');
  }

private  singnupUrl = 'http://localhost:3000/users/signup'

  constructor(private http : HttpClient) { }


 signupusers(userData: any): Observable<any> {
    return this.http.post(this.singnupUrl, userData)
  }

}
