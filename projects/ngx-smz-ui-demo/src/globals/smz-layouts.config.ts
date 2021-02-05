import { SmzLayoutsConfig, SmzMenuType, SmzSidebarState, SmzLayoutTheme, SmzContentTheme, SmzLoader } from 'ngx-smz-ui';

export const smzLayoutsConfig: SmzLayoutsConfig = {
    debugMode: false,
    logoDark: 'assets/layout/images/logo-dark.svg',
    logoWhite: 'assets/layout/images/logo-white.svg',
    appName: 'Demo App',
    footerText: '© Your Organization - 2021',
    layout: {
        menuType: SmzMenuType.STATIC,
        sidebarState: SmzSidebarState.ACTIVE,
        layoutTheme: SmzLayoutTheme.DARKGRAY,
        contentTheme: SmzContentTheme.PRIMEONE_LIGHT,
        loader: {
            type: SmzLoader.CUBE,
            title: 'Carregando...',
            message: 'Aguarde por favor'
        }
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
