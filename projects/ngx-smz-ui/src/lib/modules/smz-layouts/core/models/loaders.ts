import { SimpleEntity } from '../../../../common/models/simple-named-entity';

export enum SmzLoader {
    CUBE = 'cube',
}
export const SmzLoaders: SimpleEntity<SmzLoader>[] = [
    { id: SmzLoader.CUBE, name: 'Loader Cube'},
];