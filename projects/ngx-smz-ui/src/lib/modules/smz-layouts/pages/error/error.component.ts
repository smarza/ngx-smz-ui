import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { DatabaseActions } from '../../../../state/database/database.actions';
import { FeaturesActions } from '../../../../state/features/features.actions';
import { GlobalActions } from '../../../../state/global/global.actions';
import { RouterDataListenerService } from '../../core/services/router-data-listener.service';
import { Navigate } from '@ngxs/router-plugin';
import forIn from 'lodash-es/forIn';
import startsWith from 'lodash-es/startsWith';
import { GlobalInjector } from '../../../../common/services/global-injector';

@Component({
  selector: 'smz-ui-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  public uiConfig = GlobalInjector.config;
  constructor(public readonly routerListener: RouterDataListenerService, private store: Store) {}

  public ngOnInit(): void {

    if (GlobalInjector.config.rbkUtils.errorsConfig.clearBehaviors.method === 'onError') {
      this.clear();
    }

  }

  public redirect(): void {
    this.store.dispatch(
      new Navigate([GlobalInjector.config.rbkUtils.errorsConfig.page.button.redirectTo])
    );

    if (GlobalInjector.config.rbkUtils.errorsConfig.clearBehaviors.method === 'onRedirect') {
      this.clear();
    }

  }

  public clear(): void {
    if (GlobalInjector.config.rbkUtils.errorsConfig.clearBehaviors.globalStates) {
      this.store.dispatch(new GlobalActions.Clear());
    }

    if (GlobalInjector.config.rbkUtils.errorsConfig.clearBehaviors.databaseStates) {
      this.store.dispatch(new DatabaseActions.Clear());
    }

    if (GlobalInjector.config.rbkUtils.errorsConfig.clearBehaviors.featuresStates) {
      this.store.dispatch(new FeaturesActions.Clear());
    }

    switch (GlobalInjector.config.rbkUtils.errorsConfig.clearBehaviors.localStorage) {
      case 'appPrefix':
        forIn(window.localStorage, (value: string, objKey: string) => {
          if (true === startsWith(objKey, GlobalInjector.config.rbkUtils.authentication.localStoragePrefix)) {
              window.localStorage.removeItem(objKey);
          }
      });
        break;
      case 'none':

        break;
    }

    if (GlobalInjector.config.rbkUtils.errorsConfig.clearBehaviors.navigationHistory) {
      window.history.pushState('', '', '');
    }

  }
}
