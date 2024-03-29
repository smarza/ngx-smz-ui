import { SmzLayoutsConfig, SmzContentTheme, SmzLoader, HephaestusLayout, MenuType, SidebarState, AthenaLayout, ColorSchemaDefinition } from 'ngx-smz-ui';

export const smzHephaestusConfig: HephaestusLayout = {
    menu: MenuType.SLIM,
    sidebarState: SidebarState.ACTIVE,
    mobileSidebarState: SidebarState.INACTIVE,
    sidebarWidth: '16rem',
    sidebarSlimWidth: '8rem',
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
    appName: 'Demo App',
    useAvatar: true,
    avatarProperty: 'picture',
    usernameProperty: 'username',
    profileMessage: 'Olá, ',
    footer: {
        leftSideText: 'Left Message',
        rightSideImages: ['assets/layout/images/typo-dark.svg'],
        rightSideText: '© Your Organization - 2021',
        showAppName: true,
        showLogo: true,
    },
    toast: {
        position: 'bottom-right'
    },
    themes: {
        content: SmzContentTheme.CUSTOM_DARK,
        custom: {
        id: 'fapeng',
        name: 'Fapeng',
        tone: 'dark',
        color: '#ffffff',
        constrast: '#000000',
        schemas: [
            { id: '--primary-color', name: '#232931' },
            { id: '--secondary-color', name: '#4ECCA3' },
            { id: '--primary-color-text', name: '#ffffff' },
            { id: '--primary-color-menu-bg', name: '#393E46' },
            { id: '--primary-color-menu-bg-hover', name: '#EEEEEE' },
            { id: '--primary-color-menu-text', name: 'rgba(255,255,255,.87)' },
            { id: '--primary-color-menu-text-hover', name: '#232931' },
            { id: '--primary-color-menu-bg-hover', name: '#4ECCA3' },
            { id: '--primary-color-menu-active', name: '#4ECCA3' },
            { id: '--primary-color-loading', name: '#F5F5F5' },
            { id: '--primary-color-loading-bg', name: '#4ECCA3' },
        ]
        },
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
    monitoreMouseEvents: true
}
