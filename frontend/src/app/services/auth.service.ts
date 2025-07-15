import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, BehaviorSubject, forkJoin, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

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

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          localStorage.setItem(this.tokenKey, response.token);
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


  //Poi va sostituita con quella del file .txt
  getUser(): Observable<any> {
    this.getUserCounter++;
    console.log('inizio debug - attivato');
    console.log(`[auth.service] getUser() #${this.getUserCounter}`);
    console.trace(`[auth.service] Stack trace per getUser() #${this.getUserCounter}`);
  
    const token = this.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  
    return this.http.get(`${this.apiUrl}/user`, { headers }).pipe(
      tap(() => console.log(`[auth.service] >>> CHIAMATA HTTP /user #${this.getUserCounter}`))
    );
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
}


/* import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

interface LoginResponse {
  user: any;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private tokenKey = 'auth_token';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          localStorage.setItem(this.tokenKey, response.token);
          this.isLoggedInSubject.next(true);
        })
      );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem(this.tokenKey);
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
  const token = this.getToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });
    return this.http.get(`${this.apiUrl}/user`, { headers });
  }
} */
