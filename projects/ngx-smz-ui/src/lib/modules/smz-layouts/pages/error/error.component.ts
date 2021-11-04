import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { NgxRbkUtilsConfig } from '../../../rbk-utils/ngx-rbk-utils.config';
import { DatabaseActions } from '../../../../state/database/database.actions';
import { FeaturesActions } from '../../../../state/features/features.actions';
import { GlobalActions } from '../../../../state/global/global.actions';
import { SmzLayoutsConfig } from '../../core/globals/smz-layouts.config';
import { RouterDataListenerService } from '../../core/services/router-data-listener.service';
import { Navigate } from '@ngxs/router-plugin';
import forIn from 'lodash-es/forIn';
import startsWith from 'lodash-es/startsWith';

@Component({
  selector: 'smz-ui-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  constructor(
    public readonly rbkConfig: NgxRbkUtilsConfig,
    public readonly routerListener: RouterDataListenerService,
    private store: Store
  ) {}

  public ngOnInit(): void {

    if (this.rbkConfig.errorsConfig.clearBehaviors.method === 'onError') {
      this.clear();
    }

  }

  public redirect(): void {
    this.store.dispatch(
      new Navigate([this.rbkConfig.errorsConfig.page.button.redirectTo])
    );

    if (this.rbkConfig.errorsConfig.clearBehaviors.method === 'onRedirect') {
      this.clear();
    }

  }

  public clear(): void {
    if (this.rbkConfig.errorsConfig.clearBehaviors.globalStates) {
      this.store.dispatch(new GlobalActions.Clear());
    }

    if (this.rbkConfig.errorsConfig.clearBehaviors.databaseStates) {
      this.store.dispatch(new DatabaseActions.Clear());
    }

    if (this.rbkConfig.errorsConfig.clearBehaviors.featuresStates) {
      this.store.dispatch(new FeaturesActions.Clear());
    }

    switch (this.rbkConfig.errorsConfig.clearBehaviors.localStorage) {
      case 'appPrefix':
        forIn(window.localStorage, (value: string, objKey: string) => {
          if (true === startsWith(objKey, this.rbkConfig.authentication.localStoragePrefix)) {
              window.localStorage.removeItem(objKey);
          }
      });
        break;
      case 'none':

        break;
    }

    if (this.rbkConfig.errorsConfig.clearBehaviors.navigationHistory) {
      window.history.pushState('', '', '');
    }

  }
}
