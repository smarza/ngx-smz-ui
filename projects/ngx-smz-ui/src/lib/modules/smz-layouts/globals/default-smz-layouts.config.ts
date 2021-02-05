import { SmzMenuType } from '../core/models/menu-types';
import { SmzSidebarState } from '../core/models/sidebar-states';
import { SmzContentTheme, SmzLayoutTheme } from '../core/models/themes';
import { SmzLayoutsConfig } from './smz-layouts.config';

export const defaultSmzLayoutsConfig: SmzLayoutsConfig = {

    debugMode: true,
    logoDark: '',
    logoWhite: '',
    layout: {
        menuType: SmzMenuType.STATIC,
        sidebarState: SmzSidebarState.ACTIVE,
        layoutTheme: SmzLayoutTheme.DARKGRAY,
        contentTheme: SmzContentTheme.SOHO_DARK
    },
    assistance: {
        isEnabled: true,
        isVisible: false,
        sidebarData: {
            position: 'right'
        }
    },
    dialogs: {
        closeAllAfterNavigate: true,
    },
    applicationActions: {
        registerLogs: true,
    }
}
