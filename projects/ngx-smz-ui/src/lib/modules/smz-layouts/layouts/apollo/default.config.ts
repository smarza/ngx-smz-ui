import { MenuType } from '../../core/models/menu-types';
import { SidebarState } from '../../core/models/sidebar-states';
import { ApolloLayout } from './layout.config';

export const defaultApolloConfig: ApolloLayout = {

    menu: MenuType.STATIC,
    sidebarState: SidebarState.ACTIVE,
    mobileSidebarState: SidebarState.INACTIVE,
    sidebarWidth: '16rem',
    sidebarSlimWidth: '6rem',
}
