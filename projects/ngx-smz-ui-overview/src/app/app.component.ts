import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { MenuHelperService, ThemeManagerService, BoilerplateService, CLAIMS_PAGE_ROUTE, ROLES_PAGE_ROUTE, AuthClaimDefinitions } from 'ngx-smz-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private store: Store, private boilerplateService: BoilerplateService, public menuService: MenuHelperService, private themeManager: ThemeManagerService) {
    this.boilerplateService.init(() => {
      this.themeManager.createCss('assets/priority-styles.css');

      this.menuService.setProfile([
        { label: 'Logout', icon: 'pi-power-off', routerLink: ['/login'] },
        // { label: 'Acessos', icon: 'fa-solid fa-circle', routerLink: CLAIMS_PAGE_ROUTE, claim: AuthClaimDefinitions.MANAGE_CLAIMS },
        // { label: 'Permissões', icon: 'fa-solid fa-circle', routerLink: ROLES_PAGE_ROUTE, claim: AuthClaimDefinitions.MANAGE_ROLES },
        { label: 'Acessos', icon: 'fa-solid fa-circle', routerLink: CLAIMS_PAGE_ROUTE },
        { label: 'Permissões', icon: 'fa-solid fa-circle', routerLink: ROLES_PAGE_ROUTE },
      ]);
    });
  }

}