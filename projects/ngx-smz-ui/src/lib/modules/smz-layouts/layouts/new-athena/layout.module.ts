import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'primeng/api';
import { NewAthenaLayoutComponent } from './layout.component';
import { OutletModule } from '../../features/outlet/outlet.module';
import { SmzAthenaTopbarModule } from './components/topbar/topbar.module';
import { SmzAthenaFooterModule } from './components/footer/footer.module';
import { AthenaAssistanceModule } from './components/assistance/assistance.module';
import { SmzAthenaHorizontalMenuModule } from './components/horizontal-menu/horizontal-menu.module';
import { SmzTenantSwitchComponent } from '../../features/tenant-switch/tenant-switch.component';

@NgModule({
  declarations: [NewAthenaLayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    MenubarModule,
    OutletModule,
    SmzAthenaTopbarModule,
    SmzAthenaFooterModule,
    AthenaAssistanceModule,
    SmzAthenaHorizontalMenuModule,
    SmzTenantSwitchComponent
  ],
  exports: [
    NewAthenaLayoutComponent,
    SharedModule
  ]
})
export class NewAthenaLayoutModule { }