/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui';

export default {
  presets: [
    require('../../dist/ngx-smz-ui/tailwind.preset.js')
  ],
  content: [
    'projects/demos/src/**/*.{html,ts,tsx,js,jsx,mjs}',
    'projects/ngx-smz-ui-layout/src/**/*.{html,ts,tsx,js,jsx,mjs}',
    'projects/ngx-smz-ui/src/**/*.{html,ts,tsx,js,jsx,mjs}',
  ],
  plugins: [PrimeUI],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1920px'
    },
    extend: {
      colors: {
        'surface-border': 'var(--surface-border)'
      },
      borderRadius: {
        '2xl': '1.5rem',
      },
      boxShadow: {
        'inset': 'inset 0px 0px 12px 0px rgba(0,0,0,0.15)',
      },
    },
  }
};