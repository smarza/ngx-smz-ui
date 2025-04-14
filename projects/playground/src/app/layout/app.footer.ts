import { signal, WritableSignal } from '@angular/core';
import { Footer } from '@ngx-smz/layout';

export const appFooter: WritableSignal<Footer> = signal<Footer>({
    leftLogoPath: {
        light: 'horizontal-light.svg',
        dark: 'horizontal-dark.svg'
    },
    rightLogoPath: {
        light: 'horizontal-light.svg',
        dark: 'horizontal-dark.svg'
    },
    version: '1.0.0',
    copyright: 'Copyright 2025 SMZ'
})