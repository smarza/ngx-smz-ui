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
        registerLogs: boolean;
    };
}
