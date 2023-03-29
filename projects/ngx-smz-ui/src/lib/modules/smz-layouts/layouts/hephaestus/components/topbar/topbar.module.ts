import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HephaestusTopbarComponent } from './topbar.component';
import { SidebarModule } from 'primeng/sidebar';
import { HephaestusProfileMenuModule } from '../profile-menu/profile-menu.module';
import { HephaestusNotificationsModule } from '../notifications/notifications.module';
import { ButtonModule } from 'primeng/button';
import { SmzTenantSwitchComponent } from '../../../../features/tenant-switch/tenant-switch.component';

@NgModule({
  declarations: [HephaestusTopbarComponent],
  imports: [
    CommonModule,
    SidebarModule,
    HephaestusProfileMenuModule,
    HephaestusNotificationsModule,
    ButtonModule,
    SmzTenantSwitchComponent
  ],
  exports: [HephaestusTopbarComponent]
})
export class SmzDiamontTopbarModule { }
