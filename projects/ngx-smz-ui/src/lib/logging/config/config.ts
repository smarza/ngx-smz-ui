import { Injectable, signal, WritableSignal } from '@angular/core';
import { LoggingConfig } from '../logging-config';
export type SmzCoreLoggingConfigType = {
    logging: WritableSignal<LoggingConfig>;
};

@Injectable({ providedIn: 'root' })
export class SmzCoreLogging {
    logging = signal<LoggingConfig>({
      enabled: false,
      production: false,
      level: 'debug',
      scopes: []
    });

    setConfig(config: SmzCoreLoggingConfigType): void {
        const { logging } = config || {};

        if (logging) {
            this.logging = logging;
        };
    }
}
