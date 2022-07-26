import { SmzExcelColorDefinitions, SmzExcelFontDefinitions, SmzExcelSortOrderDefinitions, SmzExcelThemeDefinitions, SmzExcelTypeDefinitions } from '../../modules/smz-excels/models/smz-excel-definitions';
import { SmzExcelState, SmzExcelTableSheet } from '../../modules/smz-excels/models/smz-excel-table';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzExcelsDraftBuilder } from './excels-draft';
import { SmzExcelsSheetsBuilder } from './excels-sheets';

export class SmzExcelsBuilder extends SmzBuilderUtilities<SmzExcelsBuilder> {
  protected that = this;
  public _state: SmzExcelState = {
    workbookModel: {
      fileName: 'excel',
      info: '',
      author: '',
      company: '',
      comments: '',
      isDraft: false,
      watermark: undefined,
      tables: [],
      charts: []
    }
  };
  constructor() {
    super();
  }

  public setFilename(fileName: string): SmzExcelsBuilder {
    this._state.workbookModel.fileName = fileName ?? 'excel';
    return this;
  }

  public setInfo(title: string): SmzExcelsBuilder {
    this._state.workbookModel.info = title;
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
      sheetType: SmzExcelTypeDefinitions.Table,
      tabIndex: this._state.workbookModel.tables.length + this._state.workbookModel.charts.length,
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

    this._state.workbookModel.tables.push(sheet);

    return new SmzExcelsSheetsBuilder(this, sheet);
  }

  public build(): SmzExcelState {
    return this._state;
  }
}