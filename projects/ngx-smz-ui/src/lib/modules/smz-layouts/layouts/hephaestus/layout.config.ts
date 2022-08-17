import { MenuType } from '../../core/models/menu-types';
import { SidebarState } from '../../core/models/sidebar-states';

export class HephaestusLayout {
    menu: HephaestusMenuTypes;
    sidebarState: HephaestusSidebarStates;
    mobileSidebarState: HephaestusSidebarStates;
    sidebarWidth: string;
    sidebarSlimWidth: string;
    topbarMenuIcon?: {
        toClose: string,
        toOpen: string
    };

    enableNavigationBack?: boolean;

}

export type HephaestusMenuTypes = MenuType.STATIC | MenuType.OVERLAY | MenuType.SLIM;

export type HephaestusSidebarStates = SidebarState.ACTIVE | SidebarState.INACTIVE;

