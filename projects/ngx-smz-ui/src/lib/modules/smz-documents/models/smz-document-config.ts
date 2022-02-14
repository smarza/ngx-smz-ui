import { SmzDocumentGlobals } from './smz-document';
import { SmzDocumentPaper } from './smz-document-paper';

export interface SmzDocumentConfig {
  globals: SmzDocumentGlobals;
  viewer: {
    container: string;
    paper: string;
  };
  paper: {
    headerHeightCm: number;
    marginCm: {
      left: number;
      right: number;
      top: number;
      bottom: number;
    }
    width: number; // millimeters
    orientation: "portrait" | "p" | "l" | "landscape";
    format: string | number[];
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

  images: {
    container: string;
    styles: string;
  };
}