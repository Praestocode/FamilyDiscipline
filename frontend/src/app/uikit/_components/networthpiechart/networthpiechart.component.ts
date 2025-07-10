import { Component, OnInit, OnDestroy } from '@angular/core';
import ApexCharts from 'apexcharts';
import { AuthService } from '../../../services/auth.service'; // Aggiorna il percorso
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-networthpiechart',
  templateUrl: './networthpiechart.component.html',
  styleUrls: ['./networthpiechart.component.scss']
})
export class NetworthpiechartComponent implements OnInit, OnDestroy {
  isLoading = true; // Per il placeholder
  showNoDataMessage = false; // Per il messaggio "Nessun dato"
  chart: any; // Riferimento al grafico
  private dataSubscription: Subscription | null = null;
  private themeSubscription: Subscription | null = null; // Sottoscrizione per il tema
  private users: any[] = []; // Memorizza gli utenti
  famcoin = environment.famcoin; // Variabile per icona Famcoin
  private readonly MAX_USERS = 10; // Configura il numero massimo di utenti visualizzati

  totalPoints: number = 0; // Totale dei punti
  maxPointsUser: any = null; // Utente con più punti
  minPointsUser: any = null; // Utente con meno punti

  // Palette di colori nelle tonalità di viola, blu scuro, celeste, viola chiaro
  colorPalette = [
    '#4B0082', // Indaco
    '#6A5ACD', // Blu medio
    '#7B68EE', // Medium Slate Blue
    '#9370DB', // Medium Purple
    '#B0C4DE', // Light Steel Blue
    '#ADD8E6', // Light Blue
    '#E6E6FA', // Lavender
    '#DDA0DD', // Plum
    '#BA55D3', // Medium Orchid
    '#9932CC', // Dark Orchid
    '#8A2BE2', // Blue Violet
    '#9400D3', // Dark Violet
    '#6B7280', // Gray
    '#4682B4', // Steel Blue
    '#87CEEB'  // Sky Blue
  ];

  constructor(private authService: AuthService, private themeService: ThemeService) {}

ngOnInit() {
  // Carica i dati degli utenti una sola volta
  this.dataSubscription = this.authService.getUsers().subscribe({
    next: (users) => {
      // console.log('Utenti ricevuti:', users); // Debug
      this.users = users; // Memorizza gli utenti
      this.isLoading = false;
      // Sottoscrizione al cambio di tema
      this.themeSubscription = this.themeService.isDarkTheme$.subscribe(isDark => {
        this.renderChart(this.users); // Renderizza il grafico con gli utenti memorizzati
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
  if (this.chart) {
    this.chart.destroy();
  }
}

  loadChartData() {
    // this.isLoading = true;
    // this.dataSubscription = this.authService.getUsers().subscribe({
    //   next: (users) => {
    //     console.log('Utenti ricevuti:', users); // Debug
    //     this.renderChart(users);
    //     this.isLoading = false;
    //   },
    //   error: (err) => {
    //     console.error('Errore caricamento utenti:', err);
    //     this.isLoading = false;
    //     this.showNoDataMessage = true;
    //   }
    // });
  }

  renderChart(users: any[]) {
    if (this.chart) {
      this.chart.destroy(); // Distrugge il grafico precedente
    }

    // Ordina gli utenti per punti e prendi i primi 10
    const topUsers = users
      .sort((a, b) => b.discipline_points - a.discipline_points)
      .slice(0, this.MAX_USERS);

    // Calcola totale punti e trova max/min
    this.totalPoints = users.reduce((sum, user) => sum + user.discipline_points, 0);
    this.maxPointsUser = topUsers[0]; // Primo utente (maggiori punti)
    this.minPointsUser = topUsers[topUsers.length - 1]; // Ultimo utente (minori punti)

    // Verifica se ci sono punti diversi da 0
    const hasPoints = topUsers.some(user => user.discipline_points > 0);

    if (!hasPoints) {
      this.showNoDataMessage = true;
      this.isLoading = false;
      return;
    }

    this.showNoDataMessage = false;

    // Estrai i dati per il grafico
    const series = topUsers.map(user => user.discipline_points);
    const labels = topUsers.map(user => user.name);
    const colors = topUsers.map((_, index) => this.colorPalette[index % this.colorPalette.length]);

    // Array di colori per la legenda basato sul tema
    const legendColors = new Array(labels.length).fill(this.themeService.getCurrentTheme() ? '#FFFFFF' : '#422e72');

    const options = {
      chart: {
        type: 'pie',
        width: '100%',
        height: 300, // Ripristinato a 300px
        toolbar: { show: false }
      },
      series: series,
      labels: labels,
      colors: colors,
      legend: {
        position: 'bottom',
        fontFamily: 'Inter, sans-serif',
        labels: {
          colors: legendColors,
          useSeriesColors: false
        },
        onItemClick: {
          toggleDataSeries: true // Abilita selezione/deselezione al clic
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: { width: '100%' },
          legend: { position: 'bottom' }
        }
      }],
      dataLabels: {
        enabled: true,
        formatter: function (val: number, opts: any) {
          const percentage = Math.round(val); // Calcola la percentuale arrotondata
          const points = opts.w.config.series[opts.seriesIndex]; // Punti assoluti
          const isSelected = opts.w.globals.selectedDataPoints[0]?.includes(opts.seriesIndex); // Verifica se la fetta è selezionata
          return isSelected ? `${percentage}% (${points} punti)` : `${percentage}%`; // Mostra punti solo se selezionata
        },
        style: {
          colors: ['#FFFFFF'], // Forza bianco per tutti i data labels
          fontSize: '14px'
        }
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return `${val} punti`;
          }
        }
      }
    };

    // Ritarda il rendering per assicurare che il DOM sia pronto
// Ritarda il rendering per assicurare che il DOM sia pronto
setTimeout(() => {
  // console.log('Stato prima del rendering: isLoading=', this.isLoading, 'showNoDataMessage=', this.showNoDataMessage); // Debug
  const chartElement = document.querySelector('#pie-chart') as HTMLElement;
  if (chartElement) {
    // Distrugge il grafico esistente se presente
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    // console.log('Elemento #pie-chart trovato, inizializzo il grafico');
    this.chart = new ApexCharts(chartElement, options);
    this.chart.render();
  } else {
    console.error('Elemento #pie-chart non trovato nel DOM');
    this.showNoDataMessage = true;
    this.isLoading = false;
  }
}, 300); // Aumentato a 300ms per garantire che il DOM sia pronto
  }
}