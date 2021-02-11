import { MenuType } from '../../core/models/menu-types';
import { SidebarState } from '../../core/models/sidebar-states';

export class ApolloLayout {
    menu: ApolloMenuTypes;
    sidebarState: ApolloSidebarStates;
    sidebarWidth: string;
    sidebarSlimWidth: string;

}

export type ApolloMenuTypes = MenuType.STATIC | MenuType.OVERLAY | MenuType.SLIM | MenuType.HORIZONTAL;

export type ApolloSidebarStates = SidebarState.ACTIVE | SidebarState.INACTIVE;
