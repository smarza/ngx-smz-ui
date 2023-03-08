import { NgxRbkUtilsConfig } from './modules/rbk-utils/ngx-rbk-utils.config';
import { SmzDialogsConfig } from './modules/smz-dialogs/smz-dialogs.config';
import { SmzLayoutsConfig } from './modules/smz-layouts/core/globals/smz-layouts.config';

export class NgxSmzUiConfig {
    public debugMode: boolean;
    public rbkUtils: NgxRbkUtilsConfig;
    public dialogs: SmzDialogsConfig;
    public layouts: SmzLayoutsConfig;
    public locale: SmzLocaleConfig;
}

export interface SmzLocaleConfig {
    code: "pt-BR" | "en-US";
    authorization: {
        tenant: {
            displayName: string;
        }
    }
};