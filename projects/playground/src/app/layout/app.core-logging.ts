import { signal, WritableSignal } from '@angular/core';
import { LoggingConfig, LoggingScope } from '@ngx-smz/core';
import { environment } from '@environments/environment';

export const appCoreLogging: WritableSignal<LoggingConfig> = signal<LoggingConfig>({
  enabled: true,
  production: environment.production,
  level: 'debug',
  scopes: [LoggingScope.None]
});