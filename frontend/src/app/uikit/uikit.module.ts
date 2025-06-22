import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { ButtonlogoutComponent } from './_components/buttonlogout/buttonlogout.component';
import { UsercardComponent } from './_components/usercard/usercard.component';
import { UserprofilecardComponent } from './_components/userprofilecard/userprofilecard.component';
import { UserStatusCardComponent } from './_components/user-status-card/user-status-card.component';
import { StatusCardComponent } from './_components/status-card/status-card.component';
import { ThemetoggleComponent } from './_components/themetoggle/themetoggle.component';
import { TrackingCardSmokeComponent } from './_components/tracking-card-smoke/tracking-card-smoke.component';
import { TrackingCardWeightComponent } from './_components/tracking-card-weight/tracking-card-weight.component';
import { TrackingCardTasksComponent } from './_components/tracking-card-tasks/tracking-card-tasks.component';
import { InfocardComponent } from './_components/infocard/infocard.component';
import { UsercardpathComponent } from './_components/usercardpath/usercardpath.component';
import { TruncatePipe } from '../pipes/truncate.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    ButtonlogoutComponent,
    UsercardComponent,
    UserprofilecardComponent,
    UserStatusCardComponent,
    StatusCardComponent,
    ThemetoggleComponent,
    TrackingCardSmokeComponent,
    TrackingCardWeightComponent,
    TrackingCardTasksComponent,
    InfocardComponent,
    UsercardpathComponent,
    TruncatePipe,
  ],
  exports: [
    NavbarComponent,
    ButtonlogoutComponent,
    UsercardComponent,
    UserprofilecardComponent,
    UserStatusCardComponent,
    StatusCardComponent,
    ThemetoggleComponent,
    TrackingCardSmokeComponent,
    TrackingCardWeightComponent,
    TrackingCardTasksComponent,
    InfocardComponent,
    UsercardpathComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UikitModule {}