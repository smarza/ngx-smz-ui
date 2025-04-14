import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GlobalInjector } from '../../../../common/services/global-injector';
import { SmzDialogsService } from '../../../smz-dialogs/services/smz-dialogs.service';
import { SmzDialogBuilder } from '../../../../builders/smz-dialogs/dialog-builder';
import { DiagnosticsService } from '../../../rbk-utils/error-handler/diagnostic.service';
import { ActivatedRoute } from '@angular/router';
import { routerParamsListener } from '../../../smz-router-params/router-params-listener';
import { Navigate } from '@ngxs/router-plugin';
import { SmzTextPattern } from '../../../smz-forms/public-api';
import { DiagnosticsData } from '../../../rbk-utils/error-handler/diagnostics-data';

@Component({
    selector: 'smz-ui-diagnostics-data-collect',
    template: ``,
    host: {
        'class': 'absolute inset-0 bg-black'
    },
    standalone: false
})
export class DiagnosticsDataCollectComponent implements OnInit {
  public uiConfig = GlobalInjector.config;
  constructor(public route: ActivatedRoute, private store: Store, private diagnosticsService: DiagnosticsService) {
    routerParamsListener('smz-ui-diagnostics-data-collect', route, (data: { exceptionMessage: string, stackTrace: string, messages: string[] }) => {

      window.history.pushState('', '', '');

      if (data != null)
      {
        const diagnosticsService = GlobalInjector.instance.get(DiagnosticsService);

        const diagnosticData = diagnosticsService.generateDiagnosticsData();

        diagnosticData.exceptionMessage = data.exceptionMessage;
        diagnosticData.stackTrace = data.stackTrace;

        setTimeout(() => {
          this.showFormDialog(diagnosticData, data.messages);
        }, 0);
      }
      else {
        setTimeout(() => {
          // this.showNoDataDialog();
          const config = GlobalInjector.config;
          this.store.dispatch(new Navigate([ config.rbkUtils.authentication.nonAuthenticatedRoot ]));
        }, 0);
      }

    })
  }

  public ngOnInit(): void {
  }

  public showNoDataDialog(): void {
    const dialogs = GlobalInjector.instance.get(SmzDialogsService);

    dialogs.open(new SmzDialogBuilder()
      .setTitle('Aviso')
      .message([
        'Nenhuma mensagem localizada.'
      ])
      .buttons()
        .cancel().hide().buttons
        .confirm('Ok')
          .callback(() => {
            const config = GlobalInjector.config;
            this.store.dispatch(new Navigate([ config.rbkUtils.authentication.nonAuthenticatedRoot ]));
          })
          .buttons
        .close().hide().buttons
        .dialog
      .build());
  }

  public showFormDialog(diagnosticsData: DiagnosticsData, messages: string[]): void {
    const dialogs = GlobalInjector.instance.get(SmzDialogsService);

    dialogs.open(new SmzDialogBuilder<{ username: string }>()
      .setTitle('Aviso importante')
      .message(messages)
      .if(diagnosticsData.username == null)
        .form()
          .group()
            .text('username', 'Informe seu usuário', '')
                .setSaveFormat(SmzTextPattern.LOWERCASE)
                .validators().required().input
                .group
            .form
          .dialog
      .endIf
      .buttons()
        .cancel().hide().buttons
        .confirm().hide().buttons
        .close().hide().buttons
        .custom('Ok')
          .dependsOnValidation()
          .closeDialog()
          .callback((payload) => {
            diagnosticsData.username = payload.username;

            this.diagnosticsService.log(diagnosticsData);

            setTimeout(() => {
              this.showMessageDialog();
            }, 200);
          })
          .buttons
        .dialog
      .build());
  }

  public showMessageDialog(): void {
    const dialogs = GlobalInjector.instance.get(SmzDialogsService);

    dialogs.open(new SmzDialogBuilder()
      .setTitle('Diagnóstico enviado com sucesso')
      .message([
        'Sua mensagem de inconsistência foi encaminhada com sucesso',
        '',
        'Caso o problema persista, entre em contato com o administrador do seu sistema para maiores informações.'
      ])
      .buttons()
        .cancel().hide().buttons
        .confirm().hide().buttons
        .close().hide().buttons
        .dialog
      .build());
  }

}
