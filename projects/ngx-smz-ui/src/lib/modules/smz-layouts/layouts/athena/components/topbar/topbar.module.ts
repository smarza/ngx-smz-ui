import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AthenaTopbarComponent } from './topbar.component';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';
import { AthenaProfileMenuModule } from '../profile-menu/profile-menu.module';

@NgModule({
  declarations: [AthenaTopbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    AthenaProfileMenuModule
  ],
  exports: [AthenaTopbarComponent]
})
export class SmzAthenaTopbarModule { }
