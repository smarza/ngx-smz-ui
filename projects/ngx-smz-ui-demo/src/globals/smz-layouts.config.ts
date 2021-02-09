import { SmzLayoutsConfig, SmzMenuType, SmzSidebarState, SmzLayoutTheme, SmzContentTheme, SmzLoader } from 'ngx-smz-ui';

export const smzLayoutsConfig: SmzLayoutsConfig = {
    debugMode: false,
    appLogo: {
        horizontal: {
            dark: 'assets/layout/images/horizontal-dark.svg',
            light: 'assets/layout/images/horizontal-light.svg'
        },
        vertical: {
            dark: 'assets/layout/images/vertical-dark.svg',
            light: 'assets/layout/images/vertical-light.svg'
        },
        typo: {
            dark: 'assets/layout/images/typo-dark.svg',
            light: 'assets/layout/images/typo-light.svg'
        },
        icon: {
            dark: 'assets/layout/images/icon-dark.svg',
            light: 'assets/layout/images/icon-light.svg'
        },
    },
    appName: 'Demo App',
    footerText: '© Your Organization - 2021',
    layout: {
        menuType: SmzMenuType.SLIM,
        sidebarState: SmzSidebarState.ACTIVE,
        layoutTheme: SmzLayoutTheme.DARKGRAY,
        contentTheme: SmzContentTheme.PRIMEONE_LIGHT,
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
