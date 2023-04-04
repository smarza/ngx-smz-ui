import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { SIGNALR_PATH, SVG_DEMO_PATH, SVG_GCAB_PATH, SVG_PATH, SVG_PLAYGROUND_PATH } from '@routes';
import { MenuHelperService, ThemeManagerService, BoilerplateService } from 'ngx-smz-ui';

const test = { status: 1 };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-smz-ui-demo';
  constructor(private store: Store, private boilerplateService: BoilerplateService, public menuService: MenuHelperService, private themeManager: ThemeManagerService) {
    this.boilerplateService.init(() => {

      this.themeManager.createCss('assets/priority-styles.css');

      this.menuService.setMenuBuild(() => [
        { label: 'Click me', icon: 'fa-solid fa-check-double', routerLink: ['details', 'again'] },
        {
          label: 'Demos',
          sortChildren: true,
          items: [
            { label: 'Charts', icon: 'fa-solid fa-chart-simple', routerLink: ['charts'] },
            { label: 'Chart Colors', icon: 'fa-solid fa-chart-simple', routerLink: ['charts', 'colors'] },
            { label: 'Tag Area', icon: 'fa-solid fa-tree', routerLink: ['tag-area'] },
            { label: 'Trees', icon: 'fa-solid fa-tree', routerLink: ['trees'] },
            { label: 'Tree With Details', icon: 'fa-solid fa-tree', routerLink: ['tree-with-details'] },
            { label: 'Side Content', icon: 'fa-solid fa-star', routerLink: ['side-content'] },
            { label: 'SignalR', icon: 'fa-solid fa-chart-simple', routerLink: [SIGNALR_PATH] },
            { label: 'Tag Area', icon: 'fa-solid fa-tree', routerLink: ['tag-area'] },
            {
              label: 'Svgs',
              icon: 'fa-solid fa-house-chimney',
              sortChildren: true,
              items: [
                { label: 'Demo Lib', icon: 'fa-solid fa-chart-simple', routerLink: [SVG_PATH, SVG_DEMO_PATH] },
                { label: 'Playground', icon: 'fa-solid fa-chart-simple', routerLink: [SVG_PATH, SVG_PLAYGROUND_PATH] },
                { label: 'Gcab', icon: 'fa-solid fa-chart-simple', routerLink: [SVG_PATH, SVG_GCAB_PATH] },
              ]
            },
          ]
        },
        {
          label: 'Tables',
          sortChildren: true,
          items: [
            { label: 'Table', icon: 'fa-solid fa-star', routerLink: ['tables'] },
            { label: 'Editable Table', icon: 'fa-solid fa-star', routerLink: ['editable-table'] },
            { label: 'Prime Table', icon: 'fa-solid fa-star', routerLink: ['tables', 'prime'] },
            { label: 'Complex Table', icon: 'fa-solid fa-star', routerLink: ['tables', 'complex'] },
            { label: 'SignalR', icon: 'fa-solid fa-star', routerLink: ['tables', 'signalr'] },
            { label: 'Easy Table', icon: 'fa-solid fa-star', routerLink: ['tables', 'easy'] },
          ]
        },
        {
          label: 'Extras',
          sortChildren: true,
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
          sortChildren: true,
          items: [
            { label: 'Login', routerLink: ['login'] },
            { label: 'Error', routerLink: ['error'] },
            { label: 'Not Found', routerLink: ['notfound'] },
          ]
        },
        {
          label: 'Actions',
          sortChildren: true,
          items: [
            { label: 'Console Log', icon: 'fa-regular fa-circle', command: () => console.log('Console Log') },
            { label: 'Disabled with command', icon: 'pi pi-home', command: () => console.log('Console Log'), disabled: true },
            { label: 'Disabled with routerLink', icon: 'pi pi-home', routerLink: ['nested-routes'], disabled: true },
          ]
        },
        {
          label: 'Hierarchy',
          sortChildren: true,
          items: [
            {
              label: 'Multi-level 1', icon: 'pi pi-home', sortChildren: true, items: [
                { label: 'Login 1', icon: 'pi pi-home', routerLink: ['login'] },
                { label: 'Home', icon: 'pi pi-home', routerLink: ['home'] },
                { label: 'Details', icon: 'pi pi-home', routerLink: ['details'] },
                {
                  label: 'Multi-level 2', icon: 'pi pi-home', sortChildren: true, items: [
                    { label: 'Login 1', icon: 'pi pi-home', routerLink: ['login'] },
                    { label: 'Login 2', icon: 'pi pi-home', routerLink: ['login'] },
                  ]
                },
              ]
            },
            {
              label: 'Single', icon: 'pi pi-home'
            },
          ]
        },
        {
          label: 'Hierarchy 2',
          sortChildren: true,
          items: [
            {
              label: 'Multi-level 1', sortChildren: true, items: [
                { label: 'Login 1', routerLink: ['login'] },
                { label: 'Home',  routerLink: ['home'] },
              ]
            },
            {
              label: 'Single', icon: 'pi pi-home'
            },
          ]
        },
      ]);


      this.menuService.setProfile([
        {
          label: 'Profile',
          icon: 'pi pi-user',
          routerLink: ['/home'],
        },
        {
          label: 'Settings',
          icon: 'pi pi-cog',
          routerLink: ['/details'],
        },
        {
          label: 'Logout',
          icon: 'pi pi-power-off',
          routerLink: ['/login'],
        },
      ]);

      this.menuService.setNotifications([
        {
          summary: 'New Order',
          details: 'You have <strong>3</strong> new orders',
          icon: 'pi pi-shopping-cart',
          routerLink: ['/details'],
        },
        {
          summary: 'Withdrawn Completed',
          details: 'Funds are on their way',
          icon: 'pi pi-check-square',
          routerLink: ['/login'],
        }
      ]);

      // setTimeout(() => {
      //   this.store.dispatch(new ToastActions.Error('Erro aqui'));

      //   setTimeout(() => {
      //     this.store.dispatch(new ToastActions.Error('Erro aqui'));
      //   }, 1000);

      //   setTimeout(() => {
      //     this.store.dispatch(new ToastActions.Error('Erro aqui'));
      //   }, 5000);

      // }, 5000);

    });
  }

  public log(event: any): void {
    console.log(event);
  }

}