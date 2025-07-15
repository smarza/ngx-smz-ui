/*
 * Public API Surface of ngx-smz-ui-layout
 */

export * from './lib/layout/component/app.layout';
export * from './lib/config';

export type { Footer } from './lib/layout/component/app.footer';
export type { Topbar } from './lib/layout/component/app.topbar';

export { AppFloatingConfigurator } from './lib/layout/component/app.floatingconfigurator';

export { AccessPageComponent } from './lib/errors/access';
export { ErrorPageComponent } from './lib/errors/error';
export { NotfoundPageComponent } from './lib/errors/notfound';
export { ErrorsRoutes } from './lib/errors/errors.routes';
export { ErrorPagesConfigService } from './lib/errors/errors-pages-service';

export { LayoutService } from './lib/layout/service/layout.service';
export type { LayoutConfig, LayoutState } from './lib/layout/service/layout.service';

// LOGGING
export * from './lib/logging/config';
export type { ScopedLogger } from'./lib/logging/logging.service';
export { LoggingService } from './lib/logging/logging.service';
export { LoggingScope } from './lib/logging/logging-scope';
export type { LoggingConfig } from './lib/logging/logging-config';
