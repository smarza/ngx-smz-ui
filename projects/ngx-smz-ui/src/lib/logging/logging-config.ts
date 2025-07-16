import { LoggingScope } from './logging-scope';

export interface LoggingConfig {
  enabled: boolean;
  production?: boolean;
  level?: 'debug' | 'info' | 'warn' | 'error';
  restrictedScopes?: (LoggingScope | string)[];
}
