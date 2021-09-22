import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store'; import { SmzLayoutsConfig } from '../../core/globals/smz-layouts.config';
import { LayoutUiSelectors } from '../../../../state/ui/layout/layout.selectors';
import { Observable } from 'rxjs';
import { SmzAppLogo } from '../../core/models/logo';
import { SmzLoginData } from '../../core/models/login';
import { SmzForm, SmzFormsResponse } from '../../../smz-forms/models/smz-forms';
import { SmzControlType, SmzPasswordControl, SmzTextControl } from '../../../smz-forms/models/control-types';
import { AuthenticationSelectors } from '../../../../state/global/authentication/authentication.selectors';
import { AuthenticationActions } from '../../../../state/global/authentication/authentication.actions';

@Component({
  selector: 'smz-ui-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Select(LayoutUiSelectors.appContentLogo) public appLogo$: Observable<SmzAppLogo>;
  public form: SmzForm<SmzLoginData>;

  constructor(public readonly config: SmzLayoutsConfig, private store: Store) {
    this.createForm();
  }

  public ngOnInit(): void {
    const isAuthenticated = this.store.selectSnapshot(AuthenticationSelectors.isAuthenticated);

    if (isAuthenticated) this.store.dispatch(new AuthenticationActions.Logout);
  }

  public createForm(): void {

    const username: SmzTextControl = {
      propertyName: 'username', type: SmzControlType.TEXT, name: 'Usuário',
      validatorsPreset: { isRequired: true },
      template: { extraSmall: { row: 'col-12' } }
    };

    const password: SmzPasswordControl = {
      propertyName: 'password', type: SmzControlType.PASSWORD, name: 'Senha',
      feedback: false,
      toggleMask: false,
      promptLabel: 'Digite a senha',
      weakLabel: 'Fraca',
      mediumLabel: 'Moderada',
      strongLabel: 'Forte',
      mediumRegex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
      strongRegex: '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,}).',
      validatorsPreset: { isRequired: true },
      template: { extraSmall: { row: 'col-12' } }
    };

    this.form = {
      formId: 'smz-ui-login-form',
      behaviors: { flattenResponse: false, submitOnEnter: true },
      groups: [
        {
          name: null,
          showName: true,
          children: [username, password],
          template: { extraSmall: { row: 'col-12' } }
        }
      ],
    };
  }

  public login(form: SmzFormsResponse<SmzLoginData>): void {
    this.store.dispatch(new AuthenticationActions.RemoteLogin(form.data.username, form.data.password, { applicationId: 'LIBRA', domain: 'BUZIOS' }));
  }

}