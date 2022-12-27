export interface SmzUiGuidesState {
  context: {
    step: number,
  },
  steps: SmzUiGuidesStep[];
  locale: {
    code: 'pt-BR' | 'en-US';
    previousButton: string;
    nextButton: string;
    concludeButton: string;
  };
  allowBackNavigation: boolean;
  showSummaryCount: boolean;
}

export interface SmzUiGuidesStep {
  number: number;
  elementId: string;
  title: string;
  content: string;
  alignment: {
    // Percentage
    // Can be negative or positive
    // Can be more than 100%
    // Where 100% represents the size of the target element (elementId)
    offsetX: number,
    offsetY: number,
  }
  size: {
    width: string,
    height: string,
  },
  style: {
    styleClass: string;
  },
  callbacks: {
    init: (step: SmzUiGuidesStep) => void;
    concluded: (step: SmzUiGuidesStep) => void;
  },
  highlight: {
    enabled: boolean;
    margin: number;
  }
}