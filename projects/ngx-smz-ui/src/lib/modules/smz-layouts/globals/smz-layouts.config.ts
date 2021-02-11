import { Assistance } from '../core/models/assistance';
import { LoaderData, SmzLayout } from '../core/models/layout';
import { LogoResource } from '../core/models/logo';
import { PagesConfig } from '../core/models/pages';
import { EdgePositionType } from '../core/models/positions';
import { SmzContentTheme, SmzLayoutTheme } from '../core/models/themes';

export class SmzLayoutsConfig {
    debugMode?: boolean;
    appLogo: LogoResource;
    appName?: string;
    footerText?: string;
    layout?: SmzLayout;
    themes: {
        layout: SmzLayoutTheme;
        content: SmzContentTheme;
    };
    toast: {
        position: EdgePositionType;
    };
    loader: LoaderData;
    pages?: PagesConfig;
    dialogs?: {
        closeAllAfterNavigate: boolean;
    };
    assistance?: Assistance;
    applicationActions?: {
        registerLogs: boolean;
    };
}
