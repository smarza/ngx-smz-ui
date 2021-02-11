import { SimpleNamedEntity } from 'ngx-smz-dialogs';
export enum SmzLoader {
    CUBE = 'cube',
}
export const SmzLoaders: SimpleNamedEntity[] = [
    { id: SmzLoader.CUBE, name: 'Loader Cube'},
];