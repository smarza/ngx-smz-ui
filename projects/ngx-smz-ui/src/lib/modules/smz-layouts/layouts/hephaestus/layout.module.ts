import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'primeng/api';
import { HephaestusLayoutComponent } from './layout.component';
import { OutletModule } from '../../features/outlet/outlet.module';
import { SmzDiamontTopbarModule } from './components/topbar/topbar.module';
import { SmzDiamontSidebarModule } from './components/sidebar/sidebar.module';
import { SmzDiamontFooterModule } from './components/footer/footer.module';
import { HephaestusAssistanceModule } from './components/assistance/assistance.module';
import { SmzTenantSwitchComponent } from '../../features/tenant-switch/tenant-switch.component';

@NgModule({
  declarations: [HephaestusLayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    MenubarModule,
    OutletModule,
    SmzDiamontTopbarModule,
    SmzDiamontSidebarModule,
    SmzDiamontFooterModule,
    HephaestusAssistanceModule,
    SmzTenantSwitchComponent
  ],
  exports: [
    HephaestusLayoutComponent,
    SharedModule
  ]
})
export class HephaestusLayoutModule { }