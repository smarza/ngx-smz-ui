import { SmzTableBuilder } from '../../../../../builders/smz-tables/state-builder';
import { AuthenticationSelectors } from '../../../../../state/global/authentication/authentication.selectors';
import { GlobalInjector } from '../../../../../common/services/global-injector';
import { SmzFilterType } from '../../../../smz-tables/models/filter-types';
import { nameof, SimpleNamedEntity } from '../../../../../common/models/simple-named-entity';
import { UserDetails } from '../../../models/user-details';
import { buildShowSetUserRoleDialog } from '../dialogs/show-set-user-role-dialog';
import { Store } from '@ngxs/store';
import { buildShowSetUserRolesDialog } from '../dialogs/show-set-user-roles-dialog';

export function SmzAuthorizationUserTableBuilder(): SmzTableBuilder {

const store = GlobalInjector.instance.get(Store);

const hasUserRolesUpdateAccess: boolean = store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(GlobalInjector.config.rbkUtils.authorization.users.manageUserRolesUpdateClaim));
const hasUserClaimsUpdateAccess: boolean = store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(GlobalInjector.config.rbkUtils.authorization.users.manageUserClaimsUpdateClaim));

const roleColumnHeader = GlobalInjector.config.rbkUtils.authorization.allowMultipleRolesPerUser ? 'Perfis' : 'Perfil';

return new SmzTableBuilder()
  .setTitle(GlobalInjector.config.rbkUtils.authorization.users.title)
  .enableGlobalFilter()
  .setSize('small')
  .useStrippedStyle()
  .menu()
    .item(roleColumnHeader, 'fas fa-user-tag')
      .setVisibilityRule(() => hasUserRolesUpdateAccess)
      .setCallback((event: UserDetails) => onSetRoles(event))
      .menu
    .item('Permissões', 'fas fa-key')
      .setCallback((event: UserDetails) => onUpdateClaims(event))
      .setVisibilityRule(() => hasUserClaimsUpdateAccess)
      .menu
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

function onUpdateClaims(event: UserDetails): void {
  // dialogs.open(buildUpdateUserClaimsDialog(event, helpService));
}