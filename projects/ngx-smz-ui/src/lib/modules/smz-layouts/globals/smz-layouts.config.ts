import { Assistance } from '../core/models/assistance';
import { LayoutConfig } from '../core/models/layout';

export class SmzLayoutsConfig
{
    debugMode?: boolean;
    logoDark?: string;
    logoWhite?: string;
    appName?: string;
    footerText?: string;
    layout?: LayoutConfig;
    dialogs?: {
        closeAllAfterNavigate: boolean;
    };
    assistance?: Assistance;
    applicationActions?: {
        registerLogs: boolean;
    };
}
