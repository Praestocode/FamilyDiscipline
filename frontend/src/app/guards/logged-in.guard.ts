import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean | UrlTree {
    const token = this.authService.getToken();
    if (!token) {
      // Nessun token, permetti l'accesso alla pagina di login
      return true;
    }

    // Verifica il token con /api/user
    return this.authService.getUser().pipe(
      map(() => {
        // Token valido, reindirizza a homepage
        return this.router.createUrlTree(['/homepage']);
      }),
      catchError(() => {
        // Token non valido, permetti l'accesso alla pagina di login
        return of(true);
      })
    );
  }
}