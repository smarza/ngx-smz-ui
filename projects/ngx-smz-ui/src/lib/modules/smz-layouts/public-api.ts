// CONFIG
export * from './core/globals/smz-layouts.config';

// MODELS
export * from './core/models/layout';
export * from './core/models/logo';
export * from './core/models/menu-types';
export * from './core/models/positions';
export * from './core/models/route-layout-data';
export * from './core/models/sidebar-states';

export { ColorSchema, ColorSchemaDefinition, SmzColorSchemas } from './core/models/color-schemas';

// -------------------------------------------------------
// EXPORT COM PROBLEMAS
// -------------------------------------------------------
// export * from './core/models/color-schemas';

// WARNING: Conflicting namespaces: "dist/ngx-smz-ui/esm2015/public-api.js" re-exports "ɵ0" from both "dist/ngx-smz-ui/esm2015/lib/modules/smz-dialogs/services/smz-dialogs.service.js" and "dist/ngx-smz-ui/esm2015/lib/modules/smz-layouts/core/models/color-schemas.js" (will be ignored)
// WARNING: Conflicting namespaces: "dist/ngx-smz-ui/esm2015/public-api.js" re-exports "ɵ1" from both "dist/ngx-smz-ui/esm2015/lib/modules/smz-dialogs/services/smz-dialogs.service.js" and "dist/ngx-smz-ui/esm2015/lib/modules/smz-layouts/core/models/color-schemas.js" (will be ignored)
// WARNING: Conflicting namespaces: "dist/ngx-smz-ui/esm2015/public-api.js" re-exports "ɵ2" from both "dist/ngx-smz-ui/esm2015/lib/modules/smz-dialogs/services/smz-dialogs.service.js" and "dist/ngx-smz-ui/esm2015/lib/modules/smz-layouts/core/models/color-schemas.js" (will be ignored)

// color-schemas.js       >>> export { ɵ0, ɵ1, ɵ2, ɵ3 };
// smz-dialogs.service.js >>> export { ɵ0, ɵ1, ɵ2 };
// -------------------------------------------------------

export * from './core/models/notifications';
export * from './core/models/action-link';
export * from './core/models/menu-creation';

export { SmzLoader, SmzLoaders } from './core/models/loaders';
export { SmzContentTheme, SmzContentThemes, ContentTheme } from './core/models/themes';

// MODULES
export * from './ngx-smz-layouts.module';

// SERVICES
export * from './core/services/menu-helper-service';
export * from './features/theme-manager/theme-manager.service';

// STATES
export { UiActions } from './core/state/ui/ui.actions';
export { UiSelectors } from './core/state/ui/ui.selectors';

// DIAMOND LAYOUT MODULE
export * from './layouts/hephaestus/layout.module';
export * from './layouts/hephaestus/layout.component';
export * from './layouts/hephaestus/layout.config';

// APOLLO LAYOUT MODULE
export * from './layouts/athena/layout.module';
export * from './layouts/athena/layout.component';
export * from './layouts/athena/layout.config';