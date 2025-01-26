import { Component } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  //for dark mode
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
