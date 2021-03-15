import { SimpleNamedEntity } from 'ngx-smz-dialogs';
import { ThemeToneType } from './layout';

export enum ColorSchemaDefinition {
  CONVERSOR = 'conversor',
  E_LIBRA = 'e-libra',
  DIABLO = 'diablo',
  DEMO_PROJECT = 'demo-project',
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
    color: '#009688',
    constrast: '#ffffff',
    schemas: [
      { id: '--primary-color', name: '#009688' }, // topo
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
    name: 'Diablo',
    tone: 'dark',
    color: '#000000',
    constrast: '#ffb300',
    schemas: [
      { id: '--primary-color', name: '#000000' }, // topo
      { id: '--primary-color-text', name: '#ffb300' }, // texto on hover do menu
    ]
  },
  {
    id: ColorSchemaDefinition.DEMO_PROJECT,
    name: 'Demo Project',
    tone: 'dark',
    color: '#454764',
    constrast: '#EA80FC',
    schemas: [
      { id: '--primary-color', name: '#454764' }, // topo
      { id: '--primary-color-text', name: '#EA80FC' }, // texto on hover do menu
    ]
  },
];