import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UsersDbSelectors } from '../../../../state/database/users/users.selectors';
import { UsersDbActions } from '../../../../state/database/users/users.actions';
import { NgxRbkUtilsConfig, RoleBehavior } from '../../../rbk-utils/ngx-rbk-utils.config';
import { SmzHelpDialogService } from '../../../smz-dialogs/services/help-dialog.service';
import { SmzDialogsService } from '../../../smz-dialogs/services/smz-dialogs.service';
import { AuthenticationSelectors } from '../../../../state/global/authentication/authentication.selectors';
import { SmzTableBuilder } from '../../../../builders/smz-tables/state-builder';
import { SmzTableState } from '../../../smz-tables/models/table-state';
import { SmzFilterType } from '../../../smz-tables/models/filter-types';
import { SimpleNamedEntity } from '../../../../../lib/common/models/simple-named-entity';
import { Confirmable } from '../../../smz-dialogs/decorators/confirmable.decorator';
import { UserDetails } from '../../../rbk-utils/models/user-details';

@Component({
  selector: 'gedi-ui-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPageComponent {

  public items$: Observable<UserDetails[]>;
  public tableState: SmzTableState;

  constructor(public readonly config: NgxRbkUtilsConfig, private dialogs: SmzDialogsService, private store: Store,
    private helpService: SmzHelpDialogService) {

    this.items$ = this.store.select(UsersDbSelectors.users);

    const hasUserRolesUpdateAccess: boolean = this.store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(this.config.cruds.users.manageUserRolesUpdateClaim));
    const hasUserClaimsUpdateAccess: boolean = this.store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(this.config.cruds.users.manageUserClaimsUpdateClaim));

    const roleColumnHeader = this.config.cruds.roles.behavior == 'single' ? 'Perfil' : 'Perfis';

    this.tableState = new SmzTableBuilder()
      .setTitle(config.cruds.users.title)
      .enableGlobalFilter()
      .setSize('small')
      .useStrippedStyle()
      .menu()
        .item('Editar Perfil', 'fas fa-user-tag')
        .setVisibilityRule(() => hasUserRolesUpdateAccess)
          .setCallback((event: UserDetails) => this.onUpdateRoles(event, config.cruds.roles.behavior))
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
    if (this.config.cruds.roles.behavior == 'single') {
      // this.dialogs.open(buildCreateUserWithSingleRoleDialog());
    }
    else {
      // this.dialogs.open(buildCreateUserWithMultipleRoleDialog());
    }
  }

  public onUpdateRoles(event: UserDetails, roleBehavior: RoleBehavior): void {
    // if (roleBehavior == 'single') {
    //   this.dialogs.open(buildUpdateUserWithSingleRoleDialog(event));
    // }
    // else {
    //   this.dialogs.open(buildUpdateUserWithMultipleRoleDialog(event));
    // }
  }

  @Confirmable('Tem certeza que deseja excluir este usuário?', 'Confirmação', true)
  public onDelete(event: UserDetails): void {
    // this.store.dispatch(new UsersDbActions.Remove({ id: event.id }));
  }

  public onUpdateClaims(event: UserDetails): void {
    // this.dialogs.open(buildUpdateUserClaimsDialog(event, this.helpService));
  }

  public handleMissingImage(event: Event, user: string, notfound: string) {
    console.warn(`Avatar not found on (${notfound}) for user: ${user}`);
    (event.target as HTMLImageElement).src = this.config.cruds.users.avatarPlaceholderPath;
  }

}