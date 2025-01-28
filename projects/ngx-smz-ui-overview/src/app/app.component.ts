import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { MenuHelperService, ThemeManagerService, BoilerplateService, CLAIMS_PAGE_ROUTE, ROLES_PAGE_ROUTE, NewAthenaLayoutModule, RbkAccessControlModule, USERS_PAGE_ROUTE, UiDefinitionsDbActions } from 'ngx-smz-ui';
import { ProteusModule } from './ui/proteus/proteus.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,

    // Layout
    NewAthenaLayoutModule,

    // Shared Modules
    RbkAccessControlModule,
    ProteusModule
  ],
  template: `
<smz-ui-new-athena-layout [profile]="menuService.profile">
  <router-outlet></router-outlet>
  <ng-template pTemplate="headerExtras">
    <div class="col grid grid-nogutter items-center justify-start flex-nowrap gap-4">
      <div class="col">mega</div>
      <div>search</div>
      <div>uns</div>
    </div>
  </ng-template>
</smz-ui-new-athena-layout>
  `,
})
export class AppComponent {
  constructor(private store: Store, private boilerplateService: BoilerplateService, public menuService: MenuHelperService, private themeManager: ThemeManagerService) {

    this.boilerplateService.init(() => {
      this.themeManager.createCss('assets/priority-styles.css');

      this.menuService.setProfile([
        { label: 'Logout', icon: 'pi pi-power-off', routerLink: ['/login'] },
        // { label: 'Acessos', icon: 'fa-solid fa-circle', routerLink: CLAIMS_PAGE_ROUTE, claim: AuthClaimDefinitions.MANAGE_CLAIMS },
        // { label: 'Permissões', icon: 'fa-solid fa-circle', routerLink: ROLES_PAGE_ROUTE, claim: AuthClaimDefinitions.MANAGE_ROLES },
        { label: 'Permissões de Acesso', icon: 'fa-solid fa-circle', routerLink: CLAIMS_PAGE_ROUTE },
        { label: 'Regras de Acesso', icon: 'fa-solid fa-circle', routerLink: ROLES_PAGE_ROUTE },
        { label: 'Usuários', icon: 'fa-solid fa-users', routerLink: USERS_PAGE_ROUTE },
      ]);
    });
  }

}