import { GlobalInjector, SmzTableBuilder, SmzFilterType, nameof, SimpleNamedEntity } from 'ngx-smz-ui';

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
        .menu
      .table
    .columns()
      .custom(nameof<any>('displayName'), 'Nome')
        .enableSort()
        .forceGlobalFilter()
        .columns
      .text(nameof<any>('username'), 'Usuário')
        .addStyles('font-bold')
        .columns
      .text(nameof<any>('email'), 'Email')
        .columns
      .dataTransform(nameof<any>('roles'), roleColumnHeader, (roles: SimpleNamedEntity[]) => roles.map(x => x.name).join(', '))
        .setFilter(SmzFilterType.MULTI_SELECT_ARRAY)
        .columns
      .date(nameof<any>('lastLogin'), 'Último Acesso')
        .setDateFormat('medium')
        .columns
    .table;

}