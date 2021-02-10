import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store'; import { SmzLayoutsConfig } from '../../globals/smz-layouts.config';
import { RouterDataListenerService } from '../../core/services/router-data-listener.service';

import { DatabaseActions, FeaturesActions, GlobalActions, NgxRbkUtilsConfig } from 'ngx-rbk-utils';

@Component({
  selector: 'smz-ui-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(public readonly rbkConfig: NgxRbkUtilsConfig, public readonly config: SmzLayoutsConfig, public readonly routerListener: RouterDataListenerService, private store: Store) {
    this.clear();
  }

  public ngOnInit(): void {
  }

  public clear(): void {
    this.store.dispatch(new GlobalActions.Clear());
    this.store.dispatch(new DatabaseActions.Clear());
    this.store.dispatch(new FeaturesActions.Clear());
    localStorage.clear();
  }

}
