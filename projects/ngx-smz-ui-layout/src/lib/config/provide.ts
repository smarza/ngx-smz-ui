import { EnvironmentProviders, inject, InjectionToken, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { SmzUILayout, SmzUILayoutConfigType } from './config';

export const SMZ_UI_LAYOUT_CONFIG = new InjectionToken<SmzUILayoutConfigType>('SMZ_UI_LAYOUT_CONFIG');

export function provideSmzUILayout(initializers: (() => SmzUILayoutConfigType[])): EnvironmentProviders {
  const features = initializers();

  const providers = features?.map((feature) => ({
      provide: SMZ_UI_LAYOUT_CONFIG,
      useValue: feature,
      multi: false
  }));

  const initializer = provideAppInitializer(() => {
      const SmzUILayoutConfig = inject(SmzUILayout);
      features?.forEach((feature) => SmzUILayoutConfig.setConfig(feature));
      return;
  });

  return makeEnvironmentProviders([...providers, initializer]);
}
