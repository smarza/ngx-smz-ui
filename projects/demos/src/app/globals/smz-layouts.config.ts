import { SmzLayoutsConfig, SmzLoader } from '@ngx-smz/core';

export const smzLayoutsConfig: SmzLayoutsConfig = {
  loader: {
    type: SmzLoader.CUBE,
    title: 'Carregando...',
    message: 'Aguarde.',
  },
};
