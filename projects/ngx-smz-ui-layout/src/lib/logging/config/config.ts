import { Injectable, signal, WritableSignal } from '@angular/core';
import { LoggingConfig } from '../logging-config';
export type SmzLayoutLoggingConfigType = {
    logging: WritableSignal<LoggingConfig>;
};

@Injectable({ providedIn: 'root' })
export class SmzLayoutLogging {
    logging = signal<LoggingConfig>({
      enabled: false,
      production: false,
      level: 'debug',
      restrictedScopes: []
    });

    setConfig(config: SmzLayoutLoggingConfigType): void {
        const { logging } = config || {};

        if (logging) {
            this.logging = logging;
        };
    }
}
