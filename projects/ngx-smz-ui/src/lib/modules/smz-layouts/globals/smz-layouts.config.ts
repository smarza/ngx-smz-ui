export class SmzLayoutsConfig
{
    debugMode?: boolean;
    logoDark?: string;
    logoWhite?: string;

    uiLayouts?: {
        topBar: 'none';
        sideBar: 'none';
    };

    dialogs?: {
        closeAllAfterNavigate: boolean;
    };

    applicationActions?: {
        registerLogs: boolean;
    };
}
