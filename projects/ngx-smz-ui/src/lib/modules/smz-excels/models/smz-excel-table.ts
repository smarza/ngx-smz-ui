export interface SmzExcelsDetails {
  fileStream: File;
  contentType: string;
  filename: string;
}

export interface SmzCreateExcelTable {
  workbookModel: {
    fileName: string;
    theme: number;
    title: string;
    author: string;
    company: string;
    dateCreated: string;
    comments: string;
    isDraft: true;
    watermark: {
      text: string;
      alpha: number;
      textColor: string;
      font: number;
      rotationAngle: number;
      fontSize: number
    };
    sheets: SmzExcelTableSheet[];
  }
}

export interface SmzExcelTableSheet {
  name: string;
  shouldSort: true;
  matchCase: true;
  ignoreBlanks: true;
  sortColumn: number;
  sortOrder: number;
  header: SmzExcelHeader;
  columns: SmzExcelColumn[];
}

export interface SmzExcelHeader {
  data: string[];
  style: SmzExcelStyle;
}

export interface SmzExcelColumn {
  data: string[];
  style: SmzExcelStyle;
}

export interface SmzExcelStyle {
  font: number;
  fontSize: number;
  bold: true;
  italic: true;
  dataType: number;
  dataFormat: string;
  maxWidth: number
}