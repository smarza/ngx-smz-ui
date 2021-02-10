import { Assistance } from '../core/models/assistance';
import { LayoutConfig } from '../core/models/layout';
import { LogoResource } from '../core/models/logo';
import { PagesConfig } from '../core/models/pages';

export class SmzLayoutsConfig
{
    debugMode?: boolean;
    appLogo: LogoResource;
    appName?: string;
    footerText?: string;
    layout?: LayoutConfig;
    pages?: PagesConfig;
    dialogs?: {
        closeAllAfterNavigate: boolean;
    };
    assistance?: Assistance;
    applicationActions?: {
        registerLogs: boolean;
    };
}
