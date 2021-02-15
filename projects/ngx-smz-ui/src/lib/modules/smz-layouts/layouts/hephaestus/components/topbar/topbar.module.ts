import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HephaestusTopbarComponent } from './topbar.component';
import { SidebarModule } from 'primeng/sidebar';
import { HephaestusProfileMenuModule } from '../profile-menu/profile-menu.module';
import { HephaestusNotificationsModule } from '../notifications/notifications.module';

@NgModule({
  declarations: [HephaestusTopbarComponent],
  imports: [
    CommonModule,
    SidebarModule,
    HephaestusProfileMenuModule,
    HephaestusNotificationsModule,
  ],
  exports: [HephaestusTopbarComponent]
})
export class SmzDiamontTopbarModule { }
