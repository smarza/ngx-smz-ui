import { SidebarViewdata } from '../../features/assistance/sidebar-data';

export interface Assistance
{
    isEnabled: boolean;
    isVisible?: boolean;
    sidebarData?: SidebarViewdata;
}