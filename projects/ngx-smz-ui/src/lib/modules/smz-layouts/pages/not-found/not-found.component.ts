import { Component, OnInit } from '@angular/core';
import { NgxRbkUtilsConfig } from '../../../rbk-utils/ngx-rbk-utils.config';
import { SmzLayoutsConfig } from '../../core/globals/smz-layouts.config';

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
