export interface SmzUiGuidesState {
  context: {
    step: number,
  },
  title: string;
  steps: SmzUiGuidesStep[];
  locale: {
    code: 'pt-BR' | 'en-US';
  }
}

export interface SmzUiGuidesStep {
  elementId: string;
  title: string;
  content: string;

}