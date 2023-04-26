import { SmzTableBuilder } from '../../../../../builders/smz-tables/state-builder';
import { AuthenticationSelectors } from '../../../../../state/global/authentication/authentication.selectors';
import { GlobalInjector } from '../../../../../common/services/global-injector';
import { SmzFilterType } from '../../../../smz-tables/models/filter-types';
import { nameof, SimpleNamedEntity } from '../../../../../common/models/simple-named-entity';
import { UserDetails } from '../../../models/user-details';
import { buildShowSetUserRoleDialog } from '../dialogs/show-set-user-role-dialog';
import { Store } from '@ngxs/store';
import { buildShowSetUserRolesDialog } from '../dialogs/show-set-user-roles-dialog';
import { showUpdateUserClaimsDialog } from '../dialogs/update-user-claims-dialog';
import { DeleteUser } from '../../../models/delete-user';
import { UsersActions } from '../../../state/users/users.actions';
import { DeativateUser } from '../../../models/deativate-user';

export function SmzAuthorizationUsersTableBuilder(): SmzTableBuilder {

const store = GlobalInjector.instance.get(Store);
const uiConfig = GlobalInjector.config;

const validationSelectors = GlobalInjector.config.rbkUtils.authorization.validationSelectors;
const hasUserRolesUpdateAccess: boolean = store.selectSnapshot(validationSelectors.hasClaimAccess(GlobalInjector.config.rbkUtils.authorization.users.manageUserRolesUpdateClaim));
const hasUserClaimsUpdateAccess: boolean = store.selectSnapshot(validationSelectors.hasClaimAccess(GlobalInjector.config.rbkUtils.authorization.users.manageUserClaimsUpdateClaim));

const roleColumnHeader = GlobalInjector.config.rbkUtils.authorization.allowMultipleRolesPerUser ? 'Perfis' : 'Perfil';

return new SmzTableBuilder()
  .setTitle(GlobalInjector.config.rbkUtils.authorization.users.title)
  .enableGlobalFilter()
  .setSize('small')
  .useStrippedStyle()
  .useTableEmptyMessage()
  .menu()
    .item(roleColumnHeader, 'fa-solid fa-user-tag')
      .setVisibilityRule(() => hasUserRolesUpdateAccess)
      .setCallback((event: UserDetails) => onSetRoles(event))
      .menu
    .item('Permissões', 'fa-solid fa-key')
      .setCallback((event: UserDetails) => showUpdateUserClaimsDialog(event))
      .setVisibilityRule(() => hasUserClaimsUpdateAccess)
      .menu
    .if(uiConfig.rbkUtils.authorization.users.removalBehavior === 'deactivation')
      .item('Desativar', 'fa-solid fa-lightbulb')
        .askForCriticalConfirmation('Atenção', 'Tem certeza de que deseja desativar esse usuário ?')
        .setCallback((event: UserDetails) => {
          const payload: DeativateUser = { username: event.username };
          store.dispatch(new UsersActions.Deactivate(payload));
        })
        .menu
      .endIf
    .if(uiConfig.rbkUtils.authorization.users.removalBehavior === 'deletion')
      .item('Excluir', 'fa-solid fa-trash')
        .askForCriticalConfirmation('Atenção', 'Tem certeza de que deseja excluir esse usuário ?')
        .setCallback((event: UserDetails) => {
          const payload: DeleteUser = { username: event.username };
          store.dispatch(new UsersActions.Delete(payload));
        })
        .menu
      .endIf
    .table
  .columns()
    .text(nameof<UserDetails>('username'), 'Usuário')
      .columns
    .custom(nameof<UserDetails>('displayName'), 'Nome')
      .enableSort()
      .forceGlobalFilter()
      .columns
    .text(nameof<UserDetails>('email'), 'Email')
      .columns
    .dataTransform('roles', roleColumnHeader, (roles: SimpleNamedEntity[]) => roles.map(x => x.name).join(', '))
      .setFilter(SmzFilterType.MULTI_SELECT_ARRAY)
      .columns
    .date(nameof<UserDetails>('lastLogin'), 'Último Acesso')
      .setDateFormat('medium')
      .columns
    .icon('isConfirmed', 'Confirmação')
      .addIconConfiguration('fa-solid fa-check text-green-500 text-lg', true, 'Usuário confimado')
      .addIconConfiguration('fa-regular fa-circle-xmark text-amber-500 text-lg', false, 'Usuário não confimado')
      .columns
  .table;
}

function onSetRoles(event: UserDetails): void {

  if (GlobalInjector.config.rbkUtils.authorization.allowMultipleRolesPerUser) {
    buildShowSetUserRolesDialog(event);
  }
  else {
    buildShowSetUserRoleDialog(event);
  }

}