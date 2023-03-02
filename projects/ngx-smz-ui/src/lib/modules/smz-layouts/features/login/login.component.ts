import { Component, HostBinding, Input, OnInit, ChangeDetectionStrategy, TemplateRef, ContentChildren, QueryList, AfterContentInit, forwardRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LayoutUiSelectors } from '../../../../state/ui/layout/layout.selectors';
import { Observable } from 'rxjs';
import { SmzAppLogo } from '../../core/models/logo';
import { SmzLoginData } from '../../core/models/login';
import { SmzFormsResponse } from '../../../smz-forms/models/smz-forms';
import { SmzLoginState } from './login-state';
import { SmzLoginBuilder } from '../../../../builders/smz-login/state-builder';
import { PrimeTemplate } from 'primeng/api';
import { GlobalInjector } from '../../../../common/services/global-injector';

@Component({
  selector: 'smz-ui-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmzLoginComponent implements OnInit, AfterContentInit {
  @ContentChildren(forwardRef(() => PrimeTemplate)) templates: QueryList<PrimeTemplate>;
  @Select(LayoutUiSelectors.appContentLogo) public appLogo$: Observable<SmzAppLogo>;
  @Input() public state: SmzLoginState<any, any> = this.buildState();
  public baseClass = 'fixed inset-0';
  public extraTemplate: TemplateRef<any>;

  constructor(private store: Store) { }

  @HostBinding('class') get colorClass() { return `${this.state.styleClass.background} ${this.baseClass}`; };

  public buildState(): SmzLoginState<unknown, unknown> {
    return new SmzLoginBuilder()
      .setPayloadCallback(
        (response: any) => (
          {
            username: response.username,
            password: response.password,
            extraProperties:
            {
              applicationId: GlobalInjector.config.rbkUtils.authentication?.refreshToken?.extraProperties?.applicationId,
              domain: 'BUZIOS'
            }
          }))
      .build();
  }

  public ngOnInit(): void {
    const isAuthenticated = this.store.selectSnapshot(this.state.isAuthenticatedSelector);

    if (isAuthenticated) this.store.dispatch(new this.state.actions.logout);
  }


  public ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {

        case 'extra':
          this.extraTemplate = item.template;
          break;
      }
    });
  }

  public login(form: SmzFormsResponse<SmzLoginData>): void {
    const payload = this.state.callbacks.payload(form.data);

    this.state.callbacks.submit(form.data);
    this.store.dispatch(new this.state.actions.login(payload));
  }

}