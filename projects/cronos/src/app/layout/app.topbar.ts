import { signal, WritableSignal } from '@angular/core';
import { SmzTenantSwitchComponent } from '@ngx-smz/core';
import { Topbar } from '@ngx-smz/layout';

export const appTopbar: WritableSignal<Topbar> = signal<Topbar>({
  showMenuToggle: true,
  logoPath: {
    light: 'assets/images/logos/horizontal-light.svg',
    dark: 'assets/images/logos/horizontal-dark.svg'
  },
  appName: undefined,
  showConfigurator: false,
  showDarkModeToggle: true,
  features: [],
  menuItems: [
    {
      component: {
        component: SmzTenantSwitchComponent,
        inputs: [],
        outputs: []
      }
    }
  ]
})