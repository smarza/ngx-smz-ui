import { signal, WritableSignal } from '@angular/core';
import { Footer } from '@ngx-smz/layout';

export const appFooter: WritableSignal<Footer> = signal<Footer>({
    leftLogoPath: {
        light: 'ativo.svg',
        dark: 'assets/images/logos/horizontal-dark.svg'
    },
    rightLogoPath: {
        light: 'cronos-footer-light.svg',
        dark: 'assets/images/logos/TecgrafBrancoHorizontal.svg'
    },
    version: '(1.0.0)',
    copyright: 'Tecgraf PUC-Rio | Petrobras'
})