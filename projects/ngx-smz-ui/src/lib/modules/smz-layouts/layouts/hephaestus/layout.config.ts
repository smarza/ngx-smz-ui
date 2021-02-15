import { MenuType } from '../../core/models/menu-types';
import { SidebarState } from '../../core/models/sidebar-states';

export class HephaestusLayout {
    menu: HephaestusMenuTypes;
    sidebarState: HephaestusSidebarStates;
    sidebarWidth: string;
    sidebarSlimWidth: string;

}

export type HephaestusMenuTypes = MenuType.STATIC | MenuType.OVERLAY | MenuType.SLIM;

export type HephaestusSidebarStates = SidebarState.ACTIVE | SidebarState.INACTIVE;
