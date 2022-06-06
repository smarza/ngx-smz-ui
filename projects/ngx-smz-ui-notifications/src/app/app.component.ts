import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { MenuHelperService, ThemeManagerService, BoilerplateService } from 'ngx-smz-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private store: Store, private boilerplateService: BoilerplateService, public menuService: MenuHelperService, private themeManager: ThemeManagerService) {
    this.boilerplateService.init();

    this.themeManager.createCss('assets/priority-styles.css');

    this.menuService.setProfile([ { label: 'Logout', icon: 'pi-power-off', routerLink: ['/login'] } ]);

    this.menuService.setMenu([
      { label: 'Click me', icon: 'fas fa-check-double', routerLink: ['details', 'again'] },
      {
        label: 'Demos',
        icon: 'pi-home',
        items: [
          { label: 'Charts', icon: 'far fa-chart', routerLink: ['charts'] },
          { label: 'Chart Colors', icon: 'far fa-chart', routerLink: ['charts', 'colors'] },
          { label: 'Tag Area', icon: 'fa-solid fa-tree', routerLink: ['tag-area'] },
          { label: 'Trees', icon: 'fa-solid fa-tree', routerLink: ['trees'] },
          { label: 'Side Content', icon: 'fa-solid fa-star', routerLink: ['side-content'] },
          { label: 'Tag Area', icon: 'fa-solid fa-tree', routerLink: ['tag-area'] },
        ]
      },
      {
        label: 'Tables',
        icon: 'pi-home',
        items: [
          { label: 'Table', icon: 'fa-solid fa-star', routerLink: ['tables'] },
          { label: 'Editable Table', icon: 'fa-solid fa-star', routerLink: ['editable-table'] },
          { label: 'Prime Table', icon: 'fa-solid fa-star', routerLink: ['tables', 'prime'] },
          { label: 'Complex Table', icon: 'fa-solid fa-star', routerLink: ['tables', 'complex'] },
        ]
      },
      {
        label: 'Extras',
        icon: 'pi-home',
        items: [
          { label: 'Details 1', routerLink: ['details'] },
          { label: 'Details 2', routerLink: ['details', 'again'] },
          { label: 'Faqs', icon: 'fa-solid fa-star', routerLink: ['faqs'] },
          { label: 'Home', routerLink: ['home'] },
          { label: 'Landing', routerLink: ['landing'] },
          { label: 'Ng Dom', icon: 'fa-solid fa-star', routerLink: ['ng-dom'] },
          { label: 'Nested Routes 1', icon: 'fa-solid fa-star', routerLink: ['nested'] },
          { label: 'Nested Routes 2', icon: 'fa-solid fa-star', routerLink: ['nested', 'layout' ] },
          { label: 'Nested Routes 3 With Layouts', icon: 'fa-solid fa-star', routerLink: ['nested-routes'] },
          { label: 'Resolvers', routerLink: ['resolvers'] }
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
      {
        label: 'Hierarchy 2',
        items: [
          {
            label: 'Multi-level 1', items: [
              { label: 'Login 1', routerLink: ['login'] },
              { label: 'Home',  routerLink: ['home'] },
            ]
          },
          {
            label: 'Single', icon: 'pi-home'
          },
        ]
      },
    ]);

  }

}