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
    this.themeManager.createCss('assets/priority-styles.css');

    this.boilerplateService.init(() => {

      this.menuService.setMenu([
        // { label: 'Title 1', hideSeparator: true, showAsCaption: true },
        // { label: 'Log', command: () => { console.log(55555); }, claims: [], hideSeparator: true },
        // { label: 'Automação de Fluxo', routerLink: [''], claims: [] },
        // { label: 'Title 2', hideSeparator: true, showAsCaption: true },
        // { label: 'Log', command: () => { console.log(55555); }, claims: [], hideSeparator: true },
        // { label: 'Automação de Fluxo', routerLink: [''], claims: [] },
        {
          label: 'Topside',
          items: [
            { label: 'Inspeções', icon: 'fa-solid fa-circle text-xs', command: () => { console.log(55555); }, claims: [] },
            { label: 'Offline', icon: 'fa-solid fa-circle text-xs', routerLink: [''], claims: [] },
          ]
        },
        {
          label: 'Hull',
          items: [
            { label: 'Inspeções', command: () => { console.log(55555); }, claims: [] },
            { label: 'Offline', routerLink: [''], claims: [] },
          ]
        },
        {
          label: 'Administrativo',
          items: [
            { label: 'Log', command: () => { console.log(55555); }, claims: [] },
            { label: 'Automação de Fluxo', routerLink: [''], claims: [] },
          ]
        },
      ]);

      this.menuService.setProfile([
        { label: 'Logout', icon: 'pi pi-power-off', routerLink: ['/login'] }
      ]);
    });

  }

}