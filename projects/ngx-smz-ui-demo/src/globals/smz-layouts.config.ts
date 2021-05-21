import { SmzLayoutsConfig, SmzContentTheme, SmzLoader, HephaestusLayout, MenuType, SidebarState, AthenaLayout, ColorSchemaDefinition } from 'ngx-smz-ui';

export const smzHephaestusConfig: HephaestusLayout = {
    menu: MenuType.STATIC,
    sidebarState: SidebarState.ACTIVE,
    sidebarWidth: '16rem',
    sidebarSlimWidth: '6rem',
};

export const smzAthenaConfig: AthenaLayout = {
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
    usernameProperty: 'displayName',
    useAvatar: true,
    avatarProperty: 'avatar',
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
        content: SmzContentTheme.PRIMEONE_LIGHT,
        schema: ColorSchemaDefinition.E_LIBRA,
        // custom: {
        //     id: 'teste',
        //     name: 'Teste',
        //     tone: 'light',
        //     color: '#F5F5F5',
        //     constrast: 'yellow',
        //     schemas: [
        //         { id: '--primary-color', name: '#F5F5F5' }, // topo
        //         { id: '--primary-color-text', name: '#383838' }, // texto on hover do menu
        //         { id: '--primary-color-menu-bg', name: 'yellow' },
        //         { id: '--primary-color-menu-bg-hover', name: '#CFC100' },
        //         { id: '--primary-color-menu-text', name: 'blue' },
        //         { id: '--primary-color-menu-text-hover', name: '#0006AC' },
        //         { id: '--primary-color-menu-active', name: '#FFAE00' },
        //     ]
        // },
    },
    loader: {
        type: SmzLoader.CUBE,
        title: 'Carregando...',
        // message: 'Aguarde por favor',
        message: 'Please wait, we\'re preparing your data',
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
    },
    monitoreMouseEvents: true
}
