import { Injectable } from '@angular/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { first } from 'rxjs/operators';
import { AuthenticationActions } from '../../../state/global/authentication/authentication.actions';
import { AuthenticationSelectors } from '../../../state/global/authentication/authentication.selectors';
import { NotificationsUiActions } from '../../../state/ui/notifications/notifications.actions';
import { NgxRbkUtilsConfig } from '../../rbk-utils/ngx-rbk-utils.config';

@Injectable({providedIn: 'root'})
export class SmzNotificationsService {
  constructor(private store: Store, private rbkConfig: NgxRbkUtilsConfig, private actions$: Actions) { }

  public init(): void {
    const updateRate = this.rbkConfig.notifications.updateRate ?? 50000;
    const updateMethod = this.rbkConfig.notifications.updateMethod ?? 'interval';

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