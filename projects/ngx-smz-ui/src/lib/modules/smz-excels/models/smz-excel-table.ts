import { SmzExcelColorDefinitions, SmzExcelDataDefinitions, SmzExcelFontDefinitions, SmzExcelSortOrderDefinitions, SmzExcelThemeDefinitions, SmzExcelTypeDefinitions } from './smz-excel-definitions';

export interface SmzExcelsDetails {
  file: string;
  fileName: string;
  fileExtension: string;
}

export interface SmzExcelState {
  isDebug: boolean;
  workbookModel: SmzExcelWorkbook;
}

export interface SmzExcelWorkbook {
    fileName: string;
    info: string;
    author: string;
    company: string;
    comments: string;
    isDraft: boolean;
    watermark: SmzExcelWatermarkSheet;
    tables: SmzExcelTableSheet[];
    charts: SmzExcelChartSheet[];
}

export interface SmzExcelWatermarkSheet {

    text: string;
    alpha: number;
    textColor: SmzExcelColorDefinitions;
    font: SmzExcelFontDefinitions;
    rotationAngle: number;
    fontSize: number;

}

export interface SmzExcelBaseSheet {
  name: string;
  tabColor: SmzExcelColorDefinitions;
  sheetType: SmzExcelTypeDefinitions;
  tabIndex: number;

}

export interface SmzExcelTableSheet extends SmzExcelBaseSheet {
  sheetType: SmzExcelTypeDefinitions.Table;
  shouldSort: boolean;
  matchCase: boolean;
  ignoreBlanks: boolean;
  sortColumn: number;
  sortOrder: SmzExcelSortOrderDefinitions;
  header: SmzExcelHeader;
  columns: SmzExcelColumn[];
  theme: SmzExcelThemeDefinitions;

}

export interface SmzExcelChartSheet extends SmzExcelBaseSheet  {
  sheetType: SmzExcelTypeDefinitions.Chart;

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