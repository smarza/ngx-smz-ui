import { signal, WritableSignal } from '@angular/core';
import { definePreset } from '@primeng/themes';
import { LayoutConfig } from '@ngx-smz/layout';
import Aura from '@primeng/themes/aura';

export const appLayout: WritableSignal<LayoutConfig> = signal<LayoutConfig>({
  preset: 'Aura',
  primary: 'orange',
  surface: null,
  darkTheme: false,
  menuMode: 'static'
});