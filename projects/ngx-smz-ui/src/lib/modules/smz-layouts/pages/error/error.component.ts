import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';import { NgxRbkUtilsConfig } from '../../../rbk-utils/ngx-rbk-utils.config';
import { DatabaseActions } from '../../../../state/database/database.actions';
import { FeaturesActions } from '../../../../state/features/features.actions';
import { GlobalActions } from '../../../../state/global/global.actions';
 import { SmzLayoutsConfig } from '../../core/globals/smz-layouts.config';
import { RouterDataListenerService } from '../../core/services/router-data-listener.service';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'smz-ui-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(public readonly rbkConfig: NgxRbkUtilsConfig, public readonly config: SmzLayoutsConfig, public readonly routerListener: RouterDataListenerService, private store: Store) {
  }

  public ngOnInit(): void {
    this.clear();
  }

  public clear(): void {
    this.store.dispatch(new GlobalActions.Clear());
    this.store.dispatch(new DatabaseActions.Clear());
    this.store.dispatch(new FeaturesActions.Clear());
    localStorage.clear();
    window.history.pushState('', '', '');
  }

  public goToLogin(): void {
    this.store.dispatch(new Navigate([this.rbkConfig.routes.login]));
    this.clear();
  }

}
