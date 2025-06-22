import { Component, Input } from '@angular/core';
import { Status } from '../../../interfaces/status';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.scss']
})
export class StatusCardComponent {
  @Input() status!: Status;
  @Input() user!: User;

  getPointsMissing(): number {
    return Math.max(this.status.points_required - this.user.discipline_points, 0);
  }

  isAchieved(): boolean {
    return this.user.discipline_points >= this.status.points_required;
  }
}