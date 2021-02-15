// CONFIG
export * from './core/globals/smz-layouts.config';

// MODELS
export * from './core/models/layout';
export * from './core/models/logo';
export * from './core/models/menu-types';
export * from './core/models/positions';
export * from './core/models/route-layout-data';
export * from './core/models/sidebar-states';
export * from './core/models/color-schemas';
export * from './core/models/notifications';
export * from './core/models/action-link';

export { SmzLoader, SmzLoaders } from './core/models/loaders';
export * from './core/models/themes';

// MODULES
export * from './ngx-smz-layouts.module';

// STATES
export { UiActions } from './core/state/ui/ui.actions';
export { UiSelectors } from './core/state/ui/ui.selectors';

// DIAMOND LAYOUT MODULE
export * from './layouts/diamond/diamond-layout.module';
export * from './layouts/diamond/diamond-layout.component';
export * from './layouts/diamond/layout.config';

// APOLLO LAYOUT MODULE
export * from './layouts/apollo/apollo-layout.module';
export * from './layouts/apollo/apollo-layout.component';
export * from './layouts/apollo/layout.config';