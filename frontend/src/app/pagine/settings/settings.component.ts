import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  user: any;
  preferences: { int_smoke: boolean; int_weight: boolean; int_tasks: boolean };
  isDarkTheme: boolean = true;

  private themeSubscription: Subscription;

  constructor(private authService: AuthService, private themeService: ThemeService) {
    this.preferences = this.authService.getUserPreferences();
    //
    this.themeSubscription = this.themeService.isDarkTheme$.subscribe(isDark => {
    //console.log('Theme changed from infocard component:' , isDark); //Debug
    this.isDarkTheme = isDark;
    })
  }

  ngOnInit() {
    this.authService.getUser().subscribe({
      next: (user) => {
        this.user = user;
        const preferences = {
          int_smoke: user.int_smoke,
          int_weight: user.int_weight,
          int_tasks: user.int_tasks,
        };
        localStorage.setItem('user_preferences', JSON.stringify(preferences));
        this.preferences = preferences;
      },
      error: (err) => {
        console.error('Errore caricamento utente:', err);
      }
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }


  get smokeImage(): string {
    return this.isDarkTheme ? '/assets/images/icons/darkcigarette.png' : '/assets/images/icons/lightcigarette.png';
  }
  get weightImage(): string {
  return this.isDarkTheme ? '/assets/images/icons/darkweight.png' : '/assets/images/icons/lightweight.png';
  }
  get tasksImage(): string {
    return this.isDarkTheme ? '/assets/images/icons/darktasks.png' : '/assets/images/icons/lighttasks.png';
  }

  scrollTo(elementId: string): void {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}