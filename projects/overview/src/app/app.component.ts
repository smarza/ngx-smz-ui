import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { MenuHelperService, ThemeManagerService, BoilerplateService, CLAIMS_PAGE_ROUTE, ROLES_PAGE_ROUTE, NewAthenaLayoutModule, RbkAccessControlModule, USERS_PAGE_ROUTE } from 'ngx-smz-ui';
import { ProteusModule } from './ui/proteus/proteus.module';
import { ButtonModule } from 'primeng/button';
import { updatePreset, usePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import Nora from '@primeng/themes/nora';

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
    ProteusModule,
    ButtonModule
  ],
  template: `
<smz-ui-new-athena-layout [profile]="menuService.profile">
  <router-outlet></router-outlet>
  <ng-template pTemplate="headerExtras">
    <div class="col grid grid-nogutter items-center justify-start flex-nowrap gap-4">
      <div class="col">mega</div>
      <div>search</div>
      <div>uns</div>
      <button pButton type="button" label="Nora Theme" (click)="changeThemeToNora()"></button>
      <button pButton type="button" label="Aura Theme" (click)="changeThemeToAura()"></button>
      <button pButton type="button" label="Change Primary Color" (click)="changePrimaryColor()"></button>
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
        { label: 'Permissões de Acesso', icon: 'fa-solid fa-circle', routerLink: CLAIMS_PAGE_ROUTE },
        { label: 'Regras de Acesso', icon: 'fa-solid fa-circle', routerLink: ROLES_PAGE_ROUTE },
        { label: 'Usuários', icon: 'fa-solid fa-users', routerLink: USERS_PAGE_ROUTE },
      ]);
    });
  }

  changeThemeToNora() {
    console.log('changeThemeToNora');
    usePreset(Nora);
  }

  changeThemeToAura() {
    console.log('changeThemeToAura');
    usePreset(Aura);
  }

  changePrimaryColor() {
    updatePreset({
        semantic: {
            primary: {
                50: '{indigo.50}',
                100: '{indigo.100}',
                200: '{indigo.200}',
                300: '{indigo.300}',
                400: '{indigo.400}',
                500: '{indigo.500}',
                600: '{indigo.600}',
                700: '{indigo.700}',
                800: '{indigo.800}',
                900: '{indigo.900}',
                950: '{indigo.950}'
            }
        }
    })
}

}