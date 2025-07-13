import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-comparisonusers',
  templateUrl: './comparisonusers.component.html',
  styleUrls: ['./comparisonusers.component.scss']
})
export class ComparisonusersComponent implements OnInit, OnDestroy, AfterViewInit {
  isLoading = true;
  users: any[] = [];
  smokeUsers: any[] = [];
  weightUsers: any[] = [];
  tasksUsers: any[] = [];
  selectedSmokeUser: any | null = null; // Utente selezionato per Fumo
  selectedWeightUser: any | null = null; // Utente selezionato per Peso
  selectedTasksUser: any | null = null; // Utente selezionato per Tasks
  private dataSubscription: Subscription | null = null;
  private themeSubscription: Subscription | null = null;
  private charts: ApexCharts[] = [];
  famcoin = environment.famcoin;
  private readonly MAX_USERS = 10;
  public maxUsers = this.MAX_USERS; // Proprietà pubblica per il template
  private readonly COLORS = [
    '#4f46e5', '#14b8a6', '#ec4899', '#f59e0b', '#8b5cf6',
    '#10b981', '#f97316', '#3b82f6', '#ef4444', '#06b6d4'
  ];

  constructor(private authService: AuthService, private themeService: ThemeService) {}

  ngOnInit() {
    this.dataSubscription = this.authService.getUsersPointsHistory().subscribe({
      next: (users) => {
        // console.log('Storico utenti ricevuto:', users);
        this.users = users;
        // Filtra e limita gli utenti per ogni interesse
        this.smokeUsers = users
          .filter(user => user.int_smoke && user.total_points_earned_by_smoke_so_far > 0)
          .sort((a, b) => (b.total_points_earned_by_smoke_so_far || 0) - (a.total_points_earned_by_smoke_so_far || 0))
          .slice(0, this.MAX_USERS);
        this.weightUsers = users
          .filter(user => user.int_weight && user.total_points_earned_by_weight_so_far > 0)
          .sort((a, b) => (b.total_points_earned_by_weight_so_far || 0) - (a.total_points_earned_by_weight_so_far || 0))
          .slice(0, this.MAX_USERS);
        this.tasksUsers = users
          .filter(user => user.int_tasks && user.total_points_earned_by_tasks_so_far > 0)
          .sort((a, b) => (b.total_points_earned_by_tasks_so_far || 0) - (a.total_points_earned_by_tasks_so_far || 0))
          .slice(0, this.MAX_USERS);
        // Imposta gli utenti selezionati di default (primo utente con punteggio più alto)
        this.selectedSmokeUser = this.smokeUsers.length > 0 ? this.smokeUsers[0] : null;
        this.selectedWeightUser = this.weightUsers.length > 0 ? this.weightUsers[0] : null;
        this.selectedTasksUser = this.tasksUsers.length > 0 ? this.tasksUsers[0] : null;
        // console.log('Smoke Users:', this.smokeUsers, 'Selected:', this.selectedSmokeUser);
        // console.log('Weight Users:', this.weightUsers, 'Selected:', this.selectedWeightUser);
        // console.log('Tasks Users:', this.tasksUsers, 'Selected:', this.selectedTasksUser);
        this.isLoading = false;
        // Ritarda l'aggiornamento per garantire che il DOM sia pronto
        setTimeout(() => {
          // console.log('Esecuzione aggiornamento grafici in ngOnInit');
          this.updateCharts();
        }, 0);
      },
      error: (err) => {
        console.error('Errore caricamento storico utenti:', err);
        this.isLoading = false;
      }
    });
  }

  ngAfterViewInit() {
    this.themeSubscription = this.themeService.isDarkTheme$.subscribe(() => {
      // console.log('Tema cambiato, aggiornamento grafici');
      this.charts.forEach(chart => chart.destroy());
      this.charts = [];
      // Ritarda l'aggiornamento per garantire che il DOM sia pronto
      if (!this.isLoading) {
        setTimeout(() => {
          // console.log('Esecuzione aggiornamento grafici in ngAfterViewInit');
          this.updateCharts();
        }, 0);
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
    this.charts.forEach(chart => chart.destroy());
    this.charts = [];
  }

  // Metodi per selezionare l'utente per ogni sezione
  selectSmokeUser(user: any) {
    this.selectedSmokeUser = user;
  }

  selectWeightUser(user: any) {
    this.selectedWeightUser = user;
  }

  selectTasksUser(user: any) {
    this.selectedTasksUser = user;
  }

  private updateCharts() {
    // console.log('Aggiornamento grafici');
    this.createChart('smoke-chart', this.smokeUsers, 'total_points_earned_by_smoke_so_far', 'Fumo');
    this.createChart('weight-chart', this.weightUsers, 'total_points_earned_by_weight_so_far', 'Peso');
    this.createChart('tasks-chart', this.tasksUsers, 'total_points_earned_by_tasks_so_far', 'Tasks');
  }

  private createChart(chartId: string, users: any[], pointsField: string, label: string) {
    const element = document.getElementById(chartId);
    if (!element) {
      // console.log(`Elemento con ID ${chartId} non trovato`);
      return;
    }
    if (users.length === 0) {
      // console.log(`Nessun utente per ${chartId}`);
      return;
    }
    if (typeof ApexCharts === 'undefined') {
      console.error('ApexCharts non definito');
      return;
    }

    const categories = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
    });

    const series = users.map((user, index) => ({
      name: user.name,
      data: Array.from({ length: 7 }, (_, i) => Math.round((user[pointsField] || 0) * (i + 1) / 7)),
      color: this.COLORS[index % this.COLORS.length]
    }));

    // console.log(`Dati per ${chartId}:`, { series, categories });

    let isDarkTheme = false;
    this.themeService.isDarkTheme$.subscribe(theme => (isDarkTheme = theme)).unsubscribe();

    const options = {
      series,
      chart: {
        height: '200px',
        maxWidth: '100%',
        type: 'area',
        fontFamily: 'Inter, sans-serif',
        dropShadow: { enabled: false },
        toolbar: { show: false }
      },
      tooltip: {
        enabled: false,
        x: { show: false },
        y: {
          formatter: (value: number) => `${value} punti`
        }
      },
      legend: {
        show: true,
        position: 'bottom',
        labels: {
          colors: isDarkTheme ? '#d1d5db' : '#374151'
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.35, //0.55
          opacityTo: 0,
          shade: isDarkTheme ? '#1C64F2' : '#1A56DB',
          gradientToColors: [isDarkTheme ? '#1C64F2' : '#1A56DB']
        }
      },
      dataLabels: { enabled: false },
      stroke: { width: 6 },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: { left: 2, right: 2, top: -26 }
      },
      xaxis: {
        categories,
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      yaxis: {
        show: false,
        labels: {
          formatter: (value: number) => `${value} punti`
        }
      }
    };

    const chart = new ApexCharts(element, options);
    chart.render();
    this.charts.push(chart);
  }
}
