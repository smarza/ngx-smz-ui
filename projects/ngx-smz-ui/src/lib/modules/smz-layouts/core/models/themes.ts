import { SimpleNamedEntity } from 'ngx-smz-dialogs';

export enum SmzLayoutTheme {
    BLUE = 'blue',
    BLUEGRAY = 'bluegray',
    BROWN = 'brown',
    CYAN = 'cyan',
    DARKGRAY = 'darkgray',
    DEEPPURPLE = 'deeppurple',
    GREEN = 'green',
    INDIGO = 'indigo',
    ORANGE = 'orange',
    PINK = 'pink',
    PURPLE = 'purple',
    TEAL = 'teal',
    WHITE = 'white',
}

export const SmzLayoutThemes: SimpleNamedEntity[] = [
    { id: SmzLayoutTheme.BLUE, name: 'Blue'},
    { id: SmzLayoutTheme.BLUEGRAY, name: 'Blue Gray'},
    { id: SmzLayoutTheme.BROWN, name: 'Brown'},
    { id: SmzLayoutTheme.CYAN, name: 'Cyan'},
    { id: SmzLayoutTheme.DARKGRAY, name: 'Dark Gray'},
    { id: SmzLayoutTheme.DEEPPURPLE, name: 'Deep Purple'},
    { id: SmzLayoutTheme.GREEN, name: 'Green'},
    { id: SmzLayoutTheme.INDIGO, name: 'Indigo'},
    { id: SmzLayoutTheme.ORANGE, name: 'Orange'},
    { id: SmzLayoutTheme.PINK, name: 'Pink'},
    { id: SmzLayoutTheme.PURPLE, name: 'Purple'},
    { id: SmzLayoutTheme.TEAL, name: 'Teal'},
    { id: SmzLayoutTheme.WHITE, name: 'White'},
];

export enum SmzContentTheme {
    BOOTSTRAP_DARK = 'bootstrap-dark.css',
    BOOTSTRAP_LIGHT = 'bootstrap-light.css',
    FLUENT_LIGHT = 'fluent-light.css',
    MATERIAL_DARK = 'material-dark.css',
    MATERIAL_LIGHT = 'material-light.css',
    PRIMEONE_DIM = 'primeone-dim.css',
    PRIMEONE_LIGHT = 'primeone-light.css',
    SOHO_DARK = 'soho-dark.css',
    SOHO_LIGHT = 'soho-light.css',

}

export const SmzContentThemes: SimpleNamedEntity[] = [
    { id: SmzContentTheme.BOOTSTRAP_LIGHT, name: 'Bootstrap Light'},
    { id: SmzContentTheme.FLUENT_LIGHT, name: 'Fluent Light'},
    { id: SmzContentTheme.MATERIAL_DARK, name: 'Material Dark'},
    { id: SmzContentTheme.MATERIAL_LIGHT, name: 'Material Light'},
    { id: SmzContentTheme.PRIMEONE_DIM, name: 'Bootstrap Dark'},
    { id: SmzContentTheme.PRIMEONE_DIM, name: 'PrimeOne Dim'},
    { id: SmzContentTheme.PRIMEONE_LIGHT, name: 'PrimeOne Light'},
    { id: SmzContentTheme.SOHO_DARK, name: 'Soho Dark'},
    { id: SmzContentTheme.SOHO_LIGHT, name: 'Soho Light'},
];