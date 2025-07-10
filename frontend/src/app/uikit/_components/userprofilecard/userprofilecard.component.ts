import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-userprofilecard',
  templateUrl: './userprofilecard.component.html',
  styleUrls: ['./userprofilecard.component.scss']
})
export class UserprofilecardComponent implements OnInit {
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

  famcoin = environment.famcoin; // Variabile per icona Famcoin

  ngOnInit() {
/*     setTimeout(() => {
      console.log('DA PROFIL CARD: ','user_status:', this.user?.user_status, 'status_id:', this.user?.status_id,'nome', this.user?.name, 'interesse 1', this.user?.int_tasks, 'interesse 2', this.user?.int_weight,'interesse 3', this.user?.int_smoke,);
    }, 2000); */
  }
}