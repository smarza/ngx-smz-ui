import { MenuType } from '../../core/models/menu-types';
import { SidebarState } from '../../core/models/sidebar-states';

export class NewAthenaLayout {
    menu: NewAthenaMenuTypes;
    sidebarState: NewAthenaSidebarStates;
    mobileSidebarState: NewAthenaSidebarStates;
    sidebarWidth: string;
    sidebarSlimWidth: string;
    enlargeTopbarLogo?: boolean;

}

export type NewAthenaMenuTypes = MenuType.STATIC | MenuType.OVERLAY | MenuType.SLIM | MenuType.HORIZONTAL;

export type NewAthenaSidebarStates = SidebarState.ACTIVE | SidebarState.INACTIVE;
