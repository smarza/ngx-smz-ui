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
          { label: 'Landing', icon: 'pi-home', routerLink: ['landing'] },
          { label: 'Home', icon: 'pi-home', routerLink: ['home'] },
          { label: 'Details', icon: 'pi-home', routerLink: ['details'] },
        ]
      },
      {
        label: 'Lib Navigation',
        items: [
          { label: 'Login', icon: 'pi-home', routerLink: ['login'] },
        ]
      },
      {
        label: 'Hierarchy',
        items: [
          {
            label: 'No Auth', icon: 'pi-home', items: [
              { label: 'Login', icon: 'pi-home', routerLink: ['login'] },
            ]
          },
        ]
      },
    ];
  }
}
