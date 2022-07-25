import { SmzExcelColorDefinitions, SmzExcelDataDefinitions, SmzExcelFontDefinitions, SmzExcelSortOrderDefinitions, SmzExcelThemeDefinitions } from './smz-excel-definitions';

export interface SmzExcelsDetails {
  file: string;
  fileName: string;
  fileExtension: string;
}

export interface SmzCreateExcelTable {
  workbookModel: {
    fileName: string;
    title: string;
    author: string;
    company: string;
    comments: string;
    isDraft: boolean;
    watermark: SmzExcelWatermarkSheet;
    sheets: SmzExcelTableSheet[];
  }
}

export interface SmzExcelWatermarkSheet {

    text: string;
    alpha: number;
    textColor: SmzExcelColorDefinitions;
    font: SmzExcelFontDefinitions;
    rotationAngle: number;
    fontSize: number;

}

export interface SmzExcelTableSheet {
  name: string;
  tabColor: SmzExcelColorDefinitions;
  shouldSort: boolean;
  matchCase: boolean;
  ignoreBlanks: boolean;
  sortColumn: number;
  sortOrder: SmzExcelSortOrderDefinitions;
  header: SmzExcelHeader;
  columns: SmzExcelColumn[];
  theme: SmzExcelThemeDefinitions;

}

export interface SmzExcelHeader {
  data: string[];
  style: SmzExcelStyle;
}

export interface SmzExcelColumn {
  data: string[];
  style: SmzExcelStyle;
  dataType: SmzExcelDataDefinitions;
  dataFormat?: string;
  maxWidth: number;
}

export interface SmzExcelStyle {
  font: SmzExcelFontDefinitions;
  fontSize: number;
  bold: boolean;
  italic: boolean;
}