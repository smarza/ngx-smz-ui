import { SimpleEntity, SimpleNamedEntity } from 'ngx-smz-dialogs';
export enum SmzLoader {
    CUBE = 'cube',
}
export const SmzLoaders: SimpleEntity<SmzLoader>[] = [
    { id: SmzLoader.CUBE, name: 'Loader Cube'},
];