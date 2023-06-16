import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { UiHephaestusState } from './state/ui-layout.state';
import { HephaestusLayout } from './layout.config';
import { defaultHephaestusConfig } from './default.config';
import { mergeClone } from '../../../../common/utils/deep-merge';
export const ngxsModuleForFeatureUiHephaestusLayoutState = NgxsModule.forFeature([UiHephaestusState]);

@NgModule({
  imports: [
    CommonModule,
    ngxsModuleForFeatureUiHephaestusLayoutState,
  ],
  exports: [
  ]
})
export class HephaestusProviderModule
{
  public static forRoot(configuration: HephaestusLayout): ModuleWithProviders<HephaestusProviderModule>
  {
      return {
          ngModule: HephaestusProviderModule,
          providers: [
              {
                  provide: HephaestusLayout,
                  useValue: mergeClone(defaultHephaestusConfig, configuration)
              }
          ]
      };
  }
}
