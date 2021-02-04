import { SmzMenuTypes } from './menu-types';
import { SmzSidebarStates } from './sidebar-states';
import { SmzThemeTypes } from './themes';

export interface LayoutConfig {
    theme: SmzThemeTypes | string;
    menuType: SmzMenuTypes;
    sidebarState: SmzSidebarStates;
}

export interface LayoutState {
    wrapperClass: string;
}
