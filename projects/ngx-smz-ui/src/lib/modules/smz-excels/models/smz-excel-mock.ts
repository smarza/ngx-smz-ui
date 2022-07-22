import { SmzCreateExcelTable } from './smz-excel-table';
import { SmzExcelDataDefinitions, SmzExcelFontDefinitions, SmzExcelSortDefinitions, SmzExcelThemeDefinitions } from './smz-excel-definitions';

export const SmzExcelMockData: SmzCreateExcelTable = {
  workbookModel: {
    fileName: 'MyOutput.xlsx',
    theme: SmzExcelThemeDefinitions.TableStyleLight2,
    title: 'Basniak\'s Awesome Table',
    author: 'Basniak',
    dateCreated: '19/07/2022 12:34',
    company: 'Basniak\'s awesome library',
    comments: 'Awesome Excel Generation',
    isDraft: true,
    watermark: {
      text: 'Rascunho',
      alpha: 0.3,
      textColor: 'lightcoral',
      font: SmzExcelFontDefinitions.CourierNew,
      rotationAngle: 45,
      fontSize: 80
    },
    sheets: [
      {
        name: 'Custom Spreadsheet Name',
        shouldSort: true,
        matchCase: false,
        ignoreBlanks: true,
        sortColumn: 2,
        sortOrder: SmzExcelSortDefinitions.Ascending,
        header: {
          data: ['Tag', 'Plant', 'Numbers', 'Dates'],
          style: {
            font: SmzExcelFontDefinitions.Calibri,
            fontSize: 14,
            bold: true,
            italic: false,
            dataType: SmzExcelDataDefinitions.Text,
            dataFormat: null,
            maxWidth: null
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
              dataType: SmzExcelDataDefinitions.Text,
              dataFormat: null,
              maxWidth: null
            }
          },
          // PLANT
          {
            data: ["i", "h", "g", "f", "j"],
            style: {
              font: SmzExcelFontDefinitions.Calibri,
              fontSize: 12,
              bold: false,
              italic: false,
              dataType: SmzExcelDataDefinitions.Text,
              dataFormat: null,
              maxWidth: null
            }
          },
          // NUMBERS
          {
            data: ["1.1", "2.2", "3.4", "4", "5", "6.6", "7.9"],
            style: {
              font: SmzExcelFontDefinitions.Calibri,
              fontSize: 12,
              bold: false,
              italic: false,
              dataType: SmzExcelDataDefinitions.DateTime,
              dataFormat: '0.00',
              maxWidth: null
            }
          },
          // DATES
          {
            data: ["12/10/1977", "18/10/2005", "16/10/1987"],
            style: {
              font: SmzExcelFontDefinitions.Calibri,
              fontSize: 12,
              bold: false,
              italic: false,
              dataType: SmzExcelDataDefinitions.DateTime,
              dataFormat: 'dd/MM/yyyy',
              maxWidth: null
            }
          },
        ]
      }
    ]
  }
}