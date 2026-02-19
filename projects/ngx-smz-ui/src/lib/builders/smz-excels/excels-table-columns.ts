import { cloneDeep } from 'lodash-es';
import { ObjectUtils } from 'primeng/utils';
import { SmzExcelDataDefinitions, SmzExcelFontDefinitions, SmzExcelSortOrderDefinitions } from '../../modules/smz-excels/models/smz-excel-definitions';
import { SmzExcelColumn, SmzExcelState, SmzExcelTableSheet } from '../../modules/smz-excels/models/smz-excel-table';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzExcelsTableColumnAutoDetectBuilder, SmzExcelsTableColumnDateBuilder, SmzExcelsTableColumnHyperlinkBuilder, SmzExcelsTableColumnNumberBuilder, SmzExcelsTableColumnTextBuilder } from './excels-table-base-column-content';
import { SmzExcelsTablesBuilder } from './excels-tables';

export class SmzExcelsTableColumnsBuilder extends SmzBuilderUtilities<SmzExcelsTableColumnsBuilder> {

  protected override that = this;
  private _dataProperties: string[] = [];
  private defaultColumn: SmzExcelColumn = {
    data: [],
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
  };

  constructor(private _builder: SmzExcelsTablesBuilder, public _: SmzExcelState, private _state: SmzExcelTableSheet) {
    super();
  }

  public auto(dataPropertyPath: string, header: string, sort?: SmzExcelSortOrderDefinitions): SmzExcelsTableColumnAutoDetectBuilder {

    this._state.header.data.push(header);
    this._dataProperties.push(dataPropertyPath);

    const column: SmzExcelColumn = { ...cloneDeep(this.defaultColumn) };

    // if (sort != null)
    //   this._sort(sort);

    this._state.columns.push(column);

    return new SmzExcelsTableColumnAutoDetectBuilder(this, column);
  }


  public text(dataPropertyPath: string, header: string, sort?: SmzExcelSortOrderDefinitions): SmzExcelsTableColumnTextBuilder {

    this._state.header.data.push(header);
    this._dataProperties.push(dataPropertyPath);

    const column: SmzExcelColumn = { ...cloneDeep(this.defaultColumn) };

    // if (sort != null)
    //   this._sort(sort);

    this._state.columns.push(column);

    return new SmzExcelsTableColumnTextBuilder(this, column);
  }

  public number(dataPropertyPath: string, header: string, sort?: SmzExcelSortOrderDefinitions): SmzExcelsTableColumnNumberBuilder {

    this._state.header.data.push(header);
    this._dataProperties.push(dataPropertyPath);

    const column: SmzExcelColumn = { ...cloneDeep(this.defaultColumn) };

    // if (sort != null)
    //   this._sort(sort);

    this._state.columns.push(column);

    return new SmzExcelsTableColumnNumberBuilder(this, column);
  }

  public hyperlink(dataPropertyPath: string, header: string, sort?: SmzExcelSortOrderDefinitions): SmzExcelsTableColumnHyperlinkBuilder {

    this._state.header.data.push(header);
    this._dataProperties.push(dataPropertyPath);

    const column: SmzExcelColumn = { ...cloneDeep(this.defaultColumn) };

    // if (sort != null)
    //   this._sort(sort);

    this._state.columns.push(column);

    return new SmzExcelsTableColumnHyperlinkBuilder(this, column);
  }

  public date(dataPropertyPath: string, header: string, sort?: SmzExcelSortOrderDefinitions): SmzExcelsTableColumnDateBuilder {

    this._state.header.data.push(header);
    this._dataProperties.push(dataPropertyPath);

    const column: SmzExcelColumn = { ...cloneDeep(this.defaultColumn) };

    // if (sort != null)
    //   this._sort(sort);

    this._state.columns.push(column);

    return new SmzExcelsTableColumnDateBuilder(this, column);
  }

  public setData(items: any[]): SmzExcelsTableColumnsBuilder
  {

    if (this._.isDebug) {
      console.log('SmzExcelsTableColumnsBuilder > setData');
      console.log('items', items);
      console.log('_dataProperties', this._dataProperties);
      console.log('this', this);
    }

    if (this._dataProperties.length === 0) {
      throw new Error(`Excel Builder => You need to set at least one column before set the data.`);
    }

    try {
      this._dataProperties.forEach((propertyPath, index) => {
        this._state.columns[index].data = items
          .map(x => ObjectUtils.resolveFieldData(x, propertyPath)?.toString() ?? '')
      });
    } catch (error) {
      console.warn(`Can't resolve all items on SmzExcelsTableColumnsBuilder.setData()`, error);
      console.log('items', items);
      console.log('_dataProperties', this._dataProperties);
      console.log('this', this);
    }

    return this;
  }

  // private _sort(order: SmzExcelSortOrderDefinitions): void {
  //   this._state.shouldSort = true;
  //   this._state.sortOrder = order;
  //   this._state.matchCase = false;
  //   this._state.sortColumn = this._state.header.data.length;
  // }

  public get table(): SmzExcelsTablesBuilder {
    return this._builder;
  }
}
