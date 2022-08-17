import { SmzLayoutsConfig, SmzContentTheme, SmzLoader, HephaestusLayout, MenuType, SidebarState, AthenaLayout, ColorSchemaDefinition } from 'ngx-smz-ui';

export const smzHephaestusConfig: HephaestusLayout = {
    menu: MenuType.STATIC,
    sidebarState: SidebarState.ACTIVE,
    mobileSidebarState: SidebarState.INACTIVE,
    sidebarWidth: '20rem',
    sidebarSlimWidth: '8rem',
    topbarMenuCloseIcon: 'fa-solid fa-hand-back-fist'
};

export const smzAthenaConfig: AthenaLayout = {
    menu: MenuType.HORIZONTAL,
    sidebarState: SidebarState.INACTIVE,
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
    appName: 'Demo App 1',
    useAvatar: true,
    avatarProperty: 'picture',
    usernameProperty: 'username',
    profileMessage: 'Olá, ',
    footer: {
        leftSideText: 'Left Message',
        rightSideImages: ['assets/layout/images/typo-light.svg', 'assets/layout/images/typo-light.svg'],
        rightSideText: '© Your Organization - 2021',
        showAppName: true,
        showLogo: true,
    },
    toast: {
        position: 'bottom-right'
    },
    themes: {
        content: SmzContentTheme.CUSTOM_LIGHT_DIMMED
    },
    loader: {
        type: SmzLoader.CUBE,
        title: 'Carregando...',
        // message: 'Aguarde por favor',
        message: 'Please wait, we\'re preparing your data',
    },
    pages: {
        notFoundTitle: 'Página não encontrada',
        notFoundMessage: 'A rota solicitada não existe ou não se encontra disponível no momento.',
        notFoundImagePath: 'assets/images/pages/bg-404.jpg',
    },
    assistance: {
        isEnabled: false,
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
    },
    monitoreMouseEvents: false
}
