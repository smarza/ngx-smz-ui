import { NgxRbkUtilsConfig } from 'ngx-rbk-utils';

export class SmzLayoutsConfig
{
    debugMode?: boolean;
    logoPath?: string;

    uiLayouts?: {
        topBar: 'none';
        sideBar: 'none';
    };

    dialogs?: {
        closeAllAfterNavigate: boolean;
    };

    applicationActions?: {
        useLogs: boolean;
    };

    // rbkConfig?: NgxRbkUtilsConfig;
}
