module.exports = {
  presets: [
    require('../../dist/ngx-smz-ui/tailwind.preset.js')
  ],
  prefix: '',
  important: true,
  safelist: ['opacity-50', 'opacity-100'],
  theme: {
    extend: {
      colors: {
        "surface-a": "var(--surface-a)",
        "surface-b": "var(--surface-b)",
        "surface-c": "var(--surface-c)",
        "surface-d": "var(--surface-d)",
        "surface-e": "var(--surface-e)",
        "surface-f": "var(--surface-f)",
        "text-color": "var(--text-color)",
        "text-color-secondary": "var(--text-color-secondary)",
        "primary-color": "var(--primary-color)",
        "primary-color-text": "var(--primary-color-text)",
        "secondary-color": "var(--secondary-color)",
        "secondary-color-text": "var(--secondary-color-text)",
        "surface-ground": "var(--surface-ground)",
        "surface-section": "var(--surface-section)",
        "surface-card": "var(--surface-card)",
        "surface-overlay": "var(--surface-overlay)",
        "surface-border": "var(--surface-border)",
        "surface-hover": "var(--surface-hover)",
        "surface-50": "var(--surface-50)",
        "surface-100": "var(--surface-100)",
        "surface-200": "var(--surface-200)",
        "surface-300": "var(--surface-300)",
        "surface-400": "var(--surface-400)",
        "surface-500": "var(--surface-500)",
        "surface-600": "var(--surface-600)",
        "surface-700": "var(--surface-700)",
        "surface-800": "var(--surface-800)",
        "surface-900": "var(--surface-900)",
      },
      backgroundImage: {
        'gradient-radial-to-tr': 'radial-gradient(115% 90% at 0% 100%, var(--tw-gradient-stops))',
        'gradient-radial-to-tl': 'radial-gradient(115% 90% at 100% 100%, var(--tw-gradient-stops))',
        'gradient-radial-to-br': 'radial-gradient(90% 115% at 0% 0%, var(--tw-gradient-stops))',
        'gradient-radial-to-bl': 'radial-gradient(90% 115% at 100% 0%, var(--tw-gradient-stops))',
      }
    }
  },
  content: [
    'projects/overview/src/**/*.{html,ts,tsx,js,jsx,mjs}',
    // 'dist/ngx-smz-ui/**/*.{html,ts,tsx,js,jsx,mjs}'
  ],
};