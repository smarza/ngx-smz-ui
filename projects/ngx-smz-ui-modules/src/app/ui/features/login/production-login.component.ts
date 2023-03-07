import { Component } from '@angular/core';
import { LoginPayload, SmzLoginState, SimpleEntity } from 'ngx-smz-ui';
import { Store } from '@ngxs/store';

interface LoginData {
  tenant: SimpleEntity<string>;
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  template: `<smz-ui-login [state]="state"></smz-ui-login>`,
})
export class ProductionLoginComponent {
  public state: SmzLoginState<LoginData, LoginPayload> = this.buildState();

  constructor(private store: Store) {}
  public buildState(): SmzLoginState<LoginData, LoginPayload> {
    return;
  }
}
