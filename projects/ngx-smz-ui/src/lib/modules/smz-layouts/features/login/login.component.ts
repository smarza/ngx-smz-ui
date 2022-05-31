import { Component, HostBinding, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SmzLayoutsConfig } from '../../core/globals/smz-layouts.config';
import { LayoutUiSelectors } from '../../../../state/ui/layout/layout.selectors';
import { Observable } from 'rxjs';
import { SmzAppLogo } from '../../core/models/logo';
import { SmzLoginData } from '../../core/models/login';
import { SmzFormsResponse } from '../../../smz-forms/models/smz-forms';
import { NgxRbkUtilsConfig } from '../../../rbk-utils/ngx-rbk-utils.config';
import { SmzLoginState } from './login-state';
import { SmzLoginBuilder } from '../../../../builders/smz-login/state-builder';

@Component({
  selector: 'smz-ui-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmzLoginComponent implements OnInit {
  @Select(LayoutUiSelectors.appContentLogo) public appLogo$: Observable<SmzAppLogo>;
  @Input() public state: SmzLoginState<any, any> = this.buildState();
  public baseClass = 'fixed inset-0';

  constructor(public readonly config: SmzLayoutsConfig, private store: Store, public rbkConfig: NgxRbkUtilsConfig) {}

  @HostBinding('class') get colorClass() { return `${this.state.styleClass.background} ${this.baseClass}`; };

  public buildState(): SmzLoginState<unknown, unknown> {

    return new SmzLoginBuilder()
      .setPayloadCallback((response: any) => ({ username: response.username, password: response.password, extraProperties: { applicationId: this.rbkConfig.authentication?.refreshToken?.extraProperties?.applicationId, domain: 'BUZIOS' } }))
      .build();

  }

  public ngOnInit(): void {
    const isAuthenticated = this.store.selectSnapshot(this.state.isAuthenticatedSelector);

    if (isAuthenticated) this.store.dispatch(new this.state.actions.logout);
  }

  public login(form: SmzFormsResponse<SmzLoginData>): void {
    const payload = this.state.callbacks.payload(form.data);

    this.state.callbacks.submit(form.data);
    this.store.dispatch(new this.state.actions.login(payload));
  }

}