import { GlobalInjector, SmzTableBuilder, SmzFilterType, nameof, SimpleNamedEntity, UserDetails } from 'ngx-smz-ui';

export function CustomUserTableBuilder(): SmzTableBuilder {

  const roleColumnHeader = GlobalInjector.config.rbkUtils.authorization.allowMultipleRolesPerUser ? 'Perfis' : 'Perfil';

  return new SmzTableBuilder()
    .setTitle(GlobalInjector.config.rbkUtils.authorization.users.title)
    .enableGlobalFilter()
    .setSize('small')
    .useStrippedStyle()
    .menu()
      .item('Desativar', 'fas fa-key')
        .setCallback((event: UserDetails) => { console.log('Desativar'); })
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