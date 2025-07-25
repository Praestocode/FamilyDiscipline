import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, EmbeddedViewRef, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-tracking-card-smoke',
  templateUrl: './tracking-card-smoke.component.html',
  styleUrls: ['./tracking-card-smoke.component.scss']
})
export class TrackingCardSmokeComponent implements OnInit, OnDestroy {
  count: number = 0;
  limit: number = 10;
  consecutive_days: number = 0;
  consecutive_weeks: number = 0;
  isLoading: boolean = true;
  isProcessing: boolean = false;
  isIncrementing: boolean = false;
  isDecrementing: boolean = false;
  showToast: boolean = false;
  toastMessage: string = '';
  isDarkTheme: boolean = true;
  isAssigning50Points: boolean = false;
  private toastTimeout: any;

  famcoin = environment.famcoin; // Variabile per icona Famcoin


  private themeSubscription: Subscription;

  @ViewChild('toastTemplate') toastTemplate!: TemplateRef<any>;
  toastRef: EmbeddedViewRef<any> | null = null;

  private toastMessages: string[] = [
    'Stiamo esagerando oggi',
    'Domani andrà meglio :(',
    'Mhmm..così non va bene'
  ];

  constructor(private http: HttpClient, private vcr: ViewContainerRef, private themeService: ThemeService) {
    this.themeSubscription = this.themeService.isDarkTheme$.subscribe(isDark => {
      //console.log('Theme changed, isDark:', isDark); // Debug
      this.isDarkTheme = isDark;
    });
  }

  ngOnInit() {
    this.http.get(`${environment.apiUrl}/smoke`).subscribe({
      next: (data: any) => {
        this.count = data.count;
        this.limit = data.limit;
        this.consecutive_days = data.consecutive_days;
        this.consecutive_weeks = data.consecutive_weeks;
        this.isLoading = false;
        if(this.count>this.limit){
          this.isAssigning50Points = false;
        } else {
          this.isAssigning50Points = true;
        }
      },
      error: (err) => {
        console.error('Errore caricamento dati:', err);
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();

    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }

    if (this.toastRef) {
      this.toastRef.destroy();
      this.toastRef = null;
    }
  }

  get progressWidth(): number {
    return Math.min((this.count / this.limit) * 100, 100);
  }

  get cigaretteImage(): string {
    return this.isDarkTheme ? '/assets/images/icons/whitecig.png' : '/assets/images/icons/purplecig.png';
  }

  increment() {
    if (this.isProcessing) return;
    this.isProcessing = true;
    this.isIncrementing = true;

    const previousCount = this.count;
    this.count++;
    if (previousCount <= this.limit && this.count > this.limit) {
      this.showToastMessage();
      this.isAssigning50Points = false;
    }

    this.http.post(`${environment.apiUrl}/smoke/increment`, {}).subscribe({
      next: (data: any) => {
        this.count = data.count;
        this.isProcessing = false;
        this.isIncrementing = false;
      },
      error: (err) => {
        console.error('Errore incremento:', err);
        this.count = previousCount;
        this.isProcessing = false;
        this.isIncrementing = false;
      }
    });
  }

  decrement() {
    if (this.isProcessing || this.count <= 0) return;
    this.isProcessing = true;
    this.isDecrementing = true;

    const previousCount = this.count;
    this.count--;
    if (previousCount > this.limit && this.count <= this.limit) {
      this.isAssigning50Points = true;
    }

    this.http.post(`${environment.apiUrl}/smoke/decrement`, {}).subscribe({
      next: (data: any) => {
        this.count = data.count;
        this.isProcessing = false;
        this.isDecrementing = false;
      },
      error: (err) => {
        console.error('Errore decremento:', err);
        this.count = previousCount;
        this.isProcessing = false;
        this.isDecrementing = false;
      }
    });
  }

  // private showToastMessage() {
  //   this.toastMessage = this.toastMessages[Math.floor(Math.random() * this.toastMessages.length)];
  //   this.showToast = true;
  //   setTimeout(() => {
  //     this.showToast = false;
  //   }, 3000);
  // }
    showToastMessage() {
    //this.toastMessage = message;
    this.toastMessage = this.toastMessages[Math.floor(Math.random() * this.toastMessages.length)];

    // Mostra dinamicamente il toast nel body
    if (this.toastRef) {
      this.toastRef.destroy(); // Elimina eventuale vecchio toast
    }

    this.toastRef = this.vcr.createEmbeddedView(this.toastTemplate);
    document.body.appendChild(this.toastRef.rootNodes[0]);

    // Timeout per nascondere il toast
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    this.toastTimeout = setTimeout(() => {
      this.hideToast();
    }, 3000);
    }

    hideToast() {
      if (this.toastRef) {
        this.toastRef.destroy();
        this.toastRef = null;
      }
      this.toastMessage = '';
      if (this.toastTimeout) {
        clearTimeout(this.toastTimeout);
        this.toastTimeout = null;
      }
    }
}
