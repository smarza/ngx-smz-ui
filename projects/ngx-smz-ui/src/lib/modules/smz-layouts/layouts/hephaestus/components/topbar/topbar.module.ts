import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HephaestusTopbarComponent } from './topbar.component';
import { DrawerModule } from 'primeng/drawer';
import { HephaestusProfileMenuModule } from '../profile-menu/profile-menu.module';
import { HephaestusNotificationsModule } from '../notifications/notifications.module';
import { ButtonModule } from 'primeng/button';
import { SmzTenantSwitchComponent } from '../../../../features/tenant-switch/tenant-switch.component';
import { SmzLocalizationSwitchComponent } from '../../../../features/localization-switch/localization-switch.component';

@NgModule({
  declarations: [HephaestusTopbarComponent],
  imports: [
    CommonModule,
    DrawerModule,
    HephaestusProfileMenuModule,
    HephaestusNotificationsModule,
    ButtonModule,
    SmzTenantSwitchComponent,
    SmzLocalizationSwitchComponent
  ],
  exports: [HephaestusTopbarComponent]
})
export class SmzDiamontTopbarModule { }
