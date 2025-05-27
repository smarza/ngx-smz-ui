// logging.service.ts
import { Injectable, signal, computed, inject } from '@angular/core';
import { SMZ_LAYOUT_LOGGING_CONFIG } from './config/provide';
import { LoggingScope } from './logging-scope';
import { LoggingConfig } from './logging-config';

export interface ScopedLogger {
  log(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
  debug(message?: any, ...optionalParams: any[]): void;
}

@Injectable({ providedIn: 'root' })
export class LoggingService {
  private configFn = inject(SMZ_LAYOUT_LOGGING_CONFIG).logging as () => LoggingConfig;
  private enabled = signal<boolean>(this.configFn().enabled);

  // nível de each log: debug=0, info=1, warn=2, error=3
  private levelRank: Record<string, number> = { debug: 0, info: 1, warn: 2, error: 3 };

  /** expose current settings */
  public readonly isEnabled = computed(() => this.enabled());
  public readonly currentLevel = computed(() => this.configFn().level ?? 'debug');
  public readonly activeScopes = computed(() => this.configFn().restrictedScopes ?? []);

  /** toggle logging global */
  public enable(): void { this.enabled.set(true); }
  public disable(): void { this.enabled.set(false); }
  public toggle(): void { this.enabled.update(e => !e); }

  private shouldLog(
    method: 'debug' | 'info' | 'warn' | 'error',
    owner?: LoggingScope
  ): boolean {
    if (!this.enabled()) {
      return false;
    }
    const cfg = this.configFn();
    // nunca log de debug em produção
    if (cfg.production && method === 'debug') {
      return false;
    }
    // respeita nivel configurado
    const cfgLevel = cfg.level ?? 'debug';
    if (this.levelRank[method] < this.levelRank[cfgLevel]) {
      return false;
    }
    // respeita scopes se fornecido
    const scopes = cfg.restrictedScopes;
    if (scopes && scopes.length > 0 && owner) {
      if (!(scopes.includes(LoggingScope['*' as any]) || scopes.includes(owner))) {
        return false;
      }
    }
    return true;
  }

  public log(message?: any, ...optionalParams: any[]): void {
    if (!this.shouldLog('info')) return;
    console.log(message, ...optionalParams);
  }

  public warn(message?: any, ...optionalParams: any[]): void {
    if (!this.shouldLog('warn')) return;
    console.warn(message, ...optionalParams);
  }

  public error(message?: any, ...optionalParams: any[]): void {
    if (!this.shouldLog('error')) return;
    console.error(message, ...optionalParams);
  }

  public debug(message?: any, ...optionalParams: any[]): void {
    if (!this.shouldLog('debug')) return;
    console.debug(message, ...optionalParams);
  }

  /**
   * Retorna um logger com prefixo [owner] e restringe pelos scopes do config
   * owner agora é um LoggingScope
   */
  public scoped(owner: LoggingScope): ScopedLogger {
    const prefix = `[${owner}]`;
    return {
      log: (msg?: any, ...params: any[]) => {
        if (!this.shouldLog('info', owner)) return;
        console.log(prefix, msg, ...params);
      },
      warn: (msg?: any, ...params: any[]) => {
        if (!this.shouldLog('warn', owner)) return;
        console.warn(prefix, msg, ...params);
      },
      error: (msg?: any, ...params: any[]) => {
        if (!this.shouldLog('error', owner)) return;
        console.error(prefix, msg, ...params);
      },
      debug: (msg?: any, ...params: any[]) => {
        if (!this.shouldLog('debug', owner)) return;
        console.debug(prefix, msg, ...params);
      }
    };
  }
}
