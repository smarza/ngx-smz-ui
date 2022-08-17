import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HephaestusTopbarComponent } from './topbar.component';
import { SidebarModule } from 'primeng/sidebar';
import { HephaestusProfileMenuModule } from '../profile-menu/profile-menu.module';
import { HephaestusNotificationsModule } from '../notifications/notifications.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [HephaestusTopbarComponent],
  imports: [
    CommonModule,
    SidebarModule,
    HephaestusProfileMenuModule,
    HephaestusNotificationsModule,
    ButtonModule
  ],
  exports: [HephaestusTopbarComponent]
})
export class SmzDiamontTopbarModule { }
