import { SmzLayoutsConfig, SmzMenuType, SmzSidebarState, SmzLayoutTheme, SmzContentTheme } from 'ngx-smz-ui';

export const smzLayoutsConfig: SmzLayoutsConfig = {
    logoDark: 'assets/layout/images/logo-dark.svg',
    logoWhite: 'assets/layout/images/logo-white.svg',
    layout: {
        menuType: SmzMenuType.STATIC,
        sidebarState: SmzSidebarState.ACTIVE,
        layoutTheme: SmzLayoutTheme.DARKGRAY,
        contentTheme: SmzContentTheme.PRIMEONE_LIGHT
    },
}
