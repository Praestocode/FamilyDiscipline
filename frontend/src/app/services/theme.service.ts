import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(true);
  isDarkTheme$ = this.isDarkTheme.asObservable();

  constructor() {
    // Inizializzazione minima nel costruttore
  }

  setInitialTheme(isDark: boolean) {
    if(environment.consolelog)(console.log('mi eseguo'));
    //console.log('mi eseguo')
    this.isDarkTheme.next(isDark);
    document.documentElement.classList.remove('light');
    if (!isDark) {
      document.documentElement.classList.add('light');
    }
  }

  toggleTheme() {
    const newTheme = !this.isDarkTheme.value;
    this.isDarkTheme.next(newTheme);
    document.documentElement.classList.toggle('light');
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  }

  getCurrentTheme(): boolean {
    return this.isDarkTheme.value;
  }
}