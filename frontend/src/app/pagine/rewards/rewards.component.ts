import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { Status } from '../../interfaces/status';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent implements OnInit {
  user: User | null = null;
  statuses: Status[] = [];
  isLoading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Carica utente
    this.http.get<User & { status: string }>('http://localhost:8000/api/user').subscribe({ //this.http.get<User>('http://localhost:8000/api/user').subscribe({
      next: (data) => {
        this.user = {
          name: data.name,
          status_id: data.status_id,
          user_status: data.status,
          status_icon: data.status_icon,
          discipline_points: data.discipline_points,
          profile_picture: data.profile_picture,
          int_tasks: data.int_tasks,
          int_weight: data.int_weight,
          int_smoke: data.int_smoke,
        };
        // Carica status
        this.http.get<Status[]>('http://localhost:8000/api/statuses').subscribe({
          next: (statuses) => {
            this.statuses = statuses.sort((a, b) => a.points_required - b.points_required);
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Errore caricamento status:', err);
            this.isLoading = false;
          }
        });
      },
      error: (err) => {
        console.error('Errore caricamento utente:', err);
        this.isLoading = false;
      }
    });
  }
}