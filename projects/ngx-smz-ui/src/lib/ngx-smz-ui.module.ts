import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { Store } from '@ngxs/store';
import { GlobalInjector } from './common/services/global-injector';
import { runAccessRoutesInitialization, runRbkInitialization } from './modules/rbk-utils/ngx-rbk-utils-initialization';
import { NgxRbkUtilsModule } from './modules/rbk-utils/ngx-rbk-utils.module';
import { NgxSmzUiComponent } from './ngx-smz-ui.component';
import { SmzUiBuilder } from './builders/smz-ui/ui-builder';
import { Router } from '@angular/router';
import { NgxSmzDialogsModule } from './modules/smz-dialogs/smz-dialogs.module';
import { NgxSmzLayoutsModule } from './modules/smz-layouts/ngx-smz-layouts.module';

@NgModule({
  declarations: [NgxSmzUiComponent],
  imports: [
    NgxSmzDialogsModule.forRoot(),
    NgxRbkUtilsModule.forRoot(),
    NgxSmzLayoutsModule.forRoot(),
  ],
  exports: [
    NgxSmzUiComponent,
  ]
})
export class NgxSmzUiModule {
  constructor(injector: Injector, router: Router) {
    GlobalInjector.instance = injector;
    GlobalInjector.store = injector.get(Store);

    runAccessRoutesInitialization(router);
  }

  public static forRoot(builder: SmzUiBuilder): ModuleWithProviders<NgxSmzUiModule> {
    GlobalInjector.config = builder.build();

    runRbkInitialization();

    return {
      ngModule: NgxSmzUiModule,
      providers: [
      ]
    };
  }
}
