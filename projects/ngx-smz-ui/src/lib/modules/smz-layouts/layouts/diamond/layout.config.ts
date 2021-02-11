import { MenuType } from '../../core/models/menu-types';
import { SidebarState } from '../../core/models/sidebar-states';

export class DiamondLayout {
    menu: DiamondMenuTypes;
    sidebarState: DiamondSidebarStates;
    sidebarWidth: string;
    sidebarSlimWidth: string;

}

export type DiamondMenuTypes = MenuType.STATIC | MenuType.OVERLAY | MenuType.SLIM;

export type DiamondSidebarStates = SidebarState.ACTIVE | SidebarState.INACTIVE;
