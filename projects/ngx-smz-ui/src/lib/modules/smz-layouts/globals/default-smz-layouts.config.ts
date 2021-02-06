import { SmzLoader } from '../core/models/loaders';
import { SmzMenuType } from '../core/models/menu-types';
import { SmzSidebarState } from '../core/models/sidebar-states';
import { SmzContentTheme, SmzLayoutTheme } from '../core/models/themes';
import { SmzLayoutsConfig } from './smz-layouts.config';

export const defaultSmzLayoutsConfig: SmzLayoutsConfig = {

    debugMode: true,
    logoDark: '',
    logoWhite: '',
    appName: '',
    footerText: '',
    layout: {
        menuType: SmzMenuType.STATIC,
        sidebarState: SmzSidebarState.ACTIVE,
        layoutTheme: SmzLayoutTheme.DARKGRAY,
        contentTheme: SmzContentTheme.SOHO_DARK,
        loader: {
            type: SmzLoader.CUBE,
            title: 'Carregando...',
            message: 'Aguarde por favor'
        },
        sidebarWidth: '16rem',
        sidebarSlimWidth: '6rem'
    },
    assistance: {
        isEnabled: true,
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
