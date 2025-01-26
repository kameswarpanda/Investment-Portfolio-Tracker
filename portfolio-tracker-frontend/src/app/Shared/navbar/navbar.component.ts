import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive, RouterLink, RouterModule, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  router = inject(Router);
  //for logout
  onLogout(): void {
    localStorage.removeItem('stockUser');
    this.router.navigateByUrl('/home');
    window.location;
  }

  darkMode = false;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }

  closeNavbar() {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse?.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  }
}
