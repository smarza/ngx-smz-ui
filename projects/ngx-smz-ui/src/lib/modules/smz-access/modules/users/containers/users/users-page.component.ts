import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UsersSelectors } from '../../../../state/users/users.selectors';
import { SmzTableState } from '../../../../../smz-tables/models/table-state';
import { UserDetails } from '../../../../models/user-details';
import { GlobalInjector } from '../../../../../../common/services/global-injector';
import { SmzAuthorizationUsersTableBuilder } from '../../tables/users-table-state';
import { SmzAuthorizationDeactivatedUsersTableBuilder } from '../../tables/deactivated-users-table-state';

@Component({
    selector: 'smz-ui-users-page',
    templateUrl: './users-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class UsersPageComponent {

  public users$: Observable<UserDetails[]>;
  public tableState: SmzTableState;
  public activatedTableState: SmzTableState;
  public deactivatedTableState: SmzTableState;
  public uiConfig = GlobalInjector.config;
  public viewOptions = [{label: 'Usuários Ativos', value: 'activated'}, {label: 'Usuários Inativos', value: 'deactivated'}];
  public selectedView: string;

  constructor(private store: Store, private cdr: ChangeDetectorRef) {
    if (this.uiConfig.rbkUtils.authorization.users.table.customBuilder != null) {
      this.activatedTableState = this.uiConfig.rbkUtils.authorization.users.table.customBuilder().build();
      this.deactivatedTableState = this.uiConfig.rbkUtils.authorization.users.table.customBuilder().build();

      if (this.activatedTableState.emptyFeedback.isFeatured) {
        throw Error(`You can't use a custom table with featured empty message. Please, call 'useTableEmptyMessage' method at the users custom table builder.`);
      }

      if (this.uiConfig.rbkUtils.authorization.users.table.useDefaultMenu) {
        const defaultState = SmzAuthorizationUsersTableBuilder().build();
        this.activatedTableState.actions.menu.isVisible = defaultState.actions.menu?.items?.length > 0 || this.activatedTableState.actions.menu?.items?.length > 0;

        if (defaultState.actions.menu?.items?.length > 0) {
          this.activatedTableState.actions.menu.items = [ ...this.activatedTableState.actions.menu.items, ...defaultState.actions.menu.items ];
        }

        if (this.activatedTableState.actions.customActions.columnWidth === 0)
        {
          this.activatedTableState.actions.customActions = defaultState.actions.customActions;
        }

        const deactivatedState = SmzAuthorizationDeactivatedUsersTableBuilder().build();
        this.deactivatedTableState.actions.menu.isVisible = deactivatedState.actions.menu.items?.length > 0;
        this.deactivatedTableState.actions.menu.items = [ ...deactivatedState.actions.menu.items ];
      }
    }
    else {
      this.activatedTableState  = SmzAuthorizationUsersTableBuilder().build();
      this.deactivatedTableState  = SmzAuthorizationDeactivatedUsersTableBuilder().build();
    }

    this.tableState = this.activatedTableState;

    if (this.uiConfig.rbkUtils.authorization.users.removalBehavior == 'deletion') {
      this.selectedView = 'all';
      this.users$ = this.store.select(UsersSelectors.all);
    }
    else {
      this.selectedView = 'activated';
      this.users$ = this.store.select(UsersSelectors.activated);
    }


  }

  public handleMissingImage(event: Event, user: string, notfound: string) {
    console.warn(`Avatar not found on (${notfound}) for user: ${user}`);
    (event.target as HTMLImageElement).src = GlobalInjector.config.rbkUtils.authorization.users.avatarPlaceholderPath;
  }

  public handleViewOptionChange(event: 'activated' | 'deactivated'): void {
    switch (event) {
      case 'activated':
        this.users$ = this.store.select(UsersSelectors.activated);
        this.tableState = { ...this.activatedTableState };
        break;
      case 'deactivated':
        this.users$ = this.store.select(UsersSelectors.deactivated);
        this.tableState = { ...this.deactivatedTableState };
        break;
      default:
        this.users$ = this.store.select(UsersSelectors.all);
        this.tableState = { ...this.activatedTableState };
        break;
    }

    this.cdr.markForCheck();
  }

}