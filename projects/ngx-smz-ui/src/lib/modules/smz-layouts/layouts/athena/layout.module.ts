import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule as PrimeSharedModule } from 'primeng/api';
import { AthenaLayoutComponent } from './layout.component';
import { OutletModule } from '../../features/outlet/outlet.module';
import { SmzAthenaTopbarModule } from './components/topbar/topbar.module';
import { SmzAthenaFooterModule } from './components/footer/footer.module';
import { NgxsModule } from '@ngxs/store';
import { UiAthenaState } from './state/ui-layout.state';
import { AthenaAssistanceModule } from './components/assistance/assistance.module';
import { AthenaLayout } from './layout.config';
import { mergeClone } from '../../../../common/utils/deep-merge';
import { defaultAthenaConfig } from './default.config';
import { SmzAthenaHorizontalMenuModule } from './components/horizontal-menu/horizontal-menu.module';

export const ngxsModuleForFeatureUiAthenaLayoutState = NgxsModule.forFeature([UiAthenaState]);

@NgModule({
  declarations: [AthenaLayoutComponent],
  imports: [
    CommonModule,
    PrimeSharedModule,
    MenubarModule,
    OutletModule,
    SmzAthenaTopbarModule,
    SmzAthenaFooterModule,
    AthenaAssistanceModule,
    SmzAthenaHorizontalMenuModule,
    ngxsModuleForFeatureUiAthenaLayoutState
  ],
  exports: [
    AthenaLayoutComponent,
    PrimeSharedModule
  ]
})
export class AthenaLayoutModule
{
  public static forRoot(configuration: AthenaLayout): ModuleWithProviders<AthenaLayoutModule>
  {
      return {
          ngModule: AthenaLayoutModule,
          providers: [
              {
                  provide: AthenaLayout,
                  useValue: mergeClone(defaultAthenaConfig, configuration)
              }
          ]
      };
  }
}

