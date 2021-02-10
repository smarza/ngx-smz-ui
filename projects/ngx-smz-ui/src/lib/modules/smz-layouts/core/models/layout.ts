import { SmzLoader } from './loaders';
import { SmzMenuTypes } from './menu-types';
import { SmzSidebarStates } from './sidebar-states';
import { SmzContentTheme, SmzLayoutTheme } from './themes';

export interface LayoutConfig {
    layoutTheme: SmzLayoutTheme;
    contentTheme: SmzContentTheme;
    menuType: SmzMenuTypes;
    sidebarState: SmzSidebarStates;
    loader: LoaderData;
    sidebarWidth: string;
    sidebarSlimWidth: string;
}

export interface LayoutState {
    wrapperClass: string;
    isOverlayVisible: boolean;
    topbarTitle: string;
    appName: string;
    footerText: string;
    themeTone: 'light' | 'dark'
}

export interface LoaderData {
    type: SmzLoader;
    title: string;
    message: string;
}
