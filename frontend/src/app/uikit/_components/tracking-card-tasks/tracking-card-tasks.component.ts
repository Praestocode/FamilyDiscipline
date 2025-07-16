import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, TemplateRef, ViewContainerRef, EmbeddedViewRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ThemeService } from '../../../services/theme.service';

interface Task {
  id?: string;
  description: string;
  time: string;
  completed: boolean;
  points_earned: number;
}

@Component({
  selector: 'app-tracking-card-tasks',
  templateUrl: './tracking-card-tasks.component.html',
  styleUrls: ['./tracking-card-tasks.component.scss']
})
export class TrackingCardTasksComponent implements OnInit, OnDestroy, AfterViewInit {
  tasksWeekday: Task[][] = Array(18).fill([]).map(() => []);
  tasksWeekend: Task[][] = Array(18).fill([]).map(() => []);
  hours: string[] = Array.from({ length: 18 }, (_, i) => `${i + 5}:00`);
  isLoading: boolean = true;
  isProcessing: boolean = false;
  isSaving: boolean = false;
  isDeleting: Map<string, boolean> = new Map();
  isDarkTheme: boolean = true;
  currentDay: string = '';
  isWeekday: boolean = true;
  showOtherCard: boolean = false;
  editingTask: { index: number, taskIndex: number, type: 'weekday' | 'weekend', isNew: boolean } | null = null;
  newTaskDescription: string = '';
  pointsEarnedWeekday: number = 0;
  pointsEarnedWeekend: number = 0;
  showToast: boolean = false;
  toastMessage: string = '';
  showResetModal: boolean = false;
  resetCardType: 'weekday' | 'weekend' | null = null;
  private themeSubscription: Subscription;
  private isSaveIconClicked: boolean = false;
  private toastTimeout: any;

  @ViewChild('taskInput') taskInput!: ElementRef<HTMLInputElement>;

  //Nuovo codice

  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;
  modalRef: any;

  @ViewChild('toastTemplate') toastTemplate!: TemplateRef<any>;
  toastRef: EmbeddedViewRef<any> | null = null;

  constructor(private http: HttpClient, private vcr: ViewContainerRef, private themeService: ThemeService) {
    this.themeSubscription = this.themeService.isDarkTheme$.subscribe(isDark => {
      this.isDarkTheme = isDark;
    });
  }

  famcoin = environment.famcoin; // Variabile per icona Famcoin

  ngOnInit() {
    this.setCurrentDay();
    this.loadData();
  }

  ngAfterViewInit() {
    if (this.taskInput) {
      setTimeout(() => this.taskInput.nativeElement.focus(), 0);
    }
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

  setCurrentDay() {
    const today = new Date();
    this.currentDay = today.toLocaleDateString('it-IT', { weekday: 'long' });
    const day = today.getDay();
    this.isWeekday = day >= 1 && day <= 5;
  }

  loadData() {
    this.isLoading = true;
    this.http.get(`${environment.apiUrl}/tasks`).subscribe({
      next: (data: any) => {
        this.tasksWeekday = Array(18).fill([]).map(() => []);
        this.tasksWeekend = Array(18).fill([]).map(() => []);
        this.pointsEarnedWeekday = 0;
        this.pointsEarnedWeekend = 0;

        data.tasks.forEach((task: any) => {
          const timeParts = task.time.split(':');
          const normalizedTime = `${parseInt(timeParts[0], 10)}:${timeParts[1]}`;
          const hourIndex = parseInt(timeParts[0], 10) - 5;

          if (hourIndex >= 0 && hourIndex < 18) {
            const targetTasks = task.type === 'weekday' ? this.tasksWeekday : this.tasksWeekend;
            const newTask: Task = {
              id: task.id,
              description: task.description,
              time: normalizedTime,
              completed: task.completed,
              points_earned: task.points_earned
            };
            targetTasks[hourIndex] = [...(targetTasks[hourIndex] || []), newTask];
            if (task.completed) {
              if (task.type === 'weekday') {
                this.pointsEarnedWeekday += task.points_earned;
              } else {
                this.pointsEarnedWeekend += task.points_earned;
              }
            }
          }
        });

        this.isLoading = false;
        //console.log('Dati caricati:', data);
      },
      error: (err) => {
        console.error('Errore caricamento dati:', err);
        this.isLoading = false;
      }
    });
  }

  hasTasks(type: 'weekday' | 'weekend'): boolean {
    const targetTasks = type === 'weekday' ? this.tasksWeekday : this.tasksWeekend;
    return targetTasks.some(tasks => tasks.some(task => task.id));
  }

  get progressPercentageWeekday(): number {
    let totalTasks = 0;
    let completedTasks = 0;
    this.tasksWeekday.forEach(tasks => {
      totalTasks += tasks.length;
      completedTasks += tasks.filter(task => task.completed).length;
    });
    return totalTasks > 0 && completedTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  }

  get progressPercentageWeekend(): number {
    let totalTasks = 0;
    let completedTasks = 0;
    this.tasksWeekend.forEach(tasks => {
      totalTasks += tasks.length;
      completedTasks += tasks.filter(task => task.completed).length;
    });
    return totalTasks > 0 && completedTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  }

  addTask(hourIndex: number, type: 'weekday' | 'weekend') {
    if (this.editingTask) {
      this.cancelEdit();
    }

    const targetTasks = type === 'weekday' ? this.tasksWeekday : this.tasksWeekend;
    if (targetTasks[hourIndex].length >= 3) {
      this.showToastMessage('Massimo 3 compiti per orario!');
      return;
    }

    const newTask: Task = {
      description: '',
      time: this.hours[hourIndex],
      completed: false,
      points_earned: 0
    };

    targetTasks[hourIndex] = [...targetTasks[hourIndex], newTask];
    this.editingTask = { index: hourIndex, taskIndex: targetTasks[hourIndex].length - 1, type, isNew: true };
    this.newTaskDescription = '';

    setTimeout(() => {
      if (this.taskInput) {
        this.taskInput.nativeElement.focus();
      }
    }, 0);
  }

  saveTask() {
    //console.log('saveTask called', { editingTask: this.editingTask, newTaskDescription: this.newTaskDescription });
    if (!this.editingTask || !this.newTaskDescription.trim()) {
      //console.log('saveTask exited early', { editingTask: this.editingTask, newTaskDescription: this.newTaskDescription });
      this.cancelEdit();
      return;
    }

    const { index, taskIndex, type } = this.editingTask;
    const targetTasks = type === 'weekday' ? this.tasksWeekday : this.tasksWeekend;
    const task = targetTasks[index][taskIndex];

    this.isSaving = true;
    const payload = {
      description: this.newTaskDescription,
      time: this.hours[index],
      type,
      id: task.id || null
    };

    //console.log('Saving task with payload:', payload);

    const endpoint = task.id ? `${environment.apiUrl}/tasks/update` : `${environment.apiUrl}/tasks/create`;
    this.http.post(endpoint, payload, { observe: 'response' }).subscribe({
      next: (response: any) => {
        //console.log('Risposta backend:', response);
        const updatedTask: Task = {
          id: response.body.task?.id || task.id,
          description: this.newTaskDescription,
          time: this.hours[index],
          completed: task.completed,
          points_earned: task.points_earned
        };
        targetTasks[index][taskIndex] = updatedTask;
        this.editingTask = null;
        this.newTaskDescription = '';
        this.isSaving = false;
        this.isSaveIconClicked = false;
      },
      error: (err) => {
        console.error('Errore salvataggio task:', err);
        this.isSaving = false;
        this.isSaveIconClicked = false;
        this.showToastMessage('Errore durante il salvataggio del compito.');
      }
    });
  }

  cancelEdit() {
    if (!this.editingTask) return;

    const { index, taskIndex, type, isNew } = this.editingTask;
    const targetTasks = type === 'weekday' ? this.tasksWeekday : this.tasksWeekend;

    // Rimuovi la task se è nuova (non salvata)
    if (isNew) {
      targetTasks[index] = targetTasks[index].filter((_, idx) => idx !== taskIndex);
    } else if (!this.newTaskDescription.trim()) {
      // Per task esistenti, se la descrizione è vuota, mostra un messaggio
      this.showToastMessage('La descrizione del compito non può essere vuota.');
    }

    this.editingTask = null;
    this.newTaskDescription = '';
    this.isSaving = false;
  }

  onBlur(event: Event) {
    const focusEvent = event as FocusEvent;
    const relatedTarget = focusEvent.relatedTarget as HTMLElement | null;
    // console.log('onBlur triggered', {
    //   isSaveIconClicked: this.isSaveIconClicked,
    //   relatedTarget: relatedTarget instanceof HTMLElement ? relatedTarget.className : 'null or not an HTMLElement'
    // });

    if (this.isSaveIconClicked || (relatedTarget && (relatedTarget.classList.contains('save-icon') || relatedTarget.closest('.save-icon-wrapper')))) {
      return;
    }

    this.cancelEdit();
  }

  onSaveIconMouseDown() {
    //console.log('onSaveIconMouseDown triggered');
    this.isSaveIconClicked = true;
    this.saveTask();
    setTimeout(() => {
      //console.log('isSaveIconClicked reset');
      this.isSaveIconClicked = false;
    }, 100);
  }

  editTask(hourIndex: number, taskIndex: number, type: 'weekday' | 'weekend') {
    const targetTasks = type === 'weekday' ? this.tasksWeekday : this.tasksWeekend;
    this.editingTask = { index: hourIndex, taskIndex, type, isNew: false };
    this.newTaskDescription = targetTasks[hourIndex][taskIndex].description;

    setTimeout(() => {
      if (this.taskInput) {
        this.taskInput.nativeElement.focus();
      }
    }, 0);
  }

  deleteTask(task: Task, hourIndex: number, taskIndex: number, type: 'weekday' | 'weekend') {
    if (!task.id) return;

    const targetTasks = type === 'weekday' ? this.tasksWeekday : this.tasksWeekend;
    this.isDeleting.set(task.id!, true);
    console.log('eseguo deleteTask da tarckingcardtasks.ts'); // da togliere dopo il debug
    this.http.delete(`${environment.apiUrl}/tasks/delete/${task.id!}`).subscribe({
      next: () => {
        targetTasks[hourIndex] = targetTasks[hourIndex].filter((_, idx) => idx !== taskIndex);
        if (task.points_earned > 0) {
          if (type === 'weekday') {
            this.pointsEarnedWeekday -= task.points_earned;
          } else {
            this.pointsEarnedWeekend -= task.points_earned;
          }
        }
        this.isDeleting.delete(task.id!);
      },
      error: (err) => {
        console.error('Errore eliminazione task:', err);
        this.isDeleting.delete(task.id!);
        this.showToastMessage('Errore durante l\'eliminazione del compito.');
      }
    });
  }

  toggleTaskCompletion(task: Task, hourIndex: number, taskIndex: number, type: 'weekday' | 'weekend') {
    if (!task.id) return;

    if (type === 'weekday' && !this.isWeekday) {
      this.showToastMessage('Non puoi completare compiti feriali in un giorno festivo!');
      task.completed = false;
      return;
    }
    if (type === 'weekend' && this.isWeekday) {
      this.showToastMessage('Non puoi completare compiti festivi in un giorno feriale!');
      task.completed = false;
      return;
    }

    const targetTasks = type === 'weekday' ? this.tasksWeekday : this.tasksWeekend;
    const originalCompletedState = !task.completed;
    const newCompletedState = task.completed;

    this.isProcessing = true;

    console.log('eseguo task complete da trackingcardtasks.ts'); //da togliere dopo il debug

    this.http.post(`${environment.apiUrl}/tasks/complete`, {
      id: task.id,
      completed: newCompletedState
    }, { observe: 'response' }).subscribe({
      next: (response: any) => {
        //console.log('Risposta backend complete:', response);
        if (response.body.message === 'Task aggiornato') {
          targetTasks[hourIndex][taskIndex] = {
            ...task,
            completed: response.body.task.completed,
            points_earned: response.body.task.points_earned
          };
          if (type === 'weekday') {
            this.pointsEarnedWeekday = response.body.points_earned;
          } else {
            this.pointsEarnedWeekend = response.body.points_earned;
          }
          this.isProcessing = false;
        } else {
          console.error('Risposta inattesa:', response.body);
          targetTasks[hourIndex][taskIndex] = {
            ...task,
            completed: originalCompletedState,
            points_earned: originalCompletedState ? 10 : 0
          };
          this.isProcessing = false;
          this.showToastMessage('Errore: risposta inattesa dal server.');
        }
      },
      error: (err) => {
        console.error('Errore aggiornamento completamento task:', err);
        targetTasks[hourIndex][taskIndex] = {
          ...task,
          completed: originalCompletedState,
          points_earned: originalCompletedState ? 10 : 0
        };
        this.isProcessing = false;
        this.showToastMessage('Errore durante il completamento del compito.');
      }
    });
  }

  openResetModal(type: 'weekday' | 'weekend') {
    this.resetCardType = type;
    this.showResetModal = true;

    this.modalRef = this.vcr.createEmbeddedView(this.modalTemplate);
    document.body.appendChild(this.modalRef.rootNodes[0]); // sposta nel <body>
  }

  cancelReset() {
    this.showResetModal = false;
    this.resetCardType = null;

    this.modalRef?.destroy();
  }

  async confirmReset() {
    if (!this.resetCardType) return;

    this.isProcessing = true;

    try {
      await lastValueFrom(this.http.delete(`${environment.apiUrl}/tasks/reset/${this.resetCardType}`));
      this.tasksWeekday = this.resetCardType === 'weekday' ? Array(18).fill([]).map(() => []) : this.tasksWeekday;
      this.tasksWeekend = this.resetCardType === 'weekend' ? Array(18).fill([]).map(() => []) : this.tasksWeekend;
      if (this.resetCardType === 'weekday') {
        this.pointsEarnedWeekday = 0;
      } else {
        this.pointsEarnedWeekend = 0;
      }
      console.log('eseguo reset tasks da trackingcardtasks.ts'); // da togliere dopo il debug
      this.showToastMessage(`Agenda ${this.resetCardType === 'weekday' ? 'feriale' : 'festiva'} resettata con successo.`);
    } catch (err) {
      console.error('Errore durante il reset della card:', err);
      this.showToastMessage('Errore durante il reset della card.');
    }

    this.isProcessing = false;
    this.showResetModal = false;
    this.resetCardType = null;
    this.modalRef?.destroy();
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


  trackByTask(index: number, task: Task): string {
    return task.id || `${index}`;
  }

  toggleOtherCard() {
    this.showOtherCard = !this.showOtherCard;
    setTimeout(() => {
      const cardId = this.isWeekday ? 'weekend-card' : 'weekday-card';
      const cardElement = document.getElementById(cardId);
      if (cardElement) {
        cardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  }

  saveOtherCard() {
    this.showOtherCard = false;
    setTimeout(() => {
      const cardId = this.isWeekday ? 'weekday-card' : 'weekend-card';
      const cardElement = document.getElementById(cardId);
      if (cardElement) {
        cardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  }

  get editIcon(): string {
    return this.isDarkTheme ? '/assets/images/icons/editwhite.png' : '/assets/images/icons/editpurple.png';
  }

  get saveIcon(): string {
    return this.isDarkTheme ? '/assets/images/icons/savewhite.png' : '/assets/images/icons/savepurple.png';
  }

  get deleteIcon(): string {
    return this.isDarkTheme ? '/assets/images/icons/deletewhite.png' : '/assets/images/icons/deletepurple.png';
  }

  get resetIcon(): string {
    return this.isDarkTheme ? '/assets/images/icons/resetwhite.png' : '/assets/images/icons/resetpurple.png';
  }

  get downArrowIcon(): string {
    return this.isDarkTheme ? '/assets/images/icons/downarrowwhite.png' : '/assets/images/icons/downarrowpurple.png';
  }

  get clockIcon(): string {
    return this.isDarkTheme ? '/assets/images/icons/clockwhite.png' : '/assets/images/icons/clockpurple.png';
  }

  get calendarIcon() : string {
    return this.isDarkTheme ? '/assets/images/icons/calendarwhite.png' : '/assets/images/icons/calendarpurple.png';
  }

  scrollToCurrentHour(type: 'weekday' | 'weekend') {
    const now = new Date();
    const currentHour = now.getHours();
    let targetHour = Math.floor(currentHour);
    targetHour = Math.max(5, Math.min(22, targetHour)); // Limita tra 5:00 e 22:00
    const hourIndex = targetHour - 5;
    const cardId = type === 'weekday' ? 'weekday-card' : 'weekend-card';
    const tableRow = document.querySelector(`#${cardId} tbody tr:nth-child(${hourIndex + 1})`);
    if (tableRow) {
      tableRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const hourCell = document.getElementById(`${type}-hour-${hourIndex}`);
      if (hourCell) {
        hourCell.classList.add('highlight-hour');
        setTimeout(() => {
          hourCell.classList.remove('highlight-hour');
        }, 900); // Durata dell'animazione (0.3s)
      } else {
        console.warn(`Cella orario non trovata: ${type}-hour-${hourIndex}`);
      }
    }
  }

  scrollToToggleButton() {
    const toggleButton = document.getElementById('toggle-card-button');
    if (toggleButton) {
      toggleButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
      toggleButton.classList.add('animating-pulsation');
      setTimeout(() => {
        toggleButton.classList.remove('animating-pulsation');
      }, 600); // Durata dell'animazione (2 cicli di 0.3s)
    }
  }
}
