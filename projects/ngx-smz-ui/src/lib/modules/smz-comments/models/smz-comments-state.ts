export interface SmzCommentsState {
  entityId: string;
  loadOnInit: boolean;
  fullWidth: boolean;
  focus: boolean;
  response: {
    enabled: boolean;
  }
  locale: {
    code: 'pt-BR' | 'en-US';
    title: string;
    emptyMessage: string;
    refreshButton: string;
    createButton: string;
    updateMessage: string;
    firstMessage: string;
    answser: string;
  }
}