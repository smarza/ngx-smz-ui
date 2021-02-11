import { SmzLoader } from '../core/models/loaders';
import { DiamondMenuType } from '../core/models/menu-types';
import { DiamondSidebarState } from '../core/models/sidebar-states';
import { SmzContentTheme, SmzLayoutTheme } from '../core/models/themes';
import { SmzLayoutsConfig } from './smz-layouts.config';

export const defaultSmzLayoutsConfig: SmzLayoutsConfig = {

    debugMode: true,
    appLogo: {
        horizontal: { dark: '', light: '' },
        vertical: { dark: '', light: '' },
        typo: { dark: '', light: '' },
        icon: { dark: '', light: '' },
    },
    appName: '',
    footerText: '',
    layout: {
        menu: DiamondMenuType.STATIC,
        sidebarState: DiamondSidebarState.ACTIVE,
        sidebarWidth: '16rem',
        sidebarSlimWidth: '6rem',
    },
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
