import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  users: { name: string, status_id: number, status_name: string, status_icon: string, discipline_points: number, profile_picture?: string }[] = [];
  isLoading: boolean = true;
  placeholderArray: number[] = [1, 2, 3]; // 3 placeholder durante il caricamento

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/users').subscribe({
      next: (data: any) => {
        this.users = data;
        this.sortUsers();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Errore caricamento utenti:', err);
        this.isLoading = false;
      }
    });
  }


 private sortUsers(): void {
    // Verifica se tutti gli utenti hanno discipline_points pari a zero
    const allZeroPoints = this.users.every(user => user.discipline_points === 0);

    if (!allZeroPoints) {
      // Ordina in base a discipline_points (decrescente)
      this.users.sort((a, b) => b.discipline_points - a.discipline_points);

      // Assegna le posizioni considerando i pareggi e punti > 0
      let currentPosition = 1; // Posizione attuale (1°, 2°, 3°)
      let currentPoints = this.users[0].discipline_points; // Punti del gruppo corrente
      let groupCount = 0; // Conta i gruppi di posizioni assegnati (max 3)

      this.users = this.users.map((user) => {
        // Se l'utente ha 0 punti, non assegnare posizione
        if (user.discipline_points === 0) {
          return { ...user, position: undefined };
        }

        // Se i punti sono diversi dal gruppo precedente e non abbiamo superato il terzo gruppo
        if (user.discipline_points < currentPoints && groupCount < 3) {
          currentPosition++; // Incrementa la posizione per il nuovo gruppo
          currentPoints = user.discipline_points; // Aggiorna i punti del gruppo
          groupCount++; // Incrementa il conteggio dei gruppi
        }

        // Assegna la posizione solo se non abbiamo superato il terzo gruppo e i punti sono > 0
        return {
          ...user,
          position: groupCount < 3 && user.discipline_points > 0 ? currentPosition : undefined
        };
      });
    } else {
      // Se tutti hanno zero punti, non assegnare posizioni
      this.users = this.users.map(user => ({
        ...user,
        position: undefined // Nessuna posizione
      }));
    }
  }
}