import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { UiAthenaState } from './state/ui-layout.state';
import { NewAthenaLayout } from './layout.config';
import { defaultAthenaConfig } from './default.config';
import { mergeClone } from '../../../../common/utils/deep-merge';
export const ngxsModuleForFeatureUiNewAthenaLayoutState = NgxsModule.forFeature([UiAthenaState]);

@NgModule({
  imports: [
    CommonModule,
    ngxsModuleForFeatureUiNewAthenaLayoutState,
  ],
  exports: [
  ]
})
export class NewAthenaProviderModule
{
  public static forRoot(configuration: NewAthenaLayout): ModuleWithProviders<NewAthenaProviderModule>
  {
      return {
          ngModule: NewAthenaProviderModule,
          providers: [
              {
                  provide: NewAthenaLayout,
                  useValue: mergeClone(defaultAthenaConfig, configuration)
              }
          ]
      };
  }
}
