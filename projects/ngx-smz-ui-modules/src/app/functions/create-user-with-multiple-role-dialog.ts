
import { CreateUserWithMultipleRoles } from '@models/create-user-with-multiple-roles';
import { Store } from '@ngxs/store';
import { UsersFtActions } from '@states/features/users/users.actions';
import { getFirst, GlobalInjector, RolesSelectors, SmzDialog, SmzDialogBuilder, SmzDialogsService, SmzFormsResponse, SmzFormViewdata } from 'ngx-smz-ui';
import { map, Observable } from 'rxjs';
import { UsersFtSelectors } from '@states/features/users/users.selectors';
import { ModelConstants } from '@models/model-constants';

export function showCreateUserWithMultipleRoleDialog(success?: () => void): void {

  const store = GlobalInjector.instance.get(Store);
  const dialogs = GlobalInjector.instance.get(SmzDialogsService);

  let roles = store.selectSnapshot(RolesSelectors.all);

  dialogs.open(new SmzDialogBuilder<CreateUserWithMultipleRoles>()
    .setTitle(`Criação de Usuário`)
    .setLayout('EXTRA_SMALL', 'col-12')
    .setLayout('SMALL', 'col-12')
    .setLayout('MEDIUM', 'col-10')
    .setLayout('LARGE', 'col-8')
    .setLayout('EXTRA_LARGE', 'col-6')
    .form()
      .group('Entre com os dados')
        .textButton('username', 'Chave', '',
          (response: SmzFormsResponse<any>, utils: SmzFormViewdata): Observable<{ isValid: boolean, messages?: string[] }> => {

            return store.dispatch(new UsersFtActions.LoadCASingle(response.data.username))
              .pipe(map(() => {
                const user = store.selectSnapshot(UsersFtSelectors.currentCAUser);

                if (user == null) {
                  utils.updateInputValue('name', '');
                  utils.updateInputValue('email', '');
                  utils.updateInputValue('sector', '');
                  utils.updateInputValue('identifier', '');
                  utils.updateInputValue('isContracted', null);

                  const errors = store.selectSnapshot(UsersFtSelectors.lastCARequestErrors);

                  // retorna input como inválido
                  return { isValid: false, messages: errors};
                }

                utils.updateInputValue('name', user.name);
                utils.updateInputValue('email', user.email);
                utils.updateInputValue('sector', user.sector);
                utils.updateInputValue('identifier', user.identifier);
                utils.updateInputValue('isContracted', user.isContracted);

                // retorna input como válido
                return { isValid: true };
              }));

          })
          .useLabel('Buscar')
          .validators()
            .length(ModelConstants.petrobrasKey.minLength, ModelConstants.petrobrasKey.maxLength)
            .required()
          .group
        .multiselect('role', 'Perfil', roles, [getFirst(roles)?.name])
          .setLayout('EXTRA_SMALL', 'col-12')
          .validators()
            .required()
          .group
        .form
      .group('Preenchimento automático')
        .text('name', 'Nome')
          .disable()
          .group
        .text('email', 'Email')
          .disable()
          .group
        .text('sector', 'Gerência')
          .disable()
          .group

        // OCULTOS
        .text('identifier', 'Identificador')
          .disable()
          .hide()
          .group
        .switch('isContracted', 'IsContracted')
          .disable()
          .hide()
          .group

        .form
    .dialog
    .buttons()
      .cancel().buttons
      .confirm()
        .callback(data => store
          .dispatch(new UsersFtActions.CreateWithMultipleRoles(data))
          .subscribe(() => success != null ?? success()))
      .buttons
    .dialog
    .build()
  );

}