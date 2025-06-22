import { Component } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-themetoggle',
  templateUrl: './themetoggle.component.html',
  styleUrls: ['./themetoggle.component.scss']
})
export class ThemetoggleComponent {
  isDarkTheme: boolean;
  animateClass: string = ''; // Classe per attivare l'animazione

  constructor(private themeService: ThemeService) {
    this.isDarkTheme = this.themeService.getCurrentTheme();
    this.themeService.isDarkTheme$.subscribe(isDark => {
      this.isDarkTheme = isDark;
    });
  }

  toggleTheme() {
    this.animateClass = this.isDarkTheme ? 'animate-to-light' : 'animate-to-dark';
    this.themeService.toggleTheme();
    // Rimuovi la classe di animazione dopo che è completata (0.8s)
    setTimeout(() => {
      this.animateClass = '';
    }, 800);
  }
}