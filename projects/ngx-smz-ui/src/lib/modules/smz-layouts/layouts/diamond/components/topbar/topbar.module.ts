import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DiamondTopbarComponent } from './topbar.component';
import { SidebarModule } from 'primeng/sidebar';
import { DiamondProfileMenuModule } from '../profile-menu/profile-menu.module';
import { DiamondNotificationsModule } from '../notifications/notifications.module';

@NgModule({
  declarations: [DiamondTopbarComponent],
  imports: [
    CommonModule,
    SidebarModule,
    DiamondProfileMenuModule,
    DiamondNotificationsModule,
  ],
  exports: [DiamondTopbarComponent]
})
export class SmzDiamontTopbarModule { }
