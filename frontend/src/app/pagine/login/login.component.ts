import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false; // Variabile per lo spinner

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.isLoading = true; // Mostra lo spinner
    this.errorMessage = ''; // Resetta il messaggio di errore

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.isLoading = false; // Nasconde lo spinner
        this.router.navigate(['/homepage']);
      },
      error: (err) => {
        this.isLoading = false; // Nasconde lo spinner
        this.errorMessage = err.error.message || 'Errore durante il login';
      },
    });
  }
}