import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UsersSelectors } from '../../../../state/users/users.selectors';
import { SmzTableState } from '../../../../../smz-tables/models/table-state';
import { Confirmable } from '../../../../../smz-dialogs/decorators/confirmable.decorator';
import { UserDetails } from '../../../../models/user-details';
import { GlobalInjector } from '../../../../../../common/services/global-injector';

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

    if (this.uiConfig.rbkUtils.authorization.users.table.customBuilder != null) {
      this.tableState = this.uiConfig.rbkUtils.authorization.users.table.customBuilder().build();

      if (this.uiConfig.rbkUtils.authorization.users.table.useDefaultMenu) {
        const defaultState = this.uiConfig.rbkUtils.authorization.users.table.defaultBuilder().build();
        this.tableState.actions.menu.isVisible = defaultState.actions.menu.items?.length > 0;
        this.tableState.actions.menu.items = [ ...this.tableState.actions.menu.items, ...defaultState.actions.menu.items ];
      }
    }
    else {
      this.tableState  = this.uiConfig.rbkUtils.authorization.users.table.defaultBuilder().build();
    }

  }

  public onCreate(): void {
    if (GlobalInjector.config.rbkUtils.authorization.roles.behavior == 'single') {
      // this.dialogs.open(buildCreateUserWithSingleRoleDialog());
    }
    else {
      // this.dialogs.open(buildCreateUserWithMultipleRoleDialog());
    }
  }

  @Confirmable('Tem certeza que deseja excluir este usuário?', 'Confirmação', true)
  public onDelete(event: UserDetails): void {
    // this.store.dispatch(new UsersActions.Remove({ id: event.id }));
  }

  public handleMissingImage(event: Event, user: string, notfound: string) {
    console.warn(`Avatar not found on (${notfound}) for user: ${user}`);
    (event.target as HTMLImageElement).src = GlobalInjector.config.rbkUtils.authorization.users.avatarPlaceholderPath;
  }

}