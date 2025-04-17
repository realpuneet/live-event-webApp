import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './resetPassword.component.html',
  styleUrls: ['./resetPassword.component.css']
})
export class ResetComponent {
  constructor(private forgotPasswordService: AuthService) { }

  resetPassword(): void {
    this.forgotPasswordService.resetPassord()
      .subscribe(
        response => {
          console.log('Reset!', response);
        },
        // error => {
        //   console.error('Failed to send reset link!', error);
        // }
      );
  }
}
