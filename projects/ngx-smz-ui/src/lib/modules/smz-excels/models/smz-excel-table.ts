import { SmzExcelColorDefinitions, SmzExcelDataDefinitions, SmzExcelFontDefinitions, SmzExcelSortOrderDefinitions, SmzExcelThemeDefinitions, SmzExcelTypeDefinitions } from './smz-excel-definitions';

export interface SmzExcelsDetails {
  file: string;
  fileName: string;
  fileExtension: string;
}

export interface SmzExcelState {
  isRequestLimitExceeded: boolean;
  isDebug: boolean;
  workbookModel: SmzExcelWorkbook;
}

export interface SmzExcelWorkbook {
    fileName: string;
    title: string;
    author: string;
    company: string;
    comments: string;
    globalColumnBehavior: SmzExcelGlobalColumnBehavior;
    watermark: SmzExcelWatermarkSheet;
    tables: SmzExcelTableSheet[];
    charts: SmzExcelChartSheet[];
}

export interface SmzExcelGlobalColumnBehavior {
  date: { format: string }
  hyperlink: { isHtml: boolean }
  newLineSeparator: string;
}

export interface SmzExcelWatermarkSheet {

    text: string;
    fontColor: string;
    font: SmzExcelFontDefinitions;
    fontSize: number;
    rotationAngle: number;

}

export interface SmzExcelBaseSheet {
  name: string;
  tabColor: string;
  sheetType: SmzExcelTypeDefinitions;
  tabIndex: number;

}

export interface SmzExcelTableSheet extends SmzExcelBaseSheet {
  sheetType: SmzExcelTypeDefinitions.Table;
  header: SmzExcelHeader;
  columns: SmzExcelColumn[];
  theme: SmzExcelThemeDefinitions;

}

export interface SmzExcelChartSheet extends SmzExcelBaseSheet  {
  sheetType: SmzExcelTypeDefinitions.Chart;

}

export interface SmzExcelHeader {
  data: string[];
  rowHeight: number;
  style: SmzExcelStyle;
}

export interface SmzExcelColumn {
  data: string[];
  style: SmzExcelStyle;
  dataType: SmzExcelDataDefinitions;
  dataFormat?: string;
  maxWidth: number;
  hasSubTotal: boolean;
}

export interface SmzExcelStyle {
  font: SmzExcelFontDefinitions;
  fontSize: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  fontColor: string;
}