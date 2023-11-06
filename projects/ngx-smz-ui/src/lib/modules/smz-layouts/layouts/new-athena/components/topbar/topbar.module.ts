import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NewAthenaTopbarComponent } from './topbar.component';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';
import { AthenaTopbarActionsModule } from '../topbar-actions/topbar-actions.module';
import { SharedModule } from 'primeng/api';
import { SmzResponsiveComponent } from '../../../../../smz-responsive/smz-responsive.component';

@NgModule({
  declarations: [NewAthenaTopbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    AthenaTopbarActionsModule,
    SharedModule,
    SmzResponsiveComponent
  ],
  exports: [NewAthenaTopbarComponent]
})
export class SmzAthenaTopbarModule { }
