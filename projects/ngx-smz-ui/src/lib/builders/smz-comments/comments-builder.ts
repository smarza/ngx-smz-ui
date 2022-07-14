import { SmzCommentsState } from '../../modules/smz-comments/models/smz-comments-state';

export class SmzCommentsBuilder {
  public _state: SmzCommentsState = {
    entityId: null,
    loadOnInit: true,
    fullWidth: true,
    focus: false,
    response: {
      enabled: true
    },
    locale: null,
  };
  constructor(entityId: string) {
    this._state.entityId = entityId;

    this.setLocale('pt-BR');
  }

  public avoidLoadOnInit(): SmzCommentsBuilder {
    this._state.loadOnInit = false;
    return this;
  }

  public useFocus(): SmzCommentsBuilder {
    this._state.focus = true;
    return this;
  }

  public disableResponse(): SmzCommentsBuilder {
    this._state.response.enabled = false;
    return this;
  }

  public setTitle(title: string): SmzCommentsBuilder {
    this._state.locale.title = title;
    return this;
  }

  public setLocale(language: 'pt-BR' | 'en-US'): SmzCommentsBuilder {

    switch (language) {
      case 'pt-BR':
        this._state.locale = {
          code: language,
          title: 'Comentários',
          emptyMessage: 'Nenhum Comentário.',
          refreshButton: 'ATUALIZAR',
          createButton: 'NOVO',
          updateMessage: 'Última atualização',
          firstMessage: 'Seja o primeiro a fazer um comentário.',
          answser: 'Responder'
        };

        break;

      case 'en-US':

        this._state.locale = {
          code: language,
          title: 'Comments',
          emptyMessage: 'No comments.',
          refreshButton: 'REFRESH',
          createButton: 'NEW',
          updateMessage: 'Last update',
          firstMessage: 'Be the first to make a comment.',
          answser: 'Answer'
        };

        break;

      default:
        break;
    }

    return this;
  }

  public build(): SmzCommentsState {
    return this._state;
  }
}