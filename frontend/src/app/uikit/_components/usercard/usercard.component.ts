import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.scss']
})
export class UsercardComponent {
  @Input() user: { name: string, status_id:number, status_name: string, status_icon: string, discipline_points: number, profile_picture?: string, position?: number } | null = null;
  @Input() isLoading: boolean = false;
  famcoin = environment.famcoin; // Variabile per icona Famcoin
}