import { SmzLayoutsConfig, SmzContentTheme, SmzLoader, HephaestusLayout, MenuType, SidebarState, AthenaLayout, ColorSchemaDefinition } from 'ngx-smz-ui';

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
    appName: 'Notifications Demo',
    useAvatar: false,
    avatarProperty: 'picture',
    usernameProperty: 'username',
    profileMessage: 'Olá, ',
    footer: {
        leftSideText: '',
        rightSideImages: ['assets/layout/images/typo-light.svg'],
        rightSideText: '© ngx-smz-ui | 2021',
        showAppName: true,
        showLogo: true,
    },
    toast: {
        position: 'bottom-right'
    },
    themes: {
        content: SmzContentTheme.PRIMEONE_LIGHT,
        custom:   {
            id: 'e-libra-mobile',
            name: 'e-Libra Mobile',
            tone: 'dark',
            color: '#18A16D',
            constrast: '#ffffff',
            schemas: [
              { id: '--primary-color', name: '#18A16D' },
              { id: '--secondary-color', name: '#26A69A' },
              { id: '--primary-color-text', name: '#ffffff' },
              { id: '--primary-color-menu-bg', name: '#18A16D' },
              { id: '--primary-color-menu-bg-hover', name: '#0000001c' },
              { id: '--primary-color-menu-text', name: '#FFFFFFE7' },
              { id: '--primary-color-menu-text-hover', name: '#FAFAFA' },
              { id: '--primary-color-menu-active', name: '#ffffffcf' },
              { id: '--primary-color-loading', name: '#ffffff' },
              { id: '--primary-color-loading-bg', name: '#18A16D' }
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
