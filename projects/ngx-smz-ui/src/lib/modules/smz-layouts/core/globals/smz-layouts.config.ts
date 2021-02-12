import { Assistance } from '../models/assistance';
import { ColorSchemaDefinition } from '../models/color-schemas';
import { LoaderData } from '../models/layout';
import { LogoResource } from '../models/logo';
import { PagesConfig } from '../models/pages';
import { EdgePositionType } from '../models/positions';
import { SmzContentTheme, SmzLayoutTheme } from '../models/themes';

export class SmzLayoutsConfig {
    debugMode?: boolean;
    appLogo: LogoResource;
    appName?: string;
    footerText?: string;
    themes: {
        layout: SmzLayoutTheme;
        content: SmzContentTheme;
        schema: ColorSchemaDefinition;
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
