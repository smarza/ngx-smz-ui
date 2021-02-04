import { SmzLayoutsConfig } from './smz-layouts.config';

export const defaultSmzLayoutsConfig: SmzLayoutsConfig = {

    debugMode: true,
    logoDark: '',
    logoWhite: '',
    uiLayouts: {
        topBar: 'none',
        sideBar: 'none',
    },
    dialogs: {
        closeAllAfterNavigate: true,
    },
    applicationActions: {
        registerLogs: true,
    }
}
