import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'primeng/api';
import { NewAthenaLayoutComponent } from './layout.component';
import { OutletModule } from '../../features/outlet/outlet.module';
import { SmzAthenaTopbarModule } from './components/topbar/topbar.module';
import { SmzAthenaFooterModule } from './components/footer/footer.module';
import { NgxsModule } from '@ngxs/store';
import { UiAthenaState } from './state/ui-layout.state';
import { AthenaAssistanceModule } from './components/assistance/assistance.module';
import { NewAthenaLayout } from './layout.config';
import { mergeClone } from '../../../../common/utils/deep-merge';
import { defaultAthenaConfig } from './default.config';
import { SmzAthenaHorizontalMenuModule } from './components/horizontal-menu/horizontal-menu.module';

export const ngxsModuleForFeatureUiNewAthenaLayoutState = NgxsModule.forFeature([UiAthenaState]);

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
    ngxsModuleForFeatureUiNewAthenaLayoutState
  ],
  exports: [
    NewAthenaLayoutComponent,
    SharedModule
  ]
})
export class NewAthenaLayoutModule
{
  public static forRoot(configuration: NewAthenaLayout): ModuleWithProviders<NewAthenaLayoutModule>
  {
      return {
          ngModule: NewAthenaLayoutModule,
          providers: [
              {
                  provide: NewAthenaLayout,
                  useValue: mergeClone(defaultAthenaConfig, configuration)
              }
          ]
      };
  }
}

