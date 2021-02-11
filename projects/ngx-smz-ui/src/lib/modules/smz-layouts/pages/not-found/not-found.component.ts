import { Component, OnInit } from '@angular/core';
import { SmzLayoutsConfig } from '../../core/globals/smz-layouts.config';

import { NgxRbkUtilsConfig } from 'ngx-rbk-utils';

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
