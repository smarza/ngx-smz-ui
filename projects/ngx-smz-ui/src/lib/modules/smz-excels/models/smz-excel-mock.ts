import { SmzCreateExcelTable } from './smz-excel-table';
import { SmzExcelColorDefinitions, SmzExcelDataDefinitions, SmzExcelFontDefinitions, SmzExcelSortOrderDefinitions, SmzExcelThemeDefinitions } from './smz-excel-definitions';
import moment from 'moment';

export const SmzExcelMockData: SmzCreateExcelTable = {
  workbookModel: {
    fileName: 'MyOutput',
    title: 'Basniak\'s Awesome Table',
    author: 'Basniak',
    company: 'Basniak\'s awesome library',
    comments: 'Awesome Excel Generation',
    isDraft: true,
    watermark: {
      text: 'Rascunho',
      alpha: 0.3,
      textColor: SmzExcelColorDefinitions.LightCoral,
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
        sortOrder: SmzExcelSortOrderDefinitions.Ascending,
        theme: SmzExcelThemeDefinitions.TableStyleLight3,
        tabColor: SmzExcelColorDefinitions.LightCoral,
        header: {
          data: ['Tag', 'Plant', 'Numbers', 'Dates'],
          style: {
            font: SmzExcelFontDefinitions.Calibri,
            fontSize: 14,
            bold: true,
            italic: false,
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
            },
            dataType: SmzExcelDataDefinitions.Text,
            dataFormat: undefined,
            maxWidth: undefined
          },
          // PLANT
          {
            data: ["i", "h", "g", "f", "j"],
            style: {
              font: SmzExcelFontDefinitions.Calibri,
              fontSize: 12,
              bold: false,
              italic: false,
            },
            dataType: SmzExcelDataDefinitions.Text,
            dataFormat: undefined,
            maxWidth: undefined
          },
          // NUMBERS
          {
            data: ["1.1", "2.2", "3.4", "4", "5", "6.6", "7.9"],
            style: {
              font: SmzExcelFontDefinitions.Calibri,
              fontSize: 12,
              bold: false,
              italic: false,
            },
            dataType: SmzExcelDataDefinitions.DateTime,
            dataFormat: '0.00',
            maxWidth: undefined
          },
          // DATES
          {
            data: ["12/10/1977", "10/10/2005", "10/10/1987"],
            style: {
              font: SmzExcelFontDefinitions.Calibri,
              fontSize: 12,
              bold: false,
              italic: false,
            },
            dataType: SmzExcelDataDefinitions.DateTime,
            dataFormat: 'dd/MM/yyyy',
            maxWidth: undefined
          },
        ]
      }
    ]
  }
}