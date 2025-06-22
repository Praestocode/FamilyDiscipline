import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public router: Router) {}

  // Check if the current route is active
  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  // Navigate to the specified route
  navigate(route: string): void {
    this.router.navigate([route]);
  }
}