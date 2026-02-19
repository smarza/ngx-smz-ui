import { EnvironmentProviders, inject, InjectionToken, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { SmzLayoutLogging, SmzLayoutLoggingConfigType } from './config';

export const SMZ_LAYOUT_LOGGING_CONFIG = new InjectionToken<SmzLayoutLoggingConfigType>('SMZ_LAYOUT_LOGGING_CONFIG');

export function provideSmzLayoutLogging(initializers: (() => SmzLayoutLoggingConfigType[])): EnvironmentProviders {
  const features = initializers();

  const providers = features?.map((feature) => ({
      provide: SMZ_LAYOUT_LOGGING_CONFIG,
      useValue: feature,
      multi: false
  }));

  const initializer = provideAppInitializer(() => {
      const SmzLayoutLoggingConfig = inject(SmzLayoutLogging);
      features?.forEach((feature) => SmzLayoutLoggingConfig.setConfig(feature));
      return;
  });

  return makeEnvironmentProviders([...providers, initializer]);
}
