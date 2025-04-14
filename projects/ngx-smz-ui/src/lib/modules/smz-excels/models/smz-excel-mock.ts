import { SmzExcelState } from './smz-excel-table';
import { SmzExcelColorDefinitions, SmzExcelDataDefinitions, SmzExcelFontDefinitions, SmzExcelSortOrderDefinitions, SmzExcelThemeDefinitions, SmzExcelTypeDefinitions } from './smz-excel-definitions';

export const SmzExcelMockData: SmzExcelState = {
  isDebug: true,
  isRequestLimitExceeded: false,
  workbookModel: {
    fileName: 'MyOutput',
    title: 'Basniak\'s Awesome Table',
    author: 'Basniak',
    company: 'Basniak\'s awesome library',
    comments: 'Awesome Excel Generation',
    globalColumnBehavior: {
      date: { format: 'dd/MM/yyyy' },
      hyperlink: { isHtml: true },
      newLineSeparator: null
    },
    watermark: {
      text: 'Rascunho',
      fontColor: '66000000',
      font: SmzExcelFontDefinitions.Calibri,
      rotationAngle: 45,
      fontSize: 80
    },
    tables: [
      {
        name: 'Custom Spreadsheet Name',
        sheetType: SmzExcelTypeDefinitions.Table,
        tabIndex: 0,
        theme: SmzExcelThemeDefinitions.TableStyleLight3,
        tabColor: null,
        header: {
          data: ['Tag', 'Plant', 'Numbers', 'Dates'],
          rowHeight: 0,
          style: {
            font: SmzExcelFontDefinitions.Calibri,
            fontSize: 14,
            bold: true,
            italic: false,
            underline: false,
            fontColor: null
          }
        },
        columns: [
          // TAG
          {
            data: ['string muito muito muito muito longa', 'b', 'c', 'd', 'e', 'string muito muito muito muito longa', 'b', 'c', 'd', 'e', 'string muito muito muito muito longa', 'b', 'c', 'd', 'e', 'string muito muito muito muito longa', 'b', 'c', 'd', 'e'],
            style: {
              font: SmzExcelFontDefinitions.Calibri,
              fontSize: 12,
              bold: false,
              italic: false,
              underline: false,
              fontColor: null
            },
            dataType: SmzExcelDataDefinitions.Text,
            dataFormat: undefined,
            maxWidth: undefined,
            hasSubTotal: false,
            isMultilined: false,
            newLineSeparator: ''
          },
          // PLANT
          {
            data: ["i", "h", "g", "f", "j"],
            style: {
              font: SmzExcelFontDefinitions.Calibri,
              fontSize: 12,
              bold: false,
              italic: false,
              underline: false,
              fontColor: null
            },
            dataType: SmzExcelDataDefinitions.Text,
            dataFormat: undefined,
            maxWidth: undefined,
            hasSubTotal: false,
            isMultilined: false,
            newLineSeparator: ''
          },
          // NUMBERS
          {
            data: ["1.1", "2.2", "3.4", "4", "5", "6.6", "7.9"],
            style: {
              font: SmzExcelFontDefinitions.Calibri,
              fontSize: 12,
              bold: false,
              italic: false,
              underline: false,
              fontColor: null
            },
            dataType: SmzExcelDataDefinitions.DateTime,
            dataFormat: '0.00',
            maxWidth: undefined,
            hasSubTotal: false,
            isMultilined: false,
            newLineSeparator: ''
          },
          // DATES
          {
            data: ["12/10/1977", "10/10/2005", "10/10/1987"],
            style: {
              font: SmzExcelFontDefinitions.Calibri,
              fontSize: 12,
              bold: false,
              italic: false,
              underline: false,
              fontColor: null,
            },
            dataType: SmzExcelDataDefinitions.DateTime,
            dataFormat: 'dd/MM/yyyy',
            maxWidth: undefined,
            hasSubTotal: false,
            isMultilined: false,
            newLineSeparator: ''
          },
        ]
      }
    ],
    charts: []
  }
}