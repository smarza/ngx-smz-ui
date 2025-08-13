
import { GlobalInjector } from '../../../../../common/services/global-injector';
import { RolesSelectors } from '../../../state/roles/roles.selectors';
import { SmzDialogsService } from '../../../../smz-dialogs/services/smz-dialogs.service';
import { SmzDialogBuilder } from '../../../../../builders/smz-dialogs/dialog-builder';
import { UsersActions } from '../../../state/users/users.actions';
import { ReplaceUserRoles } from '../../../models/replace-user-roles';
import { getFirst } from '../../../../../common/utils/utils';
import { UserDetails } from '../../../models/user-details';

export function buildShowSetUserRoleDialog(user: UserDetails, success?: () => void): void {

  const store = GlobalInjector.store;
  const dialogs = GlobalInjector.instance.get(SmzDialogsService);
  const roles = store.selectSnapshot(RolesSelectors.all);

  dialogs.open(new SmzDialogBuilder<ReplaceUserRoles>()
    .setTitle('Edição de Perfil')
    .setLayout('EXTRA_LARGE', 'col-4')
    .setLayout('MEDIUM', 'col-6')
    .setLayout('EXTRA_SMALL', 'col-12')
    .postProcessResponse(data => ({ ...data, roleIds: [data['roleId']] }))
    .form()
      .group()
        .text('id', '', user.id).hide().group
        .text('name', 'Nome', user.displayName)
          .disable()
          .group
        .text('username', 'Usuário', user.username)
          .disable()
          .group
        .dropdown('role', 'Perfil', roles, getFirst(user.roles)?.id)
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