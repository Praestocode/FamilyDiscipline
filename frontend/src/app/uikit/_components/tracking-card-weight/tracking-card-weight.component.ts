import { Component, OnInit, OnDestroy, TemplateRef, ViewChild, ViewContainerRef, EmbeddedViewRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-tracking-card-weight',
  templateUrl: './tracking-card-weight.component.html',
  styleUrls: ['./tracking-card-weight.component.scss']
})
export class TrackingCardWeightComponent implements OnInit, OnDestroy {
  starting_weight: number | null = null;
  current_weight: number | null = null;
  ideal_weight: number | null = null;
  points_earned: number = 0;
  discipline_points: number = 0;
  isLoading: boolean = true;
  isProcessing: boolean = false;
  isDarkTheme: boolean = true;
  isStartingWeightSaved: boolean = false;
  isCurrentWeightSaved: boolean = false;
  isIdealWeightSaved: boolean = false;
  isStartingWeightEditable: boolean = true;
  isCurrentWeightEditable: boolean = true;
  isIdealWeightEditable: boolean = true;
  isStartingWeightEditing: boolean = false;
  isCurrentWeightEditing: boolean = false;
  isIdealWeightEditing: boolean = false;
  isStartingWeightSaving: boolean = false;
  isCurrentWeightSaving: boolean = false;
  isIdealWeightSaving: boolean = false;
  startingWeightError: string | null = null;
  currentWeightError: string | null = null;
  idealWeightError: string | null = null;
  cardError: string | null = null;
  isCurrentWeightErrorAnimation: boolean = false;
  private themeSubscription: Subscription;




  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;
  modalRef: any;


  @ViewChild('toastTemplate') toastTemplate!: TemplateRef<any>;
  toastRef: EmbeddedViewRef<any> | null = null;


  // Nuova variabile per la progress bar
  progressPercentage: number = 0;
  
  famcoin = environment.famcoin; // Variabile per icona Famcoin

  showResetModal: boolean = false;
  showToast: boolean = false;
  toastMessage: string = '';
  private toastTimeout: any;

  constructor(private http: HttpClient, private vcr: ViewContainerRef, private themeService: ThemeService) {
    this.themeSubscription = this.themeService.isDarkTheme$.subscribe(isDark => {
      this.isDarkTheme = isDark;
    });
  }

  ngOnInit() {
    this.loadData();
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

  loadData() {
    this.http.get(`${environment.apiUrl}/weight`).subscribe({
      next: (data: any) => {
        this.starting_weight = data.starting_weight || null;
        this.current_weight = data.current_weight || null;
        this.ideal_weight = data.ideal_weight || null;
        this.points_earned = data.points_earned || 0;
        this.discipline_points = data.discipline_points || 0;
        this.isStartingWeightSaved = this.starting_weight != null && this.starting_weight > 0;
        this.isCurrentWeightSaved = this.current_weight != null && this.current_weight > 0;
        this.isIdealWeightSaved = this.ideal_weight != null && this.ideal_weight > 0;
        this.isStartingWeightEditable = !this.isStartingWeightSaved;
        this.isCurrentWeightEditable = !this.isCurrentWeightSaved;
        this.isIdealWeightEditable = !this.isIdealWeightSaved;
        this.isLoading = false;
        this.updateProgressPercentage();
        //console.log('Dati caricati:', data);
      },
      error: (err) => {
        console.error('Errore caricamento dati:', err);
        this.isLoading = false;
      }
    });
  }

  updateStartingWeight() {
    if (this.isProcessing) return;
    this.isProcessing = true;
    this.isStartingWeightSaving = true;
    this.startingWeightError = null;
    this.cardError = null;

    // Validazione frontend
    if (this.starting_weight != null && this.starting_weight < 35) {
      this.startingWeightError = 'Magna mmoccò...'; //(impossibile inserire questo peso)
      this.isProcessing = false;
      this.isStartingWeightSaving = false;
      return;
    }
    if (this.starting_weight != null && this.starting_weight > 120) {
      this.startingWeightError = 'Ciao Martina, per recuperare le tue credenziali scrivici a assistenza@ciambelloni.com'; //(impossibile inserire questo peso)
      this.isProcessing = false;
      this.isStartingWeightSaving = false;
      return;
    }

    //console.log('Invio updateStartingWeight:', { starting_weight: this.starting_weight || 0 });

    this.http.post(`${environment.apiUrl}/weight/update`, {
      starting_weight: this.starting_weight || 0
    }).subscribe({
      next: () => {
        this.isStartingWeightSaved = this.starting_weight != null && this.starting_weight > 0;
        this.isStartingWeightEditable = !this.isStartingWeightSaved;
        this.isStartingWeightEditing = false;
        this.isStartingWeightSaving = false;
        this.isProcessing = false;
        this.loadData();
        //console.log('updateStartingWeight completato');
      },
      error: (err) => {
        if (err.status === 422 && err.error?.error) {
          this.startingWeightError = err.error.error.includes('iniziale') ? err.error.error : null;
        }
        console.error('Errore aggiornamento peso iniziale:', err);
        this.isProcessing = false;
        this.isStartingWeightSaving = false;
      }
    });
  }

  updateIdealWeight() {
    if (this.isProcessing) return;
    this.isProcessing = true;
    this.isIdealWeightSaving = true;
    this.idealWeightError = null;
    this.cardError = null;

    // Validazione frontend
    if (this.ideal_weight != null && this.ideal_weight < 35) {
      this.idealWeightError = 'Magna mmoccò...'; //(impossibile inserire questo peso)
      this.isProcessing = false;
      this.isIdealWeightSaving = false;
      return;
    }
    if (this.ideal_weight != null && this.ideal_weight > 100) {
      this.idealWeightError = 'Cioè praticamente vuoi diventare Cristina...u\' pitbull'; //(impossibile inserire questo peso)
      this.isProcessing = false;
      this.isIdealWeightSaving = false;
      return;
    }
    if (this.starting_weight != null && this.starting_weight > 0 && this.ideal_weight != null && this.ideal_weight < this.starting_weight - 60) {
      this.idealWeightError = 'Il peso ideale non può essere inferiore al peso iniziale più di 60 kg.';
      this.isProcessing = false;
      this.isIdealWeightSaving = false;
      return;
    }

    //console.log('Invio updateIdealWeight:', { ideal_weight: this.ideal_weight || 0 });

    this.http.post(`${environment.apiUrl}/weight/update`, {
      ideal_weight: this.ideal_weight || 0
    }).subscribe({
      next: () => {
        this.isIdealWeightSaved = this.ideal_weight != null && this.ideal_weight > 0;
        this.isIdealWeightEditable = !this.isIdealWeightSaved;
        this.isIdealWeightEditing = false;
        this.isIdealWeightSaving = false;
        this.isProcessing = false;
        this.loadData();
        //console.log('updateIdealWeight completato');
      },
      error: (err) => {
        if (err.status === 422 && err.error?.error) {
          this.idealWeightError = err.error.error.includes('ideale') ? err.error.error : null;
        }
        console.error('Errore aggiornamento peso ideale:', err);
        this.isProcessing = false;
        this.isIdealWeightSaving = false;
      }
    });
  }

  updateCurrentWeight() {
    if (this.isProcessing) return;
    this.isProcessing = true;
    this.isCurrentWeightSaving = true;
    this.currentWeightError = null;
    this.cardError = null;

    // Se current_weight è null o 0, invia 0 per azzerare
    const weightToSend = this.current_weight != null && this.current_weight > 0 ? this.current_weight : 0;

    // Validazione frontend
    if (weightToSend > 0 && weightToSend < 35) {
      this.currentWeightError = 'Magna mmoccò...'; //(impossibile inserire il peso)
      this.isProcessing = false;
      this.isCurrentWeightSaving = false;
      return;
    }
    if (weightToSend > 110) {
      this.currentWeightError = 'Martina Massetti has entered the chat'; //(impossibile inserire il peso)
      this.isProcessing = false;
      this.isCurrentWeightSaving = false;
      return;
    }

    //console.log('Invio updateCurrentWeight:', { current_weight: weightToSend });

    this.http.post(`${environment.apiUrl}/weight/daily`, {
      current_weight: weightToSend
    }).subscribe({
      next: (data: any) => {
        this.current_weight = data.current_weight || null;
        this.points_earned = data.points_earned || 0;
        this.isCurrentWeightSaved = this.current_weight != null && this.current_weight > 0;
        this.isCurrentWeightEditable = !this.isCurrentWeightSaved;
        this.isCurrentWeightEditing = false;
        this.isCurrentWeightSaving = false;
        this.isProcessing = false;
        this.loadData();
        //console.log('updateCurrentWeight completato:', data);
      },
      error: (err) => {
        if (err.status === 422 && err.error?.error) {
          this.currentWeightError = err.error.error;
        }
        console.error('Errore aggiornamento peso attuale:', err);
        this.isProcessing = false;
        this.isCurrentWeightSaving = false;
      }
    });
  }

  resetWeights() {
    if (this.isProcessing) return;
    this.isProcessing = true;
    this.http.delete(`${environment.apiUrl}/weight/reset`).subscribe({
      next: () => {
        this.starting_weight = null;
        this.current_weight = null;
        this.ideal_weight = null;
        this.points_earned = 0;
        this.isStartingWeightSaved = false;
        this.isCurrentWeightSaved = false;
        this.isIdealWeightSaved = false;
        this.isStartingWeightEditable = true;
        this.isCurrentWeightEditable = true;
        this.isIdealWeightEditable = true;
        this.isStartingWeightEditing = false;
        this.isCurrentWeightEditing = false;
        this.isIdealWeightEditing = false;
        this.isProcessing = false;
        this.loadData();
        this.showResetModal = false; // Chiude il modal solo dopo il completamento
        this.showToastMessage('Pesi resettati con successo.');
        //console.log('resetWeights completato');
        this.modalRef?.destroy();
      },
      error: (err) => {
        console.error('Errore reset pesi:', err);
        this.isProcessing = false;
        this.showToastMessage('Errore durante il reset dei pesi.');
      }
    });
  }

  enableEdit(field: 'starting' | 'current' | 'ideal') {
    if (field === 'starting') {
      this.isStartingWeightEditable = true;
      this.isStartingWeightEditing = true;
      setTimeout(() => {
        const input = document.querySelector('input[ngModel="starting_weight"]') as HTMLInputElement;
        if (input) input.focus();
      }, 0);
    }
    if (field === 'current') {
      this.isCurrentWeightEditable = true;
      this.isCurrentWeightEditing = true;
      setTimeout(() => {
        const input = document.querySelector('input[ngModel="current_weight"]') as HTMLInputElement;
        if (input) input.focus();
      }, 0);
    }
    if (field === 'ideal') {
      this.isIdealWeightEditable = true;
      this.isIdealWeightEditing = true;
      setTimeout(() => {
        const input = document.querySelector('input[ngModel="ideal_weight"]') as HTMLInputElement;
        if (input) input.focus();
      }, 0);
    }
  }

  startEditing(field: 'starting' | 'current' | 'ideal') {
    if (field === 'starting') {
      this.isStartingWeightEditing = true;
    }
    if (field === 'current') {
      this.isCurrentWeightEditing = true;
    }
    if (field === 'ideal') {
      this.isIdealWeightEditing = true;
    }
  }

  stopEditingIfEmpty(field: 'starting' | 'current' | 'ideal', value: number | null) {
    //console.log(`stopEditingIfEmpty chiamato per ${field}:`, { value });
    if (field === 'starting') {
      this.isStartingWeightEditing = true; // Mantieni editing durante la digitazione
      if (value == null || value <= 0) {
        this.isStartingWeightSaved = false;
        this.isStartingWeightEditable = true;
      }
    }
    if (field === 'current') {
      this.isCurrentWeightEditing = true; // Mantieni editing durante la digitazione
      if (value == null || value <= 0) {
        this.isCurrentWeightSaved = false;
        this.isCurrentWeightEditable = true;
      }
    }
    if (field === 'ideal') {
      this.isIdealWeightEditing = true; // Mantieni editing durante la digitazione
      if (value == null || value <= 0) {
        this.isIdealWeightSaved = false;
        this.isIdealWeightEditable = true;
      }
    }
  }

  checkCurrentWeightInteraction() {
    // console.log('checkCurrentWeightInteraction chiamato:', {
    //   starting_weight: this.starting_weight,
    //   ideal_weight: this.ideal_weight
    // });
    if (this.starting_weight == null || this.starting_weight <= 0 || 
        this.ideal_weight == null || this.ideal_weight <= 0) {
      this.cardError = 'Inserisci prima il peso iniziale e ideale!';
      this.isCurrentWeightErrorAnimation = true;
      setTimeout(() => {
        this.isCurrentWeightErrorAnimation = false;
      }, 500);
    } else {
      this.cardError = null;
      this.isCurrentWeightErrorAnimation = false;
    }
  }

  // Nuova funzione per calcolare la percentuale di progresso
  updateProgressPercentage() {
    if (this.starting_weight != null && this.starting_weight > 0 &&
        this.current_weight != null && this.current_weight > 0 &&
        this.ideal_weight != null && this.ideal_weight > 0 &&
        this.starting_weight > this.ideal_weight) {
      const weightLost = this.starting_weight - this.current_weight;
      const weightToLose = this.starting_weight - this.ideal_weight;
      this.progressPercentage = Math.round((weightLost / weightToLose) * 100);
      if (this.progressPercentage < 0) this.progressPercentage = 0;
      if (this.progressPercentage > 100) this.progressPercentage = 100;
    } else {
      this.progressPercentage = 0;
    }
  }

  // openResetModal() {
  //   this.showResetModal = true;
  // }

  // cancelReset() {
  //   this.showResetModal = false;
  // }

  openResetModal() {
  this.showResetModal = true;
  // crea il modal fuori dal <main>
  this.modalRef = this.vcr.createEmbeddedView(this.modalTemplate);
  document.body.appendChild(this.modalRef.rootNodes[0]); // sposta nel <body>
  }

  cancelReset() {
    this.showResetModal = false;

    this.modalRef?.destroy();
  }

  confirmReset() {
    this.resetWeights(); // Avvia il reset, il modal resta aperto grazie a isProcessing
  }

  // showToastMessage(message: string) {
  //   this.toastMessage = message;
  //   this.showToast = true;
  //   if (this.toastTimeout) {
  //     clearTimeout(this.toastTimeout);
  //   }
  //   this.toastTimeout = setTimeout(() => {
  //     this.hideToast();
  //   }, 3000);
  // }

  // hideToast() {
  //   this.showToast = false;
  //   this.toastMessage = '';
  //   this.toastTimeout = null;
  // }

  showToastMessage(message: string) {
  this.toastMessage = message;

  // Rimuove eventuale vecchio toast prima di mostrarne uno nuovo
  if (this.toastRef) {
    this.toastRef.destroy();
  }

  // Crea nuova vista e la aggiunge nel body
  this.toastRef = this.vcr.createEmbeddedView(this.toastTemplate);
  document.body.appendChild(this.toastRef.rootNodes[0]);

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


  hasWeights(): boolean {
    return (this.starting_weight != null && this.starting_weight > 0) ||
           (this.current_weight != null && this.current_weight > 0) ||
           (this.ideal_weight != null && this.ideal_weight > 0);
  }

  get lockIcon(): string {
    return this.isDarkTheme ? '/assets/images/icons/weightlockwhite.png' : '/assets/images/icons/weightlockpurple.png';
  }

  get goalIcon(): string {
    return this.isDarkTheme ? '/assets/images/icons/weightgoalwhite.png' : '/assets/images/icons/weightgoalpurple.png';
  }

  get editIcon(): string {
    return this.isDarkTheme ? '/assets/images/icons/editwhite.png' : '/assets/images/icons/editpurple.png';
  }

  get saveIcon(): string {
    return this.isDarkTheme ? '/assets/images/icons/savewhite.png' : '/assets/images/icons/savepurple.png';
  }

  get resetIcon(): string {
  return this.isDarkTheme ? '/assets/images/icons/resetwhite.png' : '/assets/images/icons/resetpurple.png';
  }
}