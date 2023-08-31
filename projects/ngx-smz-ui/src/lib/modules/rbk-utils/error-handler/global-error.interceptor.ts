import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { DiagnosticsService } from './diagnostic.service';
import { Store } from '@ngxs/store';
import { GlobalInjector } from '../../../common/services/global-injector';
import { Navigate } from '@ngxs/router-plugin';
import { AuthenticationSelectors } from '../../../state/global/authentication/authentication.selectors';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {
  }
  public handleError(error): void {
    const config = GlobalInjector.config;

    const isDiagnosticsEnabled = config.rbkUtils.diagnostics.url != null;

    if (error.status != null) {
      // Erro do HttpError

      if (isDiagnosticsEnabled && error.status != 400) {
        this.submitDiagnostic(error);
      }

    }
    else {
      // Erro de Javascript
      if (isDiagnosticsEnabled) {

        const handleJsErrorWithRedirect = config.rbkUtils.errorsConfig.handleJsErrorWithRedirect;
        if (handleJsErrorWithRedirect) {
          this.handleJavascriptError(error);
        }
        else {
          this.submitDiagnostic(error);
        }
      }

    }

    console.error('Error caught by Global Error Interceptor: ', error);
  }

  private handleJavascriptError(error): void {
    const messages = [];

    const message: string = error.message ? error.message : error.toString();

    if (message.includes(`'localStorage' property from 'Window'`)) {
      messages.push(...[
        'Certifique-se de que seu navegador está permitindo as atividades de cookies para este site.',
        '',
        'Acesse as configurações de <strong>Privacidade e Segurança</strong> > <strong>Cookies e outros dados do site</strong>, e habilite a permissão dos cookies.',
        ''
      ]);
    }

    const store = GlobalInjector.instance.get(Store);
    const username = store.selectSnapshot(AuthenticationSelectors.username);

    if (username == null) {

      messages.push(...['Seu usuário ainda não está logado.', '<br>']);

      setTimeout(() => {
        store.dispatch(new Navigate(['diagnostics-data-collect', { exceptionMessage: message, stackTrace: error.stack, messages }]));
      }, 0);
    }
    else {

      const config = GlobalInjector.config;

      store.dispatch(new Navigate([config.rbkUtils.errorsConfig.page.route]));
      this.submitDiagnostic(error);
    }
  }

  private submitDiagnostic(error): void {
    const diagnosticsService = GlobalInjector.instance.get(DiagnosticsService);
    const diagnosticData = diagnosticsService.generateDiagnosticsData();

    const message: string = error.message ? error.message : error.toString();

    diagnosticData.exceptionMessage = message;
    diagnosticData.stackTrace = error.stack;

    console.warn(diagnosticData);

    diagnosticsService.log(diagnosticData);
  }
}