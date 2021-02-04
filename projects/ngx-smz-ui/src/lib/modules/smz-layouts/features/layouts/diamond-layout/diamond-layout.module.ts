import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule as PrimeSharedModule } from 'primeng/api';
import { DiamondLayoutComponent } from './diamond-layout.component';
import { OutletModule } from '../../outlet/outlet.module';
import { SmzDiamontTopbarModule } from './topbar/topbar.module';
import { SmzDiamontSidebarModule } from './sidebar/sidebar.module';
import { SmzDiamontFooterModule } from './footer/footer.module';

@NgModule({
  declarations: [DiamondLayoutComponent],
  imports: [
    CommonModule,
    PrimeSharedModule,
    MenubarModule,
    OutletModule,
    SmzDiamontTopbarModule,
    SmzDiamontSidebarModule,
    SmzDiamontFooterModule
  ],
  exports: [DiamondLayoutComponent]
})
export class DiamondLayoutModule { }
