import { MenuType } from '../../core/models/menu-types';
import { SidebarState } from '../../core/models/sidebar-states';
import { HephaestusLayout } from './layout.config';

export const defaultHephaestusConfig: HephaestusLayout = {

    menu: MenuType.STATIC,
    sidebarState: SidebarState.ACTIVE,
    sidebarWidth: '16rem',
    sidebarSlimWidth: '6rem',
}
