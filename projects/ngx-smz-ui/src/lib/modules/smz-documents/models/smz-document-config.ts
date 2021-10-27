import { SmzDocumentGlobals } from './smz-document';

export interface SmzDocumentConfig {
  globals: SmzDocumentGlobals;
  titles: {
    container: string;
    text: string;
  };
  subTitles: {
    container: string;
    text: string;
  };
  dividers: {
    container: string;
  };
  fields: {
    container: string;
    label: string;
    text: string;
  };

  fieldsGroup: {
    container: string;
  };

  tables: {
    container: string;
    header: {
      container: string;
      columns: string;
    }
    content: string
  };

  images: {
    container: string;
    styles: string;
  };
}