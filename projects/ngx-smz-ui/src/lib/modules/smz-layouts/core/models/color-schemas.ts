import { SimpleNamedEntity } from 'ngx-smz-dialogs';
import { ThemeToneType } from './layout';

export enum ColorSchemaDefinition {
  CONVERSOR = 'conversor',
  E_LIBRA = 'e-libra',
  DIABLO = 'diablo',
}

export interface ColorSchema {
  id: ColorSchemaDefinition;
  name: string;
  schemas: SimpleNamedEntity[];
  tone: ThemeToneType;
  color: string;
  constrast: string;
}

export const SmzColorSchemas: ColorSchema[] = [
  {
    id: ColorSchemaDefinition.CONVERSOR,
    name: 'Conversor',
    tone: 'dark',
    color: '#6ebc3b',
    constrast: '#ffffff',
    schemas: [
      { id: '--primary-color', name: '#6ebc3b' }, // topo
      { id: '--primary-color-text', name: '#ffffff' }, // texto on hover do menu
    ]
  },
  {
    id: ColorSchemaDefinition.E_LIBRA,
    name: 'e-Libra',
    tone: 'dark',
    color: '#1976D2',
    constrast: '#ffffff',
    schemas: [
      { id: '--primary-color', name: '#1976D2' }, // topo
      { id: '--primary-color-text', name: '#ffffff' }, // texto on hover do menu
    ]
  },
  {
    id: ColorSchemaDefinition.DIABLO,
    name: 'diablo',
    tone: 'dark',
    color: '#000000',
    constrast: '#ffb300',
    schemas: [
      { id: '--primary-color', name: '#000000' }, // topo
      { id: '--primary-color-text', name: '#ffb300' }, // texto on hover do menu
    ]
  },
];


