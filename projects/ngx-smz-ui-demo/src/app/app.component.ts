import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
  title = 'ngx-smz-ui-demo';
  public menu: MenuItem[];
  constructor()
  {
    this.menu = [
      {
        label: 'App Navigation',
        items: [
          {
            label: 'No Auth', items: [
              { label: 'Landing', routerLink: ['landing'] },
            ]
          },
          {
            label: 'Auth', items: [
              { label: 'Home', routerLink: ['home'] },
              { label: 'Details', routerLink: ['details'] },
            ]
          },
        ]
      },
      {
        label: 'Lib Navigation',
        items: [
          {
            label: 'No Auth', items: [
              { label: 'Login', routerLink: ['login'] },
            ]
          },
        ]
      },
    ];
  }
}
