import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CryptoService } from '../../services/crypto.service.ts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private cryptoService: CryptoService, private router: Router) {}

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: async () => {
        await this.cryptoService.deriveKey(this.password, this.email);
        this.isLoading = false;
        this.router.navigate(['/homepage']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error.message || 'Errore durante il login';
        console.error('Errore di login:', err);
      },
    });
  }
}



// import { Component } from '@angular/core';
// import { AuthService } from '../../services/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss'],
// })
// export class LoginComponent {
//   email: string = '';
//   password: string = '';
//   errorMessage: string = '';
//   isLoading: boolean = false;

//   constructor(private authService: AuthService, private router: Router) {}

//   onSubmit(): void {
//     this.isLoading = true;
//     this.errorMessage = '';

//     this.authService.login(this.email, this.password).subscribe({
//       next: () => {
//         this.isLoading = false;
//         this.router.navigate(['/homepage']);
//       },
//       error: (err) => {
//         this.isLoading = false;
//         this.errorMessage = err.error.message || 'Errore durante il login';
//         console.error('Errore di login:', err);
//       },
//     });
//   }
// }


// import { Component } from '@angular/core';
// import { AuthService } from '../../services/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss'],
// })
// export class LoginComponent {
//   email: string = '';
//   password: string = '';
//   errorMessage: string = '';
//   isLoading: boolean = false; // Variabile per lo spinner

//   constructor(private authService: AuthService, private router: Router) {}

//   onSubmit(): void {
//     this.isLoading = true; // Mostra lo spinner
//     this.errorMessage = ''; // Resetta il messaggio di errore

//     this.authService.login(this.email, this.password).subscribe({
//       next: () => {
//         this.isLoading = false; // Nasconde lo spinner
//         this.router.navigate(['/homepage']);
//       },
//       error: (err) => {
//         this.isLoading = false; // Nasconde lo spinner
//         this.errorMessage = err.error.message || 'Errore durante il login';
//       },
//     });
//   }
// }