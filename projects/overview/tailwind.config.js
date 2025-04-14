module.exports = {
  presets: [
    require('../../dist/ngx-smz-ui/tailwind.preset.js')
  ],
  content: [
    'projects/overview/src/**/*.{html,ts,tsx,js,jsx,mjs}',
    'dist/ngx-smz-ui/**/*.{html,ts,tsx,js,jsx,mjs}'
  ],
};