import { Component, OnInit } from '@angular/core';
import { GlobalInjector } from '../../../../common/services/global-injector';

@Component({
    selector: 'smz-ui-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
    standalone: false
})
export class NotFoundComponent implements OnInit {
  public uiConfig = GlobalInjector.config;

  constructor() {
  }

  public ngOnInit(): void {
  }

  public clear(): void {
  }

}
