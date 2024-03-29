import { MenuType } from '../../core/models/menu-types';
import { SidebarState } from '../../core/models/sidebar-states';
import { HephaestusLayout } from './layout.config';

export const defaultHephaestusConfig: HephaestusLayout = {

    menu: MenuType.STATIC,
    sidebarState: SidebarState.ACTIVE,
    mobileSidebarState: SidebarState.INACTIVE,
    sidebarWidth: '16rem',
    sidebarSlimWidth: '6rem',
    topbarMenuIcon: {
        toOpen: 'pi pi-chevron-right',
        toClose: 'pi pi-chevron-left'
    },
    enableNavigationBack: false
}
