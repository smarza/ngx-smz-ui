import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';import { SmzLayoutsConfig } from '../../globals/smz-layouts.config';
import { RouterDataListenerService } from '../../core/services/router-data-listener.service';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'smz-ui-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit
{

  constructor(public readonly config: SmzLayoutsConfig, public readonly routerListener: RouterDataListenerService, private store: Store) { }

  ngOnInit(): void
  {
  }

  public submit(): void
  {
    this.store.dispatch(new Navigate(['/']));
  }

}
