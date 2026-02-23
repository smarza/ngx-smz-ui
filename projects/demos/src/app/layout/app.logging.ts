import { signal, WritableSignal } from '@angular/core';
import { LoggingConfig as LoggingConfigCore, LoggingScope as LoggingScopeCore } from '@ngx-smz/core';
import { LoggingConfig as LoggingConfigLayout, LoggingScope as LoggingScopeLayout } from '@ngx-smz/layout';

export const appLoggingCore: WritableSignal<LoggingConfigCore> = signal<LoggingConfigCore>({
  enabled: true,
  production: false,
  level: 'debug',
  restrictedScopes: [LoggingScopeCore.None]
});

export const appLoggingLayout: WritableSignal<LoggingConfigLayout> = signal<LoggingConfigLayout>({
  enabled: true,
  production: false,
  level: 'debug',
  restrictedScopes: [LoggingScopeLayout.NavigationService, LoggingScopeLayout.PageTitleService]
});