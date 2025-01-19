import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor() {}

  onSubmit(): void {
    if (!this.email || !this.password) {
      alert('Please enter your email and password!');
      return;
    }
    console.log('Login form submitted!', { email: this.email, password: this.password });
    alert('Login successful!'); // Replace with your authentication logic
  }
}
