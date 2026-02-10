import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NewAthenaTopbarComponent } from './topbar.component';
import { DrawerModule } from 'primeng/drawer';
import { RouterModule } from '@angular/router';
import { AthenaTopbarActionsModule } from '../topbar-actions/topbar-actions.module';
import { SharedModule } from 'primeng/api';
import { SmzResponsiveComponent } from '../../../../../smz-responsive/smz-responsive.component';

@NgModule({
  declarations: [NewAthenaTopbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    DrawerModule,
    AthenaTopbarActionsModule,
    SharedModule,
    SmzResponsiveComponent
  ],
  exports: [NewAthenaTopbarComponent]
})
export class SmzAthenaTopbarModule { }
