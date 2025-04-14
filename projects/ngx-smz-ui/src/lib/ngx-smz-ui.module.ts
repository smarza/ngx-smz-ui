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
import { SmzDialogBuilder, SmzDialogsService } from '../public-api';

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

    try {
      localStorage.length;
    } catch (error) {

      if (GlobalInjector.config.rbkUtils.diagnostics?.url == null) {

        const dialogs = GlobalInjector.instance.get(SmzDialogsService);

        dialogs.open(new SmzDialogBuilder()
          .setTitle('Aviso importante')
          .message([
            'Certifique-se de que seu navegador está permitindo as atividades de cookies para este site.',
            '',
            'Acesse as configurações de <strong>Privacidade e Segurança</strong> > <strong>Cookies e outros dados do site</strong>, e habilite a permissão dos cookies.'
          ])
          .buttons()
            .cancel().hide().buttons
            .confirm().hide().buttons
            .close().hide().buttons
            .dialog
          .build());
      }

    }

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
