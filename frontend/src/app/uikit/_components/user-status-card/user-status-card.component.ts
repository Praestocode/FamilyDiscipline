import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../interfaces/user';
import { Status } from '../../../interfaces/status';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-user-status-card',
  templateUrl: './user-status-card.component.html',
  styleUrls: ['./user-status-card.component.scss']
})
export class UserStatusCardComponent implements OnInit {
  @Input() user!: User;
  @Input() statuses: Status[] = [];
  famcoin = environment.famcoin; // Variabile per icona Famcoin

  ngOnInit(): void {
    if(environment.consolelog)(console.log(this.user.name));
    if(environment.consolelog)(console.log(this.user.status_id));
    if(environment.consolelog)(console.log(this.user.user_status));
  }
  
  getNextStatus(): Status | null {
    const currentStatus = this.statuses.find(s => s.id === this.user.status_id);
    if (!currentStatus) return null;
    const nextStatus = this.statuses.find(s => s.points_required > currentStatus.points_required);
    return nextStatus || null;
  }

  getProgressPercentage(): number {
    const nextStatus = this.getNextStatus();
    if (!nextStatus) return 100; // Max status raggiunto
    const currentStatus = this.statuses.find(s => s.id === this.user.status_id)!;
    const pointsToNext = nextStatus.points_required - currentStatus.points_required;
    const pointsProgress = this.user.discipline_points - currentStatus.points_required;
    return Math.min((pointsProgress / pointsToNext) * 100, 100);
  }

  getPointsToNext(): number {
    const nextStatus = this.getNextStatus();
    if (!nextStatus) return 0;
    return nextStatus.points_required - this.user.discipline_points;
  }
}