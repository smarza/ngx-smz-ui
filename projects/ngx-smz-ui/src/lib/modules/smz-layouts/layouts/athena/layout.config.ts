import { MenuType } from '../../core/models/menu-types';
import { SidebarState } from '../../core/models/sidebar-states';

export class AthenaLayout {
    menu: AthenaMenuTypes;
    sidebarState: AthenaSidebarStates;
    mobileSidebarState: AthenaSidebarStates;
    sidebarWidth: string;
    sidebarSlimWidth: string;

}

export type AthenaMenuTypes = MenuType.STATIC | MenuType.OVERLAY | MenuType.SLIM | MenuType.HORIZONTAL;

export type AthenaSidebarStates = SidebarState.ACTIVE | SidebarState.INACTIVE;
