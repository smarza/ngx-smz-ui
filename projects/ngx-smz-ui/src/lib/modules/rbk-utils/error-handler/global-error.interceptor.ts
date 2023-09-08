import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { DiagnosticsService } from './diagnostic.service';
import { Store } from '@ngxs/store';
import { GlobalInjector } from '../../../common/services/global-injector';
import { Navigate } from '@ngxs/router-plugin';
import { AuthenticationSelectors } from '../../../state/global/authentication/authentication.selectors';
import { Observable, Subject, Subscription, of, switchMap, throttleTime } from 'rxjs';
import { ToastActions } from '../../../state/global/application/application.actions.toast';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private logSubject = new Subject<any>();
  private logSubscription: Subscription;
  constructor() {
    const config = GlobalInjector.config;

    this.logSubscription = this.logSubject.pipe(
        throttleTime(config.rbkUtils.diagnostics.throttleTime),
        switchMap(data => this.actualHandleError(data))
    ).subscribe();
  }

  public handleError(error): void {
    this.logSubject.next(error);
  }

  public actualHandleError(error): Observable<void> {

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

        const javascriptErrorHandlingType = config.rbkUtils.errorsConfig.javascriptErrors?.errorHandlingType;

        if (javascriptErrorHandlingType != null && javascriptErrorHandlingType != 'none') {
          this.handleJavascriptError(error);
        }
        else {
          if (isDiagnosticsEnabled) { {
            this.submitDiagnostic(error);
          }
        }

      }

    }

    console.error('Error caught by Global Error Interceptor: ', error);

    return of();
  }

  private handleJavascriptError(error): void {
    const config = GlobalInjector.config;

    const isDiagnosticsEnabled = config.rbkUtils.diagnostics.url != null;
    const javascriptErrorHandlingType = config.rbkUtils.errorsConfig.javascriptErrors?.errorHandlingType;

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

      return;
    }

    if (isDiagnosticsEnabled) {
      this.submitDiagnostic(error);
    }

    switch (javascriptErrorHandlingType) {
      case 'redirect':

        if (username != null) {
          setTimeout(() => {
            store.dispatch(new Navigate([config.rbkUtils.errorsConfig.page.route]));
          }, 0);
        }

        break;

      case 'toast':
          store.dispatch(new ToastActions.Error('Caso o erro persista, entre em contato com o administrador do sistema.', 'Occorreu um erro.'));

        break;

      default:
        break;
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