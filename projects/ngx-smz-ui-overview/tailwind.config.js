const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

// Design mode faz com que todos os estilos do tailwind sejam carregados no build.
// Essa configuração é útil para criação de layouts pelo chrome, pois todas as classes estarão disponíveis no navegador.
// O default é FALSE, para que o webpack realize o tree shaking corretamente

const designMode = true;

module.exports = {
    prefix: '',
    important: false,
    mode: designMode ? undefined : 'jit',
    content: [
        './src/**/*.{html,ts,css,scss}',
        '../ngx-smz-ui/**/*.{html,ts,css,scss}'
    ],
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [],
};
