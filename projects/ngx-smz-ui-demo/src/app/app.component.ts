import { Component } from '@angular/core';
import { BoilerplateService } from 'ngx-rbk-utils';
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
  constructor(private boilerplateService: BoilerplateService)
  {
    this.boilerplateService.init();

    this.menu = [
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
        label: 'Lib Navigation',
        icon: 'pi-star',
        items: [
          { label: 'Login', icon: 'pi-home', routerLink: ['login'] },
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
  }
}
