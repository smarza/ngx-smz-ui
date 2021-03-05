import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule as PrimeSharedModule } from 'primeng/api';
import { HephaestusLayoutComponent } from './layout.component';
import { OutletModule } from '../../features/outlet/outlet.module';
import { SmzDiamontTopbarModule } from './components/topbar/topbar.module';
import { SmzDiamontSidebarModule } from './components/sidebar/sidebar.module';
import { SmzDiamontFooterModule } from './components/footer/footer.module';
import { NgxsModule } from '@ngxs/store';
import { UiHephaestusState } from './state/ui-layout.state';
import { HephaestusAssistanceModule } from './components/assistance/assistance.module';
import { HephaestusLayout } from './layout.config';
import { defaultHephaestusConfig } from './default.config';
import { mergeClone } from '../../../../common/utils/deep-merge';

export const ngxsModuleForFeatureUiHephaestusLayoutState = NgxsModule.forFeature([UiHephaestusState]);

@NgModule({
  declarations: [HephaestusLayoutComponent],
  imports: [
    CommonModule,
    PrimeSharedModule,
    MenubarModule,
    OutletModule,
    SmzDiamontTopbarModule,
    SmzDiamontSidebarModule,
    SmzDiamontFooterModule,
    HephaestusAssistanceModule,
    ngxsModuleForFeatureUiHephaestusLayoutState
  ],
  exports: [
    HephaestusLayoutComponent,
    PrimeSharedModule
  ]
})
export class HephaestusLayoutModule
{
  public static forRoot(configuration: HephaestusLayout): ModuleWithProviders<HephaestusLayoutModule>
  {
      return {
          ngModule: HephaestusLayoutModule,
          providers: [
              {
                  provide: HephaestusLayout,
                  useValue: mergeClone(defaultHephaestusConfig, configuration)
              }
          ]
      };
  }
}
