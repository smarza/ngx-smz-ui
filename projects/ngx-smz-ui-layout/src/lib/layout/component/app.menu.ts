import { Component, inject, WritableSignal } from '@angular/core';

import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { SMZ_UI_LAYOUT_CONFIG } from '../../config/provide';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
          @for (item of model(); track item; let i = $index) {
            @if (!item.separator && hasClaim(item['claims'])) {
              <li app-menuitem [item]="item" [index]="i" [root]="true"></li>
            }
            @if (item.separator) {
              <li class="menu-separator"></li>
            }
          }
        </ul>`
})
export class AppMenu {
    public model: WritableSignal<MenuItem[]> = inject(SMZ_UI_LAYOUT_CONFIG).sidebar;
    public hasClaim = inject(SMZ_UI_LAYOUT_CONFIG).hasClaim;
}
