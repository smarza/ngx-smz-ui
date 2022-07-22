import { SmzExcelDataDefinitions, SmzExcelFontDefinitions, SmzExcelSortDefinitions, SmzExcelThemeDefinitions } from './smz-excel-definitions';

export interface SmzExcelsDetails {
  fileStream: File;
  contentType: string;
  filename: string;
}

export interface SmzCreateExcelTable {
  workbookModel: {
    fileName: string;
    theme: SmzExcelThemeDefinitions;
    title: string;
    author: string;
    company: string;
    dateCreated: string;
    comments: string;
    isDraft: boolean;
    watermark: {
      text: string;
      alpha: number;
      textColor: string;
      font: SmzExcelFontDefinitions;
      rotationAngle: number;
      fontSize: number
    };
    sheets: SmzExcelTableSheet[];
  }
}

export interface SmzExcelTableSheet {
  name: string;
  shouldSort: boolean;
  matchCase: boolean;
  ignoreBlanks: boolean;
  sortColumn: number;
  sortOrder: SmzExcelSortDefinitions;
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
  font: SmzExcelFontDefinitions;
  fontSize: number;
  bold: boolean;
  italic: boolean;
  dataType: SmzExcelDataDefinitions;
  dataFormat: string;
  maxWidth: number
}