import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UsersSelectors } from '../../../../state/users/users.selectors';
import { RoleBehavior } from '../../../../../rbk-utils/ngx-rbk-utils.config';
import { AuthenticationSelectors } from '../../../../../../state/global/authentication/authentication.selectors';
import { SmzTableBuilder } from '../../../../../../builders/smz-tables/state-builder';
import { SmzTableState } from '../../../../../smz-tables/models/table-state';
import { SmzFilterType } from '../../../../../smz-tables/models/filter-types';
import { SimpleNamedEntity } from '../../../../../../../lib/common/models/simple-named-entity';
import { Confirmable } from '../../../../../smz-dialogs/decorators/confirmable.decorator';
import { UserDetails } from '../../../../models/user-details';
import { GlobalInjector } from '../../../../../../common/services/global-injector';
import { buildShowSetUserRoleDialog } from '../../dialogs/show-set-user-role-dialog';

@Component({
  selector: 'gedi-ui-users-page',
  templateUrl: './users-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPageComponent {

  public items$: Observable<UserDetails[]>;
  public tableState: SmzTableState;
  public uiConfig = GlobalInjector.config;

  constructor(private store: Store) {

    this.items$ = this.store.select(UsersSelectors.users);

    const hasUserRolesUpdateAccess: boolean = this.store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(GlobalInjector.config.rbkUtils.authorization.users.manageUserRolesUpdateClaim));
    const hasUserClaimsUpdateAccess: boolean = this.store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(GlobalInjector.config.rbkUtils.authorization.users.manageUserClaimsUpdateClaim));

    const roleColumnHeader = GlobalInjector.config.rbkUtils.authorization.roles.behavior == 'single' ? 'Perfil' : 'Perfis';

    this.tableState = new SmzTableBuilder()
      .setTitle(GlobalInjector.config.rbkUtils.authorization.users.title)
      .enableGlobalFilter()
      .setSize('small')
      .useStrippedStyle()
      .menu()
        .item('Editar Perfil', 'fas fa-user-tag')
        .setVisibilityRule(() => hasUserRolesUpdateAccess)
          .setCallback((event: UserDetails) => this.onSetRoles(event, GlobalInjector.config.rbkUtils.authorization.roles.behavior))
          .menu
        .item('Editar Permissões', 'fas fa-key')
          .setCallback((event: UserDetails) => this.onUpdateClaims(event))
          .setVisibilityRule(() => hasUserClaimsUpdateAccess)
          .menu
        .item('Excluir', 'fa-solid fa-trash')
          .setCallback((event: UserDetails) => this.onDelete(event))
          .menu
        .table
      .columns()
        .custom('name', 'Nome', '30em')
          .enableSort()
          .forceGlobalFilter()
          .columns
        .text('username', 'Chave', '12em')
          .disableFilter()
          .columns
        .dataTransform('roles', roleColumnHeader, (roles: SimpleNamedEntity[]) => roles.map(x => x.name).join(', '), '16em')
          .setFilter(SmzFilterType.MULTI_SELECT_ARRAY)
          .columns
      .table
    .build();
  }

  public onCreate(): void {
    if (GlobalInjector.config.rbkUtils.authorization.roles.behavior == 'single') {
      // this.dialogs.open(buildCreateUserWithSingleRoleDialog());
    }
    else {
      // this.dialogs.open(buildCreateUserWithMultipleRoleDialog());
    }
  }

  public onSetRoles(event: UserDetails, roleBehavior: RoleBehavior): void {
    switch (roleBehavior) {
      case 'single':
        buildShowSetUserRoleDialog(event);
        break;

      case 'multiple':
        // buildShowSetUserRolesDialog(event);
        break;

      default:
        break;
    }
  }

  @Confirmable('Tem certeza que deseja excluir este usuário?', 'Confirmação', true)
  public onDelete(event: UserDetails): void {
    // this.store.dispatch(new UsersActions.Remove({ id: event.id }));
  }

  public onUpdateClaims(event: UserDetails): void {
    // this.dialogs.open(buildUpdateUserClaimsDialog(event, this.helpService));
  }

  public handleMissingImage(event: Event, user: string, notfound: string) {
    console.warn(`Avatar not found on (${notfound}) for user: ${user}`);
    (event.target as HTMLImageElement).src = GlobalInjector.config.rbkUtils.authorization.users.avatarPlaceholderPath;
  }

}