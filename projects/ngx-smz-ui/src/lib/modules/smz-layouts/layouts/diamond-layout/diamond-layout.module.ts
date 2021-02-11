import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule as PrimeSharedModule } from 'primeng/api';
import { DiamondLayoutComponent } from './diamond-layout.component';
import { OutletModule } from '../../features/outlet/outlet.module';
import { SmzDiamontTopbarModule } from './topbar/topbar.module';
import { SmzDiamontSidebarModule } from './sidebar/sidebar.module';
import { SmzDiamontFooterModule } from './footer/footer.module';
import { NgxsModule } from '@ngxs/store';
import { UiLayoutState } from './state/ui-layout/ui-layout.state';
import { AssistanceModule } from './assistance/assistance.module';

export const ngxsModuleForFeatureUiLayoutState = NgxsModule.forFeature([UiLayoutState]);

@NgModule({
  declarations: [DiamondLayoutComponent],
  imports: [
    CommonModule,
    PrimeSharedModule,
    MenubarModule,
    OutletModule,
    SmzDiamontTopbarModule,
    SmzDiamontSidebarModule,
    SmzDiamontFooterModule,
    AssistanceModule,
    ngxsModuleForFeatureUiLayoutState
  ],
  exports: [DiamondLayoutComponent]
})
export class DiamondLayoutModule { }
