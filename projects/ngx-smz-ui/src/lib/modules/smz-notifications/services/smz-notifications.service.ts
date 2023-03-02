import { Injectable } from '@angular/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { GlobalInjector } from '../../../common/services/global-injector';
import { AuthenticationActions } from '../../../state/global/authentication/authentication.actions';
import { AuthenticationSelectors } from '../../../state/global/authentication/authentication.selectors';
import { NotificationsUiActions } from '../../../state/ui/notifications/notifications.actions';

@Injectable({providedIn: 'root'})
export class SmzNotificationsService {
  constructor(private store: Store, private actions$: Actions) { }

  public init(): void {
    const updateRate = GlobalInjector.config.rbkUtils.notifications.updateRate ?? 50000;
    const updateMethod = GlobalInjector.config.rbkUtils.notifications.updateMethod ?? 'interval';

    switch (updateMethod) {
      case 'interval':

        this.actions$.pipe(ofActionSuccessful(AuthenticationActions.LocalLoginSuccess)).subscribe(() => {
          this.loadAll();
        });

        this.actions$.pipe(ofActionSuccessful(AuthenticationActions.RemoteLoginSuccess)).subscribe(() => {
          this.loadAll();
        });

        const timer = setInterval(() => {
          this.loadAll();
        }, updateRate);

        break;

      default:
        break;
    }
  }

  private loadAll(): void {
    const isAuthenticated = this.store.selectSnapshot(AuthenticationSelectors.isAuthenticated);

    if (isAuthenticated) {
      this.store.dispatch(new NotificationsUiActions.LoadAll({}));
    }
  }

}