import { EnvironmentProviders, inject, InjectionToken, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { SmzEnvironment, SmzEnvironmentConfigType } from './config';

export const SMZ_UI_ENVIRONMENT_CONFIG = new InjectionToken<SmzEnvironmentConfigType>('SMZ_UI_ENVIRONMENT_CONFIG');

export function provideSmzEnvironment(...features: SmzEnvironmentConfigType[]): EnvironmentProviders {
    const providers = features?.map((feature) => ({
        provide: SMZ_UI_ENVIRONMENT_CONFIG,
        useValue: feature,
        multi: false
    }));

    const initializer = provideAppInitializer(() => {
        const SmzEnvironmentConfig = inject(SmzEnvironment);
        features?.forEach((feature) => SmzEnvironmentConfig.setConfig(feature));
        return;
    });

    return makeEnvironmentProviders([...providers, initializer]);
}
