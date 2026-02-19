
import { Store } from '@ngxs/store';
import { GlobalInjector } from '../../../../../common/services/global-injector';
import { SmzDialogsService } from '../../../../smz-dialogs/services/smz-dialogs.service';
import { UserDetails } from '../../../models/user-details';
import { RolesSelectors } from '../../../state/roles/roles.selectors';
import { SmzDialogBuilder } from '../../../../../builders/smz-dialogs/dialog-builder';
import { ReplaceUserRoles } from '../../../models/replace-user-roles';
import { UsersActions } from '../../../state/users/users.actions';

export function buildShowSetUserRolesDialog(user: UserDetails, success?: () => void): void {

  const store: Store = GlobalInjector.instance.get(Store);
  const dialogs = GlobalInjector.instance.get(SmzDialogsService);
  const roles = store.selectSnapshot(RolesSelectors.all);

  dialogs.open(new SmzDialogBuilder<ReplaceUserRoles>()
    .setTitle('Edição de Perfis')
    .setLayout('EXTRA_LARGE', 'col-4')
    .setLayout('MEDIUM', 'col-6')
    .setLayout('EXTRA_SMALL', 'col-12')
    .form()
      .group()
        .text('id', '', user.id).hide().group
        .text('name', 'Nome', user.displayName)
          .disable()
          .group
        .text('username', 'Usuário', user.username)
          .disable()
          .group
        .multiselect('role', 'Perfil', roles, user.roles.map(x => x.id))
          .setLayout('EXTRA_SMALL', 'col-12')
          .validators().required().input
          .group
        .form
      .dialog
    .buttons()
      .cancel().buttons
      .confirm()
        .callback(data => store
          .dispatch(new UsersActions.ReplaceUserRoles(data))
          .subscribe(() => {
            if (success != null) {
              success()
            }
          }))
        .buttons
      .dialog
    .build()
  );

}