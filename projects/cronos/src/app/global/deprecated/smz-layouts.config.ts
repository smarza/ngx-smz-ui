import { SmzLayoutsConfig, SmzContentTheme, SmzLoader, MenuType, SidebarState, HephaestusLayout } from '@ngx-smz/core';

declare const require;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const version: string = require( '../../../../../../package.json').version;

export const smzHephaestusConfig: HephaestusLayout = {
  menu: MenuType.STATIC,
  sidebarState: SidebarState.ACTIVE,
  mobileSidebarState: SidebarState.INACTIVE,
  sidebarWidth: '260px',
  sidebarSlimWidth: '8rem',
  topbarMenuIcon: {
    toClose: 'fa-solid fa-minus',
    toOpen: 'fa-solid fa-window-maximize'
  },
  enableNavigationBack: true
};

export const smzLayoutsConfig: SmzLayoutsConfig = {
  debugMode: false,
  appLogo: {
    horizontal: {
      dark: 'assets/images/logos/horizontal-dark.svg',
      light: 'assets/images/logos/horizontal-light.svg'
    },
    vertical: {
      dark: 'assets/images/logos/vertical-dark.svg',
      light: 'assets/images/logos/vertical-light.svg'
    },
    typo: {
      dark: 'assets/images/logos/typo-dark.svg',
      light: 'assets/images/logos/typo-light.svg'
    },
    icon: {
      dark: 'assets/images/logos/icon-dark.svg',
      light: 'assets/images/logos/icon-light.svg'
    },
  },
  useAvatar: true,
  appName: 'cronos',
  usernameProperty: 'username',
  footer: {
    leftSideText: `(v${version}) Tecgraf PUC-Rio | Petrobras`,
    rightSideImages: ['assets/images/logos/TecgrafBrancoHorizontal.svg', 'assets/images/logos/Principal_h_negativa.svg'],
    rightSideText: '',
    showAppName: true,
    showLogo: false,
  },
  toast: {
    position: 'bottom-right'
  },
  themes: {
    content: SmzContentTheme.CUSTOM_LIGHT,
  },
  loader: {
    type: SmzLoader.CUBE,
    title: 'Carregando...',
    message: 'Aguarde por favor'
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
  }
};