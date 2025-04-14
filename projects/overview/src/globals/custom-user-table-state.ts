import { GlobalInjector, SmzTableBuilder, SmzFilterType, nameof, SimpleNamedEntity, UserDetails } from '@ngx-smz/core';
import { showUserUpdateDialog } from '../app/ui/proteus/functions/show-user-update-dialog';

export function CustomUserTableBuilder(): SmzTableBuilder<any> {

  const roleColumnHeader = GlobalInjector.config.rbkUtils.authorization.allowMultipleRolesPerUser ? 'Perfis' : 'Perfil';

  return new SmzTableBuilder<any>()
    .setTitle(GlobalInjector.config.rbkUtils.authorization.users.title)
    .enableGlobalFilter()
    .setSize('small')
    .useStrippedStyle()
    .useTableEmptyMessage()
    .menu()
      .item('Atualizar Dados', 'fa-solid fa-user-pen')
        .setCallback((item: UserDetails) => { showUserUpdateDialog(item); })
        .menu
      .table
    .columns()
      .custom(nameof<UserDetails>('displayName'), 'Nome')
        .enableSort()
        .forceGlobalFilter()
        .columns
      .text(nameof<UserDetails>('username'), 'Usuário')
        .addStyles('font-bold')
        .columns
      .text(nameof<UserDetails>('email'), 'Email')
        .columns
      .dataTransform('roles', roleColumnHeader, (roles: SimpleNamedEntity[]) => roles.map(x => x.name).join(', '))
        .setFilter(SmzFilterType.MULTI_SELECT_ARRAY)
        .columns
      .date(nameof<UserDetails>('lastLogin'), 'Último Acesso')
        .setDateFormat('medium')
        .columns
    .table;

}