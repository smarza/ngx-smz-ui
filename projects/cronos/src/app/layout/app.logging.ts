import { signal, WritableSignal } from '@angular/core';
import { LoggingConfig as LoggingConfigCore, LoggingScope as LoggingScopeCore } from '@ngx-smz/core';
import { LoggingConfig as LoggingConfigLayout, LoggingScope as LoggingScopeLayout } from '@ngx-smz/layout';
import { environment } from '@environments/environment';

export const appLoggingCore: WritableSignal<LoggingConfigCore> = signal<LoggingConfigCore>({
  enabled: false,
  production: environment.production,
  level: 'debug',
  restrictedScopes: [LoggingScopeCore.None]
});

export const appLoggingLayout: WritableSignal<LoggingConfigLayout> = signal<LoggingConfigLayout>({
  enabled: false,
  production: environment.production,
  level: 'debug',
  restrictedScopes: [LoggingScopeLayout.NavigationService, LoggingScopeLayout.PageTitleService]
});