import { Component } from '@angular/core';
import { BoilerplateService } from 'ngx-rbk-utils';
import { MenuHelperService } from 'ngx-smz-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-smz-ui-demo';
  constructor(private boilerplateService: BoilerplateService, public menuService: MenuHelperService) {
    this.boilerplateService.init();

    this.menuService.setMenu([
      { label: 'Click me', icon: 'fas fa-check-double', routerLink: ['details'] },
      {
        label: 'Demo',
        icon: 'pi-home',
        items: [
          { label: 'Landing', routerLink: ['landing'] },
          { label: 'Home', routerLink: ['home'] },
          { label: 'Details', routerLink: ['details'] },
          { label: 'Tables', icon: 'far fa-star', routerLink: ['tables'] },
          { label: 'Side Content', icon: 'far fa-star', routerLink: ['side-content'] },
          { label: 'Faqs', icon: 'far fa-star', routerLink: ['faqs'] },
        ]
      },
      {
        label: 'Lib Pages',
        icon: 'pi-star',
        items: [
          { label: 'Login', routerLink: ['login'] },
          { label: 'Error', routerLink: ['error'] },
          { label: 'Not Found', routerLink: ['notfound'] },
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
    ]);

    this.menuService.setProfile([
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
    ]);

    this.menuService.setNotifications([
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
    ]);

  }

}