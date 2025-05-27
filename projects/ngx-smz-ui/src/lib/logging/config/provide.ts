import { EnvironmentProviders, inject, InjectionToken, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { SmzCoreLogging, SmzCoreLoggingConfigType } from './config';

export const SMZ_CORE_LOGGING_CONFIG = new InjectionToken<SmzCoreLoggingConfigType>('SMZ_CORE_LOGGING_CONFIG');

export function provideSmzCoreLogging(initializers: (() => SmzCoreLoggingConfigType[])): EnvironmentProviders {
  const features = initializers();

  const providers = features?.map((feature) => ({
      provide: SMZ_CORE_LOGGING_CONFIG,
      useValue: feature,
      multi: false
  }));

  const initializer = provideAppInitializer(() => {
      const SmzCoreLoggingConfig = inject(SmzCoreLogging);
      features?.forEach((feature) => SmzCoreLoggingConfig.setConfig(feature));
      return;
  });

  return makeEnvironmentProviders([...providers, initializer]);
}
