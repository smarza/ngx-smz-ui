import { signal, WritableSignal } from '@angular/core';
import { LoggingConfig, LoggingScope } from '@ngx-smz/layout';
import { environment } from '@environments/environment';

export const appLayoutLogging: WritableSignal<LoggingConfig> = signal<LoggingConfig>({
  enabled: true,
  production: environment.production,
  level: 'debug',
  scopes: [LoggingScope.NavigationService, LoggingScope.PageTitleService]
});