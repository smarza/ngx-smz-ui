import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store'; import { SmzLayoutsConfig } from '../../globals/smz-layouts.config';
import { RouterDataListenerService } from '../../core/services/router-data-listener.service';

import { DatabaseActions, FeaturesActions, GlobalActions, NgxRbkUtilsConfig } from 'ngx-rbk-utils';

@Component({
  selector: 'smz-ui-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(public readonly rbkConfig: NgxRbkUtilsConfig, public readonly config: SmzLayoutsConfig) {
  }

  public ngOnInit(): void {
  }

  public clear(): void {
  }

}
