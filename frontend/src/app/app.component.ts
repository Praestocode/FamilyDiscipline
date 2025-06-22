import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service'; // Assicurati che il percorso sia corretto
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'duotrackerfrontend';
  isLoggedIn: boolean = false;
  private authSubscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.isLoggedIn$().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}