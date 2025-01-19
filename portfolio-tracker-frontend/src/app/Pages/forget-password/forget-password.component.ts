import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [FormsModule, RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  email: string = '';

  onSubmit(): void {
    if (this.email) {
      // Simulate API call for sending reset link
      console.log(`Reset link sent to: ${this.email}`);
      alert('A password reset link has been sent to your email.');
    } else {
      alert('Please enter a valid email address.');
    }
  }
}
