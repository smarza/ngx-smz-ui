import { SimpleNamedEntity } from 'ngx-smz-dialogs';
import { ThemeToneType } from './layout';

export enum ColorSchemaDefinition {
  CONVERSOR = 'conversor',
}

export interface ColorSchema {
  id: ColorSchemaDefinition;
  name: string;
  schemas: SimpleNamedEntity[];
  tone: ThemeToneType;
}

export const SmzColorSchemas: ColorSchema[] = [
  {
    id: ColorSchemaDefinition.CONVERSOR,
    name: 'Conversor',
    tone: 'dark',
    schemas: [
      { id: '--surface-a', name: '#ffffff' }, // menu
      { id: '--surface-b', name: '#f8f9fa' }, // fundo
      { id: '--surface-c', name: '#e9ecef' },
      { id: '--surface-d', name: '#dee2e6' },
      { id: '--surface-e', name: '#ffffff' },
      { id: '--surface-f', name: '#ffffff' },
      { id: '--text-color', name: '#495057' }, // texto básico
      { id: '--text-color-secondary', name: '#6c757d' },
      { id: '--primary-color', name: '#6ebc3b' }, // topo
      { id: '--primary-color-text', name: '#ffffff' }, // texto on hover do menu
    ]
  },
];


