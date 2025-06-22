import { Component, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-buttonlogout',
  templateUrl: './buttonlogout.component.html',
  styleUrls: ['./buttonlogout.component.scss']
})
export class ButtonlogoutComponent {
  @Input() isLoading: boolean = false; // Stato di caricamento iniziale dal genitore
  isLoggingOut: boolean = false; // Stato durante il logout

  constructor(private authService: AuthService) {}

  logout(): void {
    this.isLoggingOut = true; // Attiva lo spinner
    this.authService.logout().subscribe({
      next: () => {
        this.isLoggingOut = false; // Nasconde lo spinner
      },
      error: (err) => {
        console.error('Errore durante il logout:', err);
        this.isLoggingOut = false; // Nasconde lo spinner anche in caso di errore
      }
    });
  }
}