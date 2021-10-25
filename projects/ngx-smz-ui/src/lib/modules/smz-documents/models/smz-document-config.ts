export interface SmzDocumentConfig {
  globals: {
    fontScale: number;
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

  images: {
    container: string;
    styles: string;
  };
}