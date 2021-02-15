import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule as PrimeSharedModule } from 'primeng/api';
import { DiamondLayoutComponent } from './diamond-layout.component';
import { OutletModule } from '../../features/outlet/outlet.module';
import { SmzDiamontTopbarModule } from './components/topbar/topbar.module';
import { SmzDiamontSidebarModule } from './components/sidebar/sidebar.module';
import { SmzDiamontFooterModule } from './components/footer/footer.module';
import { NgxsModule } from '@ngxs/store';
import { UiDiamondState } from './state/ui-diamond/ui-diamond.state';
import { DiamondAssistanceModule } from './components/assistance/assistance.module';
import { DiamondLayout } from './layout.config';
import { defaultDiamondConfig } from './default.config';
import { mergeClone } from '../../../../../lib/common/utils/deep-merge';
import { DiamondProfileMenuModule } from './components/profile-menu/profile-menu.module';
import { DiamondNotificationsModule } from './components/notifications/notifications.module';

export const ngxsModuleForFeatureUiDiamondLayoutState = NgxsModule.forFeature([UiDiamondState]);

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
    DiamondAssistanceModule,
    ngxsModuleForFeatureUiDiamondLayoutState
  ],
  exports: [DiamondLayoutComponent]
})
export class DiamondLayoutModule
{
  public static forRoot(configuration: DiamondLayout): ModuleWithProviders<DiamondLayoutModule>
  {
      return {
          ngModule: DiamondLayoutModule,
          providers: [
              {
                  provide: DiamondLayout,
                  useValue: mergeClone(defaultDiamondConfig, configuration)
              }
          ]
      };
  }
}
