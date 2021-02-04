import { Assistance } from '../core/models/assistance';
import { LayoutConfig } from '../core/models/layout';
import { SidebarViewdata } from '../features/assistance/sidebar-data';

export class SmzLayoutsConfig
{
    debugMode?: boolean;
    logoDark?: string;
    logoWhite?: string;

    layout?: LayoutConfig;

    dialogs?: {
        closeAllAfterNavigate: boolean;
    };
    assistance?: Assistance;

    applicationActions?: {
        registerLogs: boolean;
    };
}
