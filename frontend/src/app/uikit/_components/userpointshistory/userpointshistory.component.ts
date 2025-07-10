import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-userpointshistory',
  templateUrl: './userpointshistory.component.html',
  styleUrls: ['./userpointshistory.component.scss']
})
export class UserpointshistoryComponent implements OnInit, OnDestroy {
  isLoading = true;
  showNoDataMessage = false;
  users: any[] = [];
  displayedUsers: any[] = [];
  totalPoints: number = 0;
  maxPoints: number = 1; // Valore minimo per evitare divisione per zero
  private dataSubscription: Subscription | null = null;
  private themeSubscription: Subscription | null = null;
  famcoin = environment.famcoin;
  private readonly MAX_USERS = 10; // Configura il numero massimo di utenti visualizzati

  constructor(private authService: AuthService, private themeService: ThemeService) {}

  ngOnInit() {
    this.dataSubscription = this.authService.getUsers().subscribe({
      next: (users) => {
        // console.log('Utenti ricevuti:', users);
        // Log dettagliato per Virgilio
        // const virgilio = users.find(user => user.name === 'Virgilio');
        // if (virgilio) {
        //   console.log('Dati Virgilio:', {
        //     discipline_points: virgilio.discipline_points,
        //     total_points_earned_by_smoke_so_far: virgilio.total_points_earned_by_smoke_so_far,
        //     total_points_earned_by_weight_so_far: virgilio.total_points_earned_by_weight_so_far,
        //     total_points_earned_by_tasks_so_far: virgilio.total_points_earned_by_tasks_so_far,
        //     int_smoke: virgilio.int_smoke,
        //     int_weight: virgilio.int_weight,
        //     int_tasks: virgilio.int_tasks
        //   });
        // }
        this.users = users;
        this.totalPoints = users.reduce((sum, user) => sum + (user.discipline_points || 0), 0);
        this.maxPoints = Math.max(...users.map(user => user.discipline_points || 0), 1);
        // Ordina e limita solo se ci sono punti
        this.displayedUsers = this.totalPoints > 0
          ? users.sort((a, b) => (b.discipline_points || 0) - (a.discipline_points || 0)).slice(0, this.MAX_USERS)
          : [];
        this.isLoading = false;
        this.showNoDataMessage = users.length === 0 || this.totalPoints === 0;
        // Sottoscrizione al cambio di tema
        this.themeSubscription = this.themeService.isDarkTheme$.subscribe(() => {
          // Forza il refresh del tema
          this.displayedUsers = [...this.displayedUsers];
        });
      },
      error: (err) => {
        console.error('Errore caricamento utenti:', err);
        this.isLoading = false;
        this.showNoDataMessage = true;
      }
    });
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  getProgressPercentage(points: number, max: number): number {
    return max > 0 ? Math.min((points / max) * 100, 100) : 0;
  }

  scrollToUser(userId: number): void {
    const element = document.getElementById(`user-${userId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}