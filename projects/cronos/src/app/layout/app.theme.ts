import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import { AuraBaseDesignTokens } from '@primeng/themes/aura/base';
import { Preset } from '@primeng/themes/types';

const myPreset: Preset<AuraBaseDesignTokens> = {
  semantic: {
    primary: {
      50:  '#e3f6fb',
      100: '#c0e8f6',
      200: '#99d9ef',
      300: '#6fc9e6',
      400: '#45b9dc',
      500: '#208FBC', // --cronos-light-blue-color
      600: '#1b7ca3',
      700: '#166989',
      800: '#115670',
      900: '#0c4358',
      950: '#082f3d'
    },
    colorScheme: {
      light: {
        surface: {
          0:    '#ffffff',
          50:   '#f1f2f7', // Cinza claro
          100:  '#e2e4ec',
          200:  '#cfd2dc',
          300:  '#b7bbc7',
          400:  '#9fa3af',
          500:  '#878b97',
          600:  '#6e717c',
          700:  '#565861',
          800:  '#3f4047',
          900:  '#2a2b30',
          950:  '#1a1a1d'
        },
        formField: {
          background: "{surface.50}",
        }
      }
    },
  }
};

export const CronosPreset = definePreset(Aura, myPreset);
