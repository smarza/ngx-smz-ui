export interface SmzUiGuidesState {
  context: {
    step: number,
  },
  title: string;
  steps: SmzUiGuidesStep[];
  locale: {
    code: 'pt-BR' | 'en-US';
  };
  highlight: {
    enabled: boolean
  }
}

export interface SmzUiGuidesStep {
  number: number;
  elementId: string;
  title: string;
  content: string;
  alignment: {
    centerX: boolean,
    centerY: boolean,
    offsetX: number,
    offsetY: number,
  }
  size: {
    width: string,
    height: string,
  },
  style: {
    styleClass: string;
  }
  callbacks: {
    init: (step: SmzUiGuidesStep) => void;
    concluded: (step: SmzUiGuidesStep) => void;
  }
}