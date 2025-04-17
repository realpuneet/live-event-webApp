import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logout() {
    throw new Error('Method not implemented.');
  }

  private apiUrlLogIn = 'http://localhost:3000/users/auth/signin'
  private apiUrlForgot = 'http://localhost:3000/users/forgotPassword';
  private userByIdUrl = 'http://localhost:3000/users/byId'
  private apiUrlReset = 'http://localhost:3000/users/forgot-password/resetPassword';


  constructor(private http: HttpClient) { }

  login(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrlLogIn, userData);
  }

  sendResetLink(email: string): Observable<any> {
    return this.http.post<any>(this.apiUrlForgot, { email });
  }

  public findUserById(Id: string): Observable<any> {
    return this.http.delete(`${this.userByIdUrl}/${Id}`).pipe(map((res) => res));
  }

  resetPassord(): Observable<any> {
    return this.http.get(this.apiUrlReset);
  }
}
