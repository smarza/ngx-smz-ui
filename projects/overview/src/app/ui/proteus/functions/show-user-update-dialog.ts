import { Store } from '@ngxs/store';
import { GlobalInjector, SmzDialogBuilder, SmzDialogsService, UserDetails, showMessage } from '@ngx-smz/core';
import { ProteusLoginMetadataComponent } from '../components/proteus-login-metadata.component';
import { ProteusActions } from '../state/proteus.actions';
import { ProteusSelectors } from '../state/proteus.selector';
import { UpdateEmployee } from '../models/update-employee';

export function showUserUpdateDialog(user: UserDetails): void {

  const store: Store = GlobalInjector.instance.get(Store);
  const dialogs: SmzDialogsService = GlobalInjector.instance.get(SmzDialogsService);

  store.dispatch(new ProteusActions.ClearCaEmployee());

  store
    .dispatch(new ProteusActions.GetCaEmployee({ petrobrasKey: user.username }))
    .subscribe(() => {
      const caEmployee = store.selectSnapshot(ProteusSelectors.currentCAEmployee);

      if (caEmployee == null) {
        // ca inválido
        showMessage('Erro ao buscar dados do CA', store.selectSnapshot(ProteusSelectors.lastCARequestErrors).join(', '), () => {});
      }

      // ca válido
      dialogs.open(new SmzDialogBuilder()
        .setTitle('Atualizar Informações do Usuário')
        .setLayout('SMALL', 'col-12')
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('MEDIUM', 'col-6')
        .setLayout('LARGE', 'col-6')
        .setLayout('EXTRA_LARGE', 'col-4')

        // Mensagem de informação
        .message([
          'Os dados a seguir foram atualizados através do CA.',
          `Utilize o botão <strong>CONFIRMAR</strong> para salvar essas informações na conta do usuário <strong>${user.username}</strong>.`,
          '<br>'
        ])

        // Component para mostrar o metadado
        .component(ProteusLoginMetadataComponent)
          .dialog

        .buttons()
          .cancel().buttons
          .confirm()
            .callback(() => {

              const payload: UpdateEmployee = {
                username: user.username,
                displayName: caEmployee.name,
                email: caEmployee.email,
                picture: caEmployee.picture,
                metadata: {
                  sector: caEmployee.sector,
                  identifier: caEmployee.identifier,
                  isContracted: caEmployee.isContracted.toString(),
                }
              };

              store.dispatch(new ProteusActions.UpdateEmployee(payload));
            })
          .buttons
        .dialog
        .build()
      );

    });


}