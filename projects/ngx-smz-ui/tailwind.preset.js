module.exports = {
  prefix: '',
  important: true,
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
        "surface-ground": "var(--surface-ground)",
        "surface-overlay": "var(--surface-overlay)",
      },
      backgroundImage: {
        'gradient-radial-to-tr': 'radial-gradient(115% 90% at 0% 100%, var(--tw-gradient-stops))',
        'gradient-radial-to-tl': 'radial-gradient(115% 90% at 100% 100%, var(--tw-gradient-stops))',
        'gradient-radial-to-br': 'radial-gradient(90% 115% at 0% 0%, var(--tw-gradient-stops))',
        'gradient-radial-to-bl': 'radial-gradient(90% 115% at 100% 0%, var(--tw-gradient-stops))',
      }
    },
  },
}