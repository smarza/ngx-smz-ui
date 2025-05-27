import { Injectable, signal, WritableSignal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Footer } from '../layout/component/app.footer';
import { Topbar } from '../layout/component/app.topbar';
import { LayoutConfig, LayoutState } from '../layout/service/layout.service';
export type SmzUILayoutConfigType = {
    sidebar: WritableSignal<MenuItem[]>;
    footer: WritableSignal<Footer>;
    topbar: WritableSignal<Topbar>;
    layout: WritableSignal<LayoutConfig>;
    state: WritableSignal<LayoutState>;
    hasClaim?: (claims: string[]) => boolean;
};

@Injectable({ providedIn: 'root' })
export class SmzUILayout {
    hasClaim = (claims: string[]) => false;
    sidebar = signal<MenuItem[]>([]);
    footer = signal<Footer>({});
    topbar = signal<Topbar>({
        showMenuToggle: true,
        showBackButton: true,
    });
    layout = signal<LayoutConfig>({
      preset: 'Aura',
      primary: 'orange',
      surface: null,
      darkTheme: false,
      menuMode: 'static'
  });
    state = signal<LayoutState>({
      staticMenuDesktopInactive: false,
      overlayMenuActive: false,
      configSidebarVisible: false,
      staticMenuMobileActive: false,
      menuHoverActive: false
    });

    setConfig(config: SmzUILayoutConfigType): void {
        const { sidebar, footer, topbar, hasClaim } = config || {};

        if (sidebar) {
            this.sidebar = sidebar;
        };

        if (footer) {
            this.footer = footer;
        };

        if (topbar) {
            this.topbar = topbar;
        };

        if (hasClaim) {
            this.hasClaim = hasClaim;
        };
    }
}
