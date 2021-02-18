import { Component } from '@angular/core';
import { BoilerplateService } from 'ngx-rbk-utils';
import { MenuItem } from 'primeng/api';
import { SmzNotification } from 'ngx-smz-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-smz-ui-demo';
  public menu: MenuItem[] = [];
  public profile: MenuItem[];
  public notifications: SmzNotification[];
  constructor(private boilerplateService: BoilerplateService) {
    this.boilerplateService.init();

    this.menu = [
      {
        label: 'Click me',
        icon: 'fas fa-check-double',
        routerLink: ['details'],
        items: [
          { label: 'Click me', icon: 'fas fa-check-double', routerLink: ['details'] },
        ]
      },
      {
        label: 'App Navigation',
        icon: 'pi-home',
        items: [
          { label: 'Landing', icon: 'pi-home', routerLink: ['landing'] },
          { label: 'Home', icon: 'pi-home', routerLink: ['home'] },
          { label: 'Details', icon: 'pi-home', routerLink: ['details'] },
        ]
      },
      {
        label: 'Lib Pages',
        icon: 'pi-star',
        items: [
          { label: 'Login', icon: 'pi-home', routerLink: ['login'] },
          { label: 'Error', icon: 'pi-home', routerLink: ['error'] },
          { label: 'Not Found', icon: 'pi-home', routerLink: ['notfound'] },
        ]
      },
      {
        label: 'Actions',
        icon: 'pi-home',
        items: [
          { label: 'Console Log', icon: 'pi-home', command: () => console.log('Console Log') },
        ]
      },
      {
        label: 'Hierarchy',
        icon: 'pi-align-left',
        items: [
          {
            label: 'Multi-level 1', icon: 'pi-home', items: [
              { label: 'Login 1', icon: 'pi-home', routerLink: ['login'] },
              { label: 'Home', icon: 'pi-home', routerLink: ['home'] },
              { label: 'Details', icon: 'pi-home', routerLink: ['details'] },
              {
                label: 'Multi-level 2', icon: 'pi-home', items: [
                  { label: 'Login 1', icon: 'pi-home', routerLink: ['login'] },
                  { label: 'Login 2', icon: 'pi-home', routerLink: ['login'] },
                ]
              },
            ]
          },
          {
            label: 'Single', icon: 'pi-home'
          },
        ]
      },
    ];

    this.profile = [
      {
        label: 'Profile',
        icon: 'pi-user',
        routerLink: ['/home'],
      },
      {
        label: 'Settings',
        icon: 'pi-cog',
        routerLink: ['/details'],
      },
      {
        label: 'Logout',
        icon: 'pi-power-off',
        routerLink: ['/login'],
      },
    ];

    this.notifications = [
      {
        summary: 'New Order',
        details: 'You have <strong>3</strong> new orders',
        icon: 'pi-shopping-cart',
        routerLink: ['/details'],
      },
      {
        summary: 'Withdrawn Completed',
        details: 'Funds are on their way',
        icon: 'pi-check-square',
        routerLink: ['/login'],
      }
    ];
  }
}
