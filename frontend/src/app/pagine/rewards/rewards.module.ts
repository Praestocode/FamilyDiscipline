import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardsRoutingModule } from './rewards-routing.module';
import { RewardsComponent } from './rewards.component';
import { UikitModule } from '../../uikit/uikit.module';


@NgModule({
  declarations: [
    RewardsComponent
  ],
  imports: [
    CommonModule,
    RewardsRoutingModule,
    UikitModule
  ]
})
export class RewardsModule { }
