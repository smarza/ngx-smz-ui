import { SmzLayoutsConfig } from './smz-layouts.config';

export const defaultSmzLayoutsConfig: SmzLayoutsConfig = {

    debugMode: true,
    logoPath: '',
    uiLayouts: {
        topBar: 'none',
        sideBar: 'none',
    },
    dialogs: {
        closeAllAfterNavigate: true,
    },
    applicationActions: {
        useLogs: true,
    }
}
