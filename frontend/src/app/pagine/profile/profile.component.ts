import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service'; // Assumi path corretto
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: { name: string, status_id: number, user_status: string, status_icon: string, discipline_points: number, profile_picture?: string, int_tasks?: number; int_weight?: number; int_smoke?: number; } | null = null;
  isLoading: boolean = true;
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private authService: AuthService // Iniettiamo AuthService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      // Utente non loggato, non facciamo chiamate protette
      this.isLoading = false;
      this.user = null;
      this.cdr.detectChanges();
      return;
    }

    this.http.get(this.apiUrl+'/user').subscribe({
      next: (data: any) => {
        this.http.get<{ id: number, name: string }[]>(this.apiUrl+'/statuses').subscribe({
          next: (statuses) => {
            //console.log('eseguo getUser da profilecomponent.ts');
            const status = statuses.find(s => s.id === data.status_id);
            this.user = {
              name: data.name,
              status_id: data.status_id,
              user_status: status ? status.name : 'Sconosciuto',
              status_icon: data.status_icon,
              discipline_points: data.discipline_points,
              profile_picture: data.profile_picture,
              int_tasks: data.int_tasks,
              int_weight: data.int_weight,
              int_smoke: data.int_smoke,
            };
            this.isLoading = false;
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Errore caricamento status:', err);
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        });
      },
      error: (err) => {
        console.error('Errore caricamento profilo:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}


// import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.scss']
// })
// export class ProfileComponent implements OnInit {
//   user: { name: string, status_id: number, user_status: string, status_icon: string, discipline_points: number, profile_picture?: string, int_tasks?: number; int_weight?: number; int_smoke?: number; } | null = null;
//   isLoading: boolean = true;

//   constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

//   ngOnInit(): void {
//     this.http.get('http://localhost:8000/api/user').subscribe({
//       next: (data: any) => {
//         this.http.get<{ id: number, name: string }[]>('http://localhost:8000/api/statuses').subscribe({
//           next: (statuses) => {
//             const status = statuses.find(s => s.id === data.status_id);
//             this.user = {
//               name: data.name,
//               status_id: data.status_id,
//               user_status: status ? status.name : 'Sconosciuto', // Mappa da statuses
//               status_icon: data.status_icon,
//               discipline_points: data.discipline_points,
//               profile_picture: data.profile_picture,
//               int_tasks: data.int_tasks,
//               int_weight: data.int_weight,
//               int_smoke: data.int_smoke,
//             };
//             this.isLoading = false;
//             //console.log('User:', this.user);
//             this.cdr.detectChanges(); // Forza aggiornamento
//           },
//           error: (err) => {
//             console.error('Errore caricamento status:', err);
//             this.isLoading = false;
//             this.cdr.detectChanges();
//           }
//         });
//       },
//       error: (err) => {
//         console.error('Errore caricamento profilo:', err);
//         this.isLoading = false;
//         this.cdr.detectChanges();
//       }
//     });
//   }
// }
