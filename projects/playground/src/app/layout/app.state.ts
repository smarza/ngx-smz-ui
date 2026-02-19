import { signal, WritableSignal } from '@angular/core';
import { LayoutState } from '@ngx-smz/layout';

export const appLayoutState: WritableSignal<LayoutState> = signal<LayoutState>({
  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  configSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false
});