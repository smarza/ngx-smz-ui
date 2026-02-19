import { showUserUpdateDialog } from '@pages/proteus/functions/show-user-update-dialog';
import { GlobalInjector, SmzTableBuilder, SmzFilterType, nameof, SimpleNamedEntity, UserDetails } from '@ngx-smz/core';

export function CustomUserTableBuilder(): SmzTableBuilder<UserDetails> {

  const roleColumnHeader = GlobalInjector.config.rbkUtils.authorization.allowMultipleRolesPerUser ? 'Perfis' : 'Perfil';

  return new SmzTableBuilder<UserDetails>()
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
        .setFilter(SmzFilterType.MULTI_SELECT_STRING)
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