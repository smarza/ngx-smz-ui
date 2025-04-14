import { MenuType } from '../../core/models/menu-types';
import { SidebarState } from '../../core/models/sidebar-states';
import { AthenaLayout } from './layout.config';

export const defaultAthenaConfig: AthenaLayout = {

    menu: MenuType.STATIC,
    sidebarState: SidebarState.ACTIVE,
    mobileSidebarState: SidebarState.INACTIVE,
    sidebarWidth: '16rem',
    sidebarSlimWidth: '6rem',
    enlargeTopbarLogo: false
}
