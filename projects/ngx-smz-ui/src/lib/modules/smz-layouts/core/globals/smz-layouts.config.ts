import { Assistance } from '../models/assistance';
import { ColorSchemaDefinition } from '../models/color-schemas';
import { SmzFooter } from '../models/footer';
import { LoaderData } from '../models/layout';
import { LogoResource } from '../models/logo';
import { PagesConfig } from '../models/pages';
import { EdgePositionType } from '../models/positions';
import { SmzContentTheme } from '../models/themes';

export class SmzLayoutsConfig {
    debugMode?: boolean;
    appLogo: LogoResource;
    appName?: string;
    footer: SmzFooter;
    usernameProperty: string;
    useAvatar?: boolean;
    avatarProperty?: string;
    profileMessage?: string;
    themes: {
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
    /**
     * Flag para indicar se a store de UI deverá atualizar as atividades de entrada e saída do mouse na aplicação
     */
    monitoreMouseEvents?: boolean;
}
