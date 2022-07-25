import { SmzExcelColorDefinitions, SmzExcelFontDefinitions, SmzExcelSortOrderDefinitions, SmzExcelThemeDefinitions } from '../../modules/smz-excels/models/smz-excel-definitions';
import { SmzCreateExcelTable, SmzExcelTableSheet } from '../../modules/smz-excels/models/smz-excel-table';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzExcelsDraftBuilder } from './excels-draft';
import { SmzExcelsSheetsBuilder } from './excels-sheets';

export class SmzExcelsBuilder extends SmzBuilderUtilities<SmzExcelsBuilder> {
  protected that = this;
  public _state: SmzCreateExcelTable = {
    workbookModel: {
      fileName: 'excel',
      title: '',
      author: '',
      company: '',
      comments: '',
      isDraft: false,
      watermark: undefined,
      sheets: []
    }
  };
  constructor() {
    super();
  }

  public setFilename(fileName: string): SmzExcelsBuilder {
    this._state.workbookModel.fileName = fileName ?? 'excel';
    return this;
  }

  public setTitle(title: string): SmzExcelsBuilder {
    this._state.workbookModel.title = title;
    return this;
  }

  public setAuthor(author: string): SmzExcelsBuilder {
    this._state.workbookModel.author = author;
    return this;
  }

  public setCompany(company: string): SmzExcelsBuilder {
    this._state.workbookModel.company = company;
    return this;
  }

  public setComments(comments: string): SmzExcelsBuilder {
    this._state.workbookModel.comments = comments;
    return this;
  }

  public draft(text: string): SmzExcelsDraftBuilder {
    this._state.workbookModel.isDraft = true;

    this._state.workbookModel.watermark = {
      text,
      alpha: 0.3,
      textColor: SmzExcelColorDefinitions.Red,
      font: SmzExcelFontDefinitions.CourierNew,
      rotationAngle: 45,
      fontSize: 80
    };

    return new SmzExcelsDraftBuilder(this, this._state.workbookModel.watermark);
  }

  public sheet(name: string): SmzExcelsSheetsBuilder {

    const sheet: SmzExcelTableSheet = {
      name: name?.slice(0, 30) ?? 'Excel',
      shouldSort: false,
      matchCase: false,
      ignoreBlanks: true,
      sortColumn: undefined,
      sortOrder: SmzExcelSortOrderDefinitions.Ascending,
      theme: SmzExcelThemeDefinitions.None,
      tabColor: SmzExcelColorDefinitions.NoColor,
      header: {
        data: [],
        style: {
          font: SmzExcelFontDefinitions.Calibri,
          fontSize: 14,
          bold: true,
          italic: false,
        }
      },
      columns: []
    };

    this._state.workbookModel.sheets.push(sheet);

    return new SmzExcelsSheetsBuilder(this, sheet);
  }

  public build(): SmzCreateExcelTable {
    return this._state;
  }
}