import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, BehaviorSubject, forkJoin, catchError, map } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { CryptoService } from './crypto.service.ts.service';

interface LoginResponse {
  user: any;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //private apiUrl = 'http://localhost:8000/api';
  private apiUrl = environment.apiUrl;
  private tokenKey = 'auth_token';
  private userPreferencesKey = 'user_preferences';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient, private cryptoService: CryptoService, private router: Router) {
    this.cryptoService.loadKeyFromStorage();
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          localStorage.setItem(this.tokenKey, response.token);

          // Salva anche l'email per usi futuri (come la derivazione della chiave)
          //localStorage.setItem('user_email', email);

          this.isLoggedInSubject.next(true);
          // Dopo il login, ottieni i dati utente
          this.fetchUserPreferences();
        })
      );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userPreferencesKey);
        localStorage.removeItem('enc_key');
        //localStorage.removeItem('user_email');
        this.isLoggedInSubject.next(false);
        this.router.navigate(['/login']);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }


  getUser(): Observable<any> {
      if(environment.consolelog)(console.log('mi eseguo getuser'));
      //console.log('eseguo getUser da authservice.ts');
      const token = this.getToken();
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
  
      return this.http.get(`${this.apiUrl}/user`, { headers });
    }



  getUsersPointsHistory(): Observable<any[]> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>(`${this.apiUrl}/users/points-history`, { headers }).pipe(
      tap(response => response), //tap(response => console.log('Storico punti utenti caricato:', response)),
      catchError(error => {
        console.error('Errore caricamento storico punti utenti:', error);
        throw error;
      })
    );
  }

  //getUser per debug
/*   getUser(): Observable<any> {
    console.log('Eseguo getUser');
    const token = this.getToken();
    console.log('Token utilizzato:', token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = `${this.apiUrl}/user`;
    console.log('Chiamata API verso:', url);
    return this.http.get(url, { headers }).pipe(
      tap(response => {
        console.log('Risposta ricevuta da /user:', JSON.stringify(response, null, 2));
      }),
      catchError(error => {
        console.error('Errore nella chiamata a /user:', error);
        throw error;
      })
    );
  } */

  private fetchUserPreferences() {
    this.getUser().subscribe({
      next: (user) => {
        const preferences = {
          int_smoke: user.int_smoke,
          int_weight: user.int_weight,
          int_tasks: user.int_tasks,
        };
        localStorage.setItem(this.userPreferencesKey, JSON.stringify(preferences));
      },
      error: (err) => {
        console.error('Errore caricamento preferenze utente:', err);
      }
    });
  }

  getUserPreferences(): { int_smoke: boolean; int_weight: boolean; int_tasks: boolean } {
    const preferences = localStorage.getItem(this.userPreferencesKey);
    return preferences
      ? JSON.parse(preferences)
      : { int_smoke: false, int_weight: false, int_tasks: false };
  }


    getUsers(): Observable<any[]> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>(`${this.apiUrl}/users`, { headers }).pipe(
      tap(response => response), //tap(response => console.log('Utenti caricati:', response)),
      catchError(error => {
        console.error('Errore caricamento utenti:', error);
        throw error;
      })
    );
  }

  //Nuovo
  changePassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/change-password`, data);
  }

  //Nuovo
  getUserTasks(): Observable<any[]> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<{ tasks: any[] }>(`${this.apiUrl}/tasks`, { headers }).pipe(
      map(response => response.tasks || []),
      catchError(error => {
        console.error('Errore caricamento tasks:', error);
        throw error;
      })
    );
  }


  //Nuovo
  updateAllTasks(tasks: { id: number, description: string }[]): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrl}/tasks/update-all`, { tasks }, { headers });
  }
}
