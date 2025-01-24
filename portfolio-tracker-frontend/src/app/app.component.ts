import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './Shared/footer/footer.component';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]); // Scroll to top
      }
    });
  }
  title = 'portfolio-tracker-frontend';
}
