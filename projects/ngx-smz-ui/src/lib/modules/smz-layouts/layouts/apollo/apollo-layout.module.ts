import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule as PrimeSharedModule } from 'primeng/api';
import { ApolloLayoutComponent } from './apollo-layout.component';
import { OutletModule } from '../../features/outlet/outlet.module';
import { SmzApolloTopbarModule } from './components/topbar/topbar.module';
import { SmzApolloSidebarModule } from './components/sidebar/sidebar.module';
import { SmzApolloFooterModule } from './components/footer/footer.module';
import { NgxsModule } from '@ngxs/store';
import { UiApolloState } from './state/ui-apollo/ui-apollo.state';
import { ApolloAssistanceModule } from './components/assistance/assistance.module';
import { ApolloLayout } from './layout.config';
import { mergeClone } from '../../../../../lib/common/utils/deep-merge';
import { defaultApolloConfig } from './default.config';

export const ngxsModuleForFeatureUiApolloLayoutState = NgxsModule.forFeature([UiApolloState]);

@NgModule({
  declarations: [ApolloLayoutComponent],
  imports: [
    CommonModule,
    PrimeSharedModule,
    MenubarModule,
    OutletModule,
    SmzApolloTopbarModule,
    SmzApolloSidebarModule,
    SmzApolloFooterModule,
    ApolloAssistanceModule,
    ngxsModuleForFeatureUiApolloLayoutState
  ],
  exports: [ApolloLayoutComponent]
})
export class ApolloLayoutModule
{
  public static forRoot(configuration: ApolloLayout): ModuleWithProviders<ApolloLayoutModule>
  {
      return {
          ngModule: ApolloLayoutModule,
          providers: [
              {
                  provide: ApolloLayout,
                  useValue: mergeClone(defaultApolloConfig, configuration)
              }
          ]
      };
  }
}

