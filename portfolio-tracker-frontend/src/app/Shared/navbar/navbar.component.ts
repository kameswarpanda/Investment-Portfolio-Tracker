import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive, RouterLink, RouterModule, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  router = inject(Router);
  //for logout
  onLogout(): void {
    localStorage.removeItem('stockUser');
    this.router.navigateByUrl('/home/login');
    window.location
  }
  
  //for dark mode 
  darkMode = false; // Toggle state

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    const body = document.body;
    if (this.darkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }

}
