import { ColorSchemaDefinition } from '../models/color-schemas';
import { SmzLoader } from '../models/loaders';
import { SmzContentTheme } from '../models/themes';
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
    footer: {
        leftSideText: '',
        rightSideImages: [],
        rightSideText: '',
        showAppName: true,
        showLogo: true,
    },
    usernameProperty: 'displayName',
    useAvatar: false,
    avatarProperty: 'avatar',
    profileMessage: 'Olá, ',
    toast: {
        position: 'bottom-right'
    },
    themes: {
        content: SmzContentTheme.SOHO_DARK,
        schema: ColorSchemaDefinition.CONVERSOR
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
    monitoreMouseEvents: false
}
