import { SmzLayoutsConfig, SmzLayoutTheme, SmzContentTheme, SmzLoader, DiamondLayout, MenuType, SidebarState, ApolloLayout } from 'ngx-smz-ui';

export const smzDiamondConfig: DiamondLayout = {
    menu: MenuType.STATIC,
    sidebarState: SidebarState.ACTIVE,
    sidebarWidth: '16rem',
    sidebarSlimWidth: '6rem',
};

export const smzApolloConfig: ApolloLayout = {
    menu: MenuType.HORIZONTAL,
    sidebarState: SidebarState.ACTIVE,
    mobileSidebarState: SidebarState.INACTIVE,
    sidebarWidth: '16rem',
    sidebarSlimWidth: '6rem',
};

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
    toast: {
        position: 'bottom-right'
    },
    themes: {
        layout: SmzLayoutTheme.DARKGRAY,
        content: SmzContentTheme.SOHO_DARK,
    },
    loader: {
        type: SmzLoader.CUBE,
        title: 'Carregando...',
        message: 'Aguarde por favor'
    },
    pages: {
        errorTitle: 'Erro',
        errorMessage: 'Ocorreu um erro com a sua solicitação. Caso persista, entre em contato com seu administrador de sistema.',
        errorImagePath: 'assets/images/pages/bg-error.jpg',
        notFoundTitle: 'Página não encontrada',
        notFoundMessage: 'A rota solicitada não existe ou não se encontra disponível no momento.',
        notFoundImagePath: 'assets/images/pages/bg-404.jpg',
    },
    assistance: {
        isEnabled: true,
        sidebarData: {
            position: 'right'
        },
        buttonPosition: 'right-bottom'
    },
    dialogs: {
        closeAllAfterNavigate: true,
    },
    applicationActions: {
        registerLogs: true,
    }
}
