import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store'; import { SmzLayoutsConfig } from '../../globals/smz-layouts.config';
import { RouterDataListenerService } from '../../core/services/router-data-listener.service';
import { FormGroupComponent, SmzControlType, SmzForm, SmzPasswordControl, SmzTextControl } from 'ngx-smz-dialogs';
import { AuthenticationActions } from 'ngx-rbk-utils';

@Component({
  selector: 'smz-ui-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit
{
  public form: SmzForm<never>;

  constructor(public readonly config: SmzLayoutsConfig, public readonly routerListener: RouterDataListenerService, private store: Store)
  {
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
      formId: 'form1',
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

  public login(form: FormGroupComponent): void {
    const data = form.getData().data as { username: string, password: string };
    this.store.dispatch(new AuthenticationActions.RemoteLogin(data.username, data.password));
  }
}
