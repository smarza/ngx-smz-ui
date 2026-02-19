import { Store } from '@ngxs/store';
import { GlobalInjector, RolesSelectors, SmzDialogBuilder, SmzFormsResponse, UsersActions, SmzDialogsService, nameof, CreateUser } from '@ngx-smz/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ProteusLoginMetadataComponent } from '../components/proteus-login-metadata.component';
import { CreateUserMetadata } from '../models/create-user-metadata';
import { ModelConstants } from '../models/model-constants';
import { ProteusActions } from '../state/proteus.actions';
import { ProteusSelectors } from '../state/proteus.selector';

export interface BaseCreateUser {
  displayName: string;
  username: string;
  email: string;
  picture: string;
  password: string;
  passwordConfirmation: string;
  roleIds: string[];
}

export function showUserCreationDialog(): void {

  const store: Store = GlobalInjector.instance.get(Store);
  const dialogs: SmzDialogsService = GlobalInjector.instance.get(SmzDialogsService);

  const roles = store.selectSnapshot(RolesSelectors.all);
  store.dispatch(new ProteusActions.ClearCaEmployee());

  dialogs.open(new SmzDialogBuilder<BaseCreateUser>()
  .setTitle('Criação de Usuário')
  .setLayout('SMALL', 'col-12')
  .setLayout('EXTRA_SMALL', 'col-12')
  .setLayout('MEDIUM', 'col-6')
  .setLayout('LARGE', 'col-6')
  .setLayout('EXTRA_LARGE', 'col-4')
  .form()
    .showMultipleErrorsMessages()
    .group('Entre com os dados')
    .textButton(nameof<BaseCreateUser>('username'), 'Chave', '',
      (response: SmzFormsResponse<BaseCreateUser>): Observable<{ isValid: boolean, messages?: string[] }> => (
        store.dispatch(new ProteusActions.GetCaEmployee({ petrobrasKey: response.data.username }))
        .pipe(
          map(() => {
            const caEmployee = store.selectSnapshot(ProteusSelectors.currentCAEmployee);

            if (caEmployee == null) {
              // retorna input como inválido
              return { isValid: false, messages: store.selectSnapshot(ProteusSelectors.lastCARequestErrors) };
            }

            // retorna input como válido
            return { isValid: true };
          }),
          catchError((error) => {
            const messages = error?.error?.errors?.join(', ');
            return of({ isValid: false, messages: [messages ?? 'Ocorreu um erro ao buscar os dados do usuário. Por favor, tente novamente.'] });
          })
        )

      ))
        .useLabel('Buscar')
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('EXTRA_LARGE', 'col-12')
        .validators()
          .length(ModelConstants.petrobrasKey.minLength, ModelConstants.petrobrasKey.maxLength)
          .required()
          .input
        .group
      .multiselect('role', 'Perfil', roles)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('EXTRA_LARGE', 'col-12')
        .validators()
          .required()
          .input
        .group
      .form

  .dialog

  // Component para mostrar o metadado
  .component(ProteusLoginMetadataComponent)
    .dialog

  .buttons()
    .cancel().buttons
    .confirm()
      .callback((data) => {
        const caEmployee = store.selectSnapshot(ProteusSelectors.currentCAEmployee);

        const payload: CreateUser<CreateUserMetadata> = {
          displayName: caEmployee.name,
          username: data.username,
          email: caEmployee.email,
          password: data.password,
          passwordConfirmation: data.password,
          roleIds: data.roleIds,
          picture: caEmployee.picture,
          metadata: {
            sector: caEmployee.sector,
            identifier: caEmployee.identifier,
            isContracted: caEmployee.isContracted.toString(),
          }
        };

        store.dispatch(new UsersActions.Create<CreateUserMetadata>(payload));
      })
    .buttons
  .dialog
  .build()
  );

}