import { MenuType } from '../../core/models/menu-types';
import { SidebarState } from '../../core/models/sidebar-states';
import { DiamondLayout } from './layout.config';

export const defaultDiamondConfig: DiamondLayout = {

    menu: MenuType.STATIC,
    sidebarState: SidebarState.ACTIVE,
    sidebarWidth: '16rem',
    sidebarSlimWidth: '6rem',
}
