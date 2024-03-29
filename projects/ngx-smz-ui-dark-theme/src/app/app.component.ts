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
    this.boilerplateService.init(() => {
      this.menuService.setProfile([ { label: 'Logout', icon: 'pi pi-power-off', routerLink: ['/login'] } ]);
    });

    this.themeManager.createCss('assets/priority-styles.css');
    this.themeManager.createCss('assets/styles/custom-forms.css');
    this.themeManager.createCss('assets/styles/custom-layout.css');
  }

}