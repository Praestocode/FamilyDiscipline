import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-usercardpath',
  templateUrl: './usercardpath.component.html',
  styleUrls: ['./usercardpath.component.scss']
})
export class UsercardpathComponent implements OnInit, OnDestroy {
  @Input() user: {
    name: string;
    status_id: number;
    user_status: string;
    status_icon: string;
    discipline_points: number;
    profile_picture?: string;
    int_tasks?: number;
    int_weight?: number;
    int_smoke?: number;
  } | null = null;
  @Input() isLoading: boolean = false;

  isDarkTheme: boolean = true; // Valore di default (dark mode)
  private themeSubscription: Subscription | undefined;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Sottoscrizione al tema corrente
    this.themeSubscription = this.themeService.isDarkTheme$.subscribe((isDark) => {
      this.isDarkTheme = isDark;
    });

    // Debug
    // setTimeout(() => {
    //   console.log(
    //     'DA PROFIL CARD: ',
    //     'user_status:', this.user?.user_status,
    //     'status_id:', this.user?.status_id,
    //     'nome', this.user?.name,
    //     'interesse 1', this.user?.int_tasks,
    //     'interesse 2', this.user?.int_weight,
    //     'interesse 3', this.user?.int_smoke
    //   );
    // }, 2500);
  }

  ngOnDestroy(): void {
    // Cleanup della sottoscrizione
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  // Metodo aggiunto per controllare se l'utente è King o Legend
  isKingOrLegend(): boolean {
    return this.user?.status_id === 8 || this.user?.status_id === 9;
  }

  // Metodo per contare gli interessi attivi
  getInterestCount(): number {
    let count = 0;
    if (this.user?.int_tasks === 1) count++;
    if (this.user?.int_weight === 1) count++;
    if (this.user?.int_smoke === 1) count++;
    return count;
  }

  // Metodo per ottenere il titolo del percorso
  getPathTitle(): string {
    const count = this.getInterestCount();
    switch (count) {
      case 1:
        return 'Sniper path';
      case 2:
        return "Il cammino dell'eroe";
      case 3:
        return "Un'impresa titanica";
      default:
        return 'Nessun percorso';
    }
  }

  // Metodo per ottenere la lista degli obiettivi attivi
  getActiveObjectives(): string[] {
    const objectives: string[] = [];
    if (this.user?.int_tasks === 1) objectives.push('rispettare le tasks');
    if (this.user?.int_weight === 1) objectives.push('perdere peso');
    if (this.user?.int_smoke === 1) objectives.push('smettere di fumare');
    return objectives;
  }

  // Metodo per ottenere il testo del percorso
  getPathText(): string {
    const count = this.getInterestCount();
    const objectives = this.getActiveObjectives();

    switch (count) {
      case 1:
        return `Mirare e colpire! Il tuo obiettivo è ${objectives[0]} e gli stai dedicando tutto il tuo focus! Questo è il cammino dei cecchini: selettivi ed estramemente concentrati.`;
      case 2:
        return `Stai seguendo il cammino dell'eroe, bilanciandoti tra due obiettivi: ${objectives[0]} e ${objectives[1]}. Questo percorso che richiede pazienza e costanza ti vedrà protagonista di una grande vittoria!`;
      case 3:
        return `Wow! Vuoi sabotarti o cosa?! Stai affrontando tre obiettivi nello stesso momento: ${objectives[0]}, ${objectives[1]} e ${objectives[2]}. Questo è un cammino veramente arduo, e ci sono solo due modi per uscirne: da sconfitto o da leggenda!`;
      default:
        return 'Nessun percorso attivo. Scegli un obiettivo per iniziare!';
    }
  }

  // Metodo per ottenere il percorso dell'icona in base al tema e al numero di interessi
  getPathIcon(): string {
    const count = this.getInterestCount();
    const basePath = '/assets/images/icons/';
    // Usa icone light per King (status_id 8) o Legend (status_id 9)
    const useLightIcon = this.isKingOrLegend() || !this.isDarkTheme;

    switch (count) {
      case 1:
        return useLightIcon ? `${basePath}lightsniper.png` : `${basePath}lightsniper.png`; // icone impostate 'purple' per entrambe dark/light mode - usare prefisso 'dark' invece di 'light' per cambiare
      case 2:
        return useLightIcon ? `${basePath}lighthero.png` : `${basePath}lighthero.png`; // icone impostate 'purple' per entrambe dark/light mode - usare prefisso 'dark' invece di 'light' per cambiare
      case 3:
        return useLightIcon ? `${basePath}lighttitanic.png` : `${basePath}lighttitanic.png`; // icone impostate 'purple' per entrambe dark/light mode - usare prefisso 'dark' invece di 'light' per cambiare
      default:
        return ''; // Nessuna icona se non ci sono percorsi attivi
    }
  }
}