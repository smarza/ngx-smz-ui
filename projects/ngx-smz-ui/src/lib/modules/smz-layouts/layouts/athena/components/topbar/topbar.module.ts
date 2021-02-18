import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AthenaTopbarComponent } from './topbar.component';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';
import { AthenaTopbarActionsModule } from '../topbar-actions/topbar-actions.module';

@NgModule({
  declarations: [AthenaTopbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    AthenaTopbarActionsModule
  ],
  exports: [AthenaTopbarComponent]
})
export class SmzAthenaTopbarModule { }
