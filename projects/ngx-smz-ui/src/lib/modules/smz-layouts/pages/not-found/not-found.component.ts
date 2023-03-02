import { Component, OnInit } from '@angular/core';
import { SmzLayoutsConfig } from '../../core/globals/smz-layouts.config';
import { GlobalInjector } from '../../../../common/services/global-injector';

@Component({
  selector: 'smz-ui-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  public uiConfig = GlobalInjector.config;

  constructor(public readonly config: SmzLayoutsConfig) {
  }

  public ngOnInit(): void {
  }

  public clear(): void {
  }

}
