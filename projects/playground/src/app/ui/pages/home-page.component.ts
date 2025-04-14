import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { TenantsSelectors } from '@ngx-smz/core';
import { SMZ_UI_LAYOUT_CONFIG } from '@ngx-smz/layout';
import { ButtonModule } from 'primeng/button';
@Component({
    selector: 'app-home-page',
    imports: [ButtonModule],
    template: `
        <h1>Home Page</h1>
        <button pButton type="button" label="Toggle Menu Visibility" (click)="toggleMenuVisibility()"></button>
    `
})
export class HomePageComponent {
  private readonly store = inject(Store);
    private readonly smzUILayoutConfig = inject(SMZ_UI_LAYOUT_CONFIG);

    toggleMenuVisibility() {
        this.smzUILayoutConfig.topbar.update((state) => ({ ...state, showMenuToggle: !state.showMenuToggle }));
        const tenant = this.store.selectSnapshot(TenantsSelectors.currentTenant);
        console.log(tenant);
    }

}