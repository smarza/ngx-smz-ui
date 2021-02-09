import { Assistance } from '../core/models/assistance';
import { LayoutConfig } from '../core/models/layout';
import { LogoResource } from '../core/models/logo';

export class SmzLayoutsConfig
{
    debugMode?: boolean;
    appLogo: LogoResource;
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
