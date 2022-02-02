module.exports = {
  prefix: '',
  important: true,
  content: [
    'projects/ngx-smz-ui-overview/src/**/*.{html,ts,tsx,js,jsx,mjs}',
    'dist/ngx-smz-ui/**/*.{html,ts,tsx,js,jsx,mjs}'
  ],
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
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};