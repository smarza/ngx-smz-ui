import { SimpleEntity } from '../../../../common/models/simple-named-entity';

export enum SmzLoader {
    CUBE = 'cube',
    SQUARE = 'square',
}
export const SmzLoaders: SimpleEntity<SmzLoader>[] = [
    { id: SmzLoader.CUBE, name: 'Loader Cube'},
    { id: SmzLoader.SQUARE, name: 'Loader Square'},
];