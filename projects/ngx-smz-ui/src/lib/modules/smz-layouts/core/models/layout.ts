import { SmzMenuTypes } from './menu-types';
import { SmzSidebarStates } from './sidebar-states';
import { SmzContentTheme, SmzLayoutTheme } from './themes';

export interface LayoutConfig {
    layoutTheme: SmzLayoutTheme | string;
    contentTheme: SmzContentTheme;
    menuType: SmzMenuTypes;
    sidebarState: SmzSidebarStates;
}

export interface LayoutState {
    wrapperClass: string;
    isOverlayVisible: boolean;
}
