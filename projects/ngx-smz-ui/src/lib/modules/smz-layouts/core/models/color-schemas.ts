import { SimpleNamedEntity } from '../../../../common/models/simple-named-entity';
import { ThemeToneType } from './layout';

export enum ColorSchemaDefinition {
  CONVERSOR = 'conversor',
  E_LIBRA = 'e-libra',
  DIABLO = 'diablo',
  DEMO_PROJECT = 'demo-project',
}

export interface ColorSchema {
  id: ColorSchemaDefinition | string;
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
      { id: '--primary-color', name: '#009688' },
      { id: '--primary-color-text', name: '#ffffff' },
      { id: '--primary-color-menu-bg', name: '#ffffff' },
      { id: '--primary-color-menu-bg-hover', name: '#F5F5F5' },
      { id: '--primary-color-menu-text', name: '#212121' },
      { id: '--primary-color-menu-text-hover', name: '#000000' },
      { id: '--primary-color-menu-active', name: '#009688' },
      { id: '--primary-color-loading', name: '#ffffff' },
      { id: '--primary-color-loading-bg', name: '#009688' }
    ]
  },
  {
    id: ColorSchemaDefinition.E_LIBRA,
    name: 'e-Libra',
    tone: 'dark',
    color: '#1976D2',
    constrast: '#ffffff',
    schemas: [
      { id: '--primary-color', name: '#1976D2' },
      { id: '--primary-color-text', name: '#ffffff' },
      { id: '--primary-color-menu-bg', name: '#1976D2' },
      { id: '--primary-color-menu-bg-hover', name: '#0000001c' },
      { id: '--primary-color-menu-text', name: '#FFFFFFE7' },
      { id: '--primary-color-menu-text-hover', name: '#FAFAFA' },
      { id: '--primary-color-menu-active', name: '#ffffffcf' },
      { id: '--primary-color-loading', name: '#ffffff' },
      { id: '--primary-color-loading-bg', name: '#1976D2' }
    ]
  },
  {
    id: ColorSchemaDefinition.DIABLO,
    name: 'Diablo',
    tone: 'dark',
    color: '#000000',
    constrast: '#ffb300',
    schemas: [
      { id: '--primary-color', name: '#000000' },
      { id: '--primary-color-text', name: '#ffb300' },
      { id: '--primary-color-menu-bg', name: '#ffffff' },
      { id: '--primary-color-menu-bg-hover', name: '#F5F5F5' },
      { id: '--primary-color-menu-text', name: '#212121' },
      { id: '--primary-color-menu-text-hover', name: '#000000' },
      { id: '--primary-color-menu-active', name: '#ffb300' },
      { id: '--primary-color-loading', name: '#000000' },
      { id: '--primary-color-loading-bg', name: '#ffb300' }
    ]
  },
  {
    id: ColorSchemaDefinition.DEMO_PROJECT,
    name: 'Demo Project',
    tone: 'dark',
    color: '#454764',
    constrast: '#EA80FC',
    schemas: [
      { id: '--primary-color', name: '#454764' },
      { id: '--primary-color-text', name: '#EA80FC' },
      { id: '--primary-color-menu-bg', name: '#ffffff' },
      { id: '--primary-color-menu-bg-hover', name: '#F5F5F5' },
      { id: '--primary-color-menu-text', name: '#212121' },
      { id: '--primary-color-menu-text-hover', name: '#000000' },
      { id: '--primary-color-menu-active', name: '#454764' },
      { id: '--primary-color-loading', name: '#F5F5F5' },
      { id: '--primary-color-loading-bg', name: '#454764' }
    ]
  },
];