import { SmzLoader } from './loaders';
import { DiamondMenuTypes } from './menu-types';
import { DiamondSidebarStates } from './sidebar-states';

export type SmzLayout = DiamondLayout;

export interface DiamondLayout {
    menu: DiamondMenuTypes;
    sidebarState: DiamondSidebarStates;
    sidebarWidth: string;
    sidebarSlimWidth: string;

}

export interface LayoutState {
    wrapperClass: string;
    isOverlayVisible: boolean;
    topbarTitle: string;
    appName: string;
    footerText: string;
    contentTone: ThemeToneType;
    layoutTone: ThemeToneType;
}

export interface LoaderData {
    type: SmzLoader;
    title: string;
    message: string;
}

export type ThemeToneType = 'light' | 'dark';
