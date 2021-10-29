import { SmzFaqsConfig } from 'ngx-smz-ui';
import { environment } from '../environments/environment';

export const smzFaqsConfig: SmzFaqsConfig = {
  endpoint: `${environment.domainApi}/api/faqs`,
  databaseCacheTimeout: environment.databaseCacheTimeout,
  creationClaim: 'EDIT_CUSTOMERS_DETAILS',
  placeholders: {
      searchTitle: 'Como posso ajuda-lo ?',
      searchPlaceholder: 'Digite palavras-chave para buscar respostas',
      contentTitle: 'Peguntas Frequentes ?',
      creationTitle: 'Adicionar Conhecimento ?',
      emptyMessage: 'Nenhum conteúdo foi encontrado.',
      creationMessage: 'Seja o primeiro a criar um conteúdo.',
      supportMessage: 'Caso precise, procure o suporte ou o administrador do seu sistema.',
      noSearchResultsMessage: 'Refine sua busca e tente novamente.'
  },
  layouts: {
      positions: {
          'top': '10%',
          'middle': '48%',
          'bottom': '80%',
      }
  }
};