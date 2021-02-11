import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store'; import { SmzLayoutsConfig } from '../../core/globals/smz-layouts.config';
import { SmzControlType, SmzForm, SmzFormsResponse, SmzPasswordControl, SmzTextControl } from 'ngx-smz-dialogs';
import { AuthenticationActions } from 'ngx-rbk-utils';
import { UiSelectors } from '../../core/state/ui/ui.selectors';
import { Observable } from 'rxjs/internal/Observable';
import { SmzAppLogo } from '../../core/models/logo';
import { SmzLoginData } from '../../core/models/login';

@Component({
  selector: 'smz-ui-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Select(UiSelectors.appLogo) public appLogo$: Observable<SmzAppLogo>;
  public form: SmzForm<SmzLoginData>;

  constructor(public readonly config: SmzLayoutsConfig, private store: Store) {
    this.createForm();
  }

  public ngOnInit(): void {


  }

  public createForm(): void {

    const username: SmzTextControl = {
      propertyName: 'username', type: SmzControlType.TEXT, name: 'Usuário',
      validatorsPreset: { isRequired: true },
      template: { extraSmall: { row: 'col-12' } }
    };

    const password: SmzPasswordControl = {
      propertyName: 'password', type: SmzControlType.PASSWORD, name: 'Senha',
      validatorsPreset: { isRequired: true },
      template: { extraSmall: { row: 'col-12' } }
    };

    this.form = {
      formId: 'smz-ui-login-form',
      behaviors: { flattenResponse: false },
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
    this.store.dispatch(new AuthenticationActions.RemoteLogin(form.data.username, form.data.password));
  }

}