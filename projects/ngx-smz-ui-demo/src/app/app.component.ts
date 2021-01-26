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
        label: 'Navigation',
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
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      }
    ];
  }
}
