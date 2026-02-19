import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AthenaTopbarComponent } from './topbar.component';
import { DrawerModule } from 'primeng/drawer';
import { RouterModule } from '@angular/router';
import { AthenaTopbarActionsModule } from '../topbar-actions/topbar-actions.module';

@NgModule({
  declarations: [AthenaTopbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    DrawerModule,
    AthenaTopbarActionsModule
  ],
  exports: [AthenaTopbarComponent]
})
export class SmzAthenaTopbarModule { }
