import { signal, WritableSignal } from '@angular/core';
import { LayoutConfig } from '@ngx-smz/layout';

export const appLayout: WritableSignal<LayoutConfig> = signal<LayoutConfig>({
  preset: 'Aura',
  primary: 'orange',
  surface: null,
  darkTheme: false,
  menuMode: 'static'
});