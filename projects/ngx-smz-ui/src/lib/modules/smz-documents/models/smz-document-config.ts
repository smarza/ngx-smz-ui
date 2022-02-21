import { SmzDocumentGlobals } from './smz-document';
import { SmzDocumentPaper } from './smz-document-paper';

export interface SmzDocumentConfig {
  globals: SmzDocumentGlobals;
  viewer: {
    container: string;
    paper: string;
  };
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

  contents: {
    container: string;
  };

  charts: {
    container: string;
  };

  images: {
    container: string;
    styles: string;
  };
}