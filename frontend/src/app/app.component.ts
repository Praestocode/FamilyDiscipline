import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { filter, Subscription } from 'rxjs';
import { ThemeService } from './services/theme.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'duotrackerfrontend';
  isLoggedIn: boolean = false;
  isMobileDevice: boolean = true; // default a true per sicurezza
  pullFeedbackVisible = false;
  public canRefresh = false;
  private refreshTimeoutId?: any;
  public feedbackOpacity = 0;
  private themeSubscription: Subscription;
  isDarkTheme: boolean = true;
  public rotationAngle = 0;

  public hasShownSplash: boolean = false;
  public showSplash: boolean = true;




  private authSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router, private themeService: ThemeService) {
        this.themeSubscription = this.themeService.isDarkTheme$.subscribe(isDark => {
      this.isDarkTheme = isDark;
    });
  }

  ngOnInit() {
    this.hasShownSplash = sessionStorage.getItem('splashShown') === 'true';

    if (!this.hasShownSplash) {
      sessionStorage.setItem('splashShown', 'true');
      setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
          splash.classList.add('fade-out');
        }
        setTimeout(() => {
          this.showSplash = false; // Nasconde splash dopo animazione
        }, 800);
      }, 1800);
    } else {
      this.showSplash = false; // Nasconde subito splash se già mostrato
    }

    // Rilevamento semplice basato su user-agent
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    this.isMobileDevice = /android|iphone|ipod|ipad/i.test(userAgent);

    // Rilevamento login
    this.authSubscription = this.authService.isLoggedIn$().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });


    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(() => {
      const el = document.querySelector('.refreshable-main');
      if (el) {
        el.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }


  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.themeSubscription.unsubscribe();
  }

  onPullProgress(progress: number): void {
    this.pullFeedbackVisible = progress > 0.3;
    this.canRefresh = progress >= 0.95;
    this.feedbackOpacity = Math.min(1, (progress - 0.3) / (0.95 - 0.3));
    this.rotationAngle = Math.min(360, progress * 360); // Rotazione progressiva
  }

  onGlobalRefresh(): void {
    console.log('Esecuzione refresh: location.reload()');
    location.reload();
  }

  get resetIcon(): string {
  return this.isDarkTheme ? '/assets/images/icons/resetwhite.png' : '/assets/images/icons/resetpurple.png';
  }

}

// export class AppComponent implements OnInit, OnDestroy {
//   title = 'duotrackerfrontend';
//   isLoggedIn: boolean = false;
//   private authSubscription: Subscription = new Subscription();

//   constructor(private authService: AuthService) {}

//   ngOnInit() {
//     this.authSubscription = this.authService.isLoggedIn$().subscribe((loggedIn) => {
//       this.isLoggedIn = loggedIn;
//     });
//   }

//   ngOnDestroy() {
//     this.authSubscription.unsubscribe();
//   }
// }