import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userData = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private authService: AuthService) { }

  gotoforgot() {
    this.router.navigate(['auth/forgot'])
  }

  gotosignup() {
    this.router.navigate(['user/signup']);
  };

  login(data: any) {
    this.authService.login(data).subscribe(
      (response) => {
        console.log('Authentication result:', response);
        this.router.navigate(['/dashboard']);
      }

    );
  }

}
