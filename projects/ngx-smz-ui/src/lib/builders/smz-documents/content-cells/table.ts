import { Store } from '@ngxs/store';
import cloneDeep from 'lodash-es/cloneDeep';
import { Observable, of } from 'rxjs';
import { GlobalInjector } from '../../../common/services/global-injector';
import { SmzDocumentCell } from '../../../modules/smz-documents/models/smz-document';
import { SmzDocumentTable, SmzDocumentTableColumn } from '../../../modules/smz-documents/models/smz-document-features';
import { SmzDocumentBaseCellBuilder, SmzDocumentWidthTypes } from '../document-base-cell';
import { SmzDocumentBuilder } from '../document-builder';
import { SmzDocumentRowBuilder } from '../document-content';

export class SmzCellTableBuilder extends SmzDocumentBaseCellBuilder<SmzCellTableBuilder> {
  protected that = this;
  constructor(public _rowBuilder: SmzDocumentRowBuilder, public _cell: SmzDocumentCell, public _data: SmzDocumentTable, public _documentBuilder: SmzDocumentBuilder) {
    super(_rowBuilder, _cell, _data, _documentBuilder);
    const defaultConfig = cloneDeep(this._documentBuilder._state.config);
    _data.container = { styles: defaultConfig.tables.container };
    _data.header = { styles: defaultConfig.tables.header.container, isVisible: false, columns: [] };
    _data.content = { styles: defaultConfig.tables.content };
  }

  // public setWidth(width: SmzDocumentWidthTypes): SmzCellTableBuilder {
  //   let newWidth = 'unset';

  //   if (width !== 'auto')
  //   {
  //     const size = Number(width.split('-')[1]);
  //     newWidth = `${(100/12) * size}%`;
  //   }

  //   this._cell.width = newWidth;
  //   return this;
  // }

  public overrideContainerStyles(styleClass: string): SmzCellTableBuilder {
    this._data.container.styles = styleClass;
    return this.that;
  }

  public addContainerStyles(styleClass: string): SmzCellTableBuilder {
    this._data.container.styles += ' ' + styleClass;
    return this.that;
  }

  public useBorder(): SmzCellTableBuilder {
    return this.addContainerStyles('smz-document-border');
  }

  public setContainerBackgroundColor(color: string): SmzCellTableBuilder {
    this._data.container.background = `${color} !important`;
    return this.that;
  }

  public overrideStyles(header?: string, content?: string): SmzCellTableBuilder {
    this._data.header.styles = header ?? this._data.header.styles;
    this._data.content.styles = content ?? this._data.content.styles;
    return this.that;
  }

  public setBackgroundColor(header?: string, content?: string): SmzCellTableBuilder {
    this._data.header.background = header ?? this._data.header.background;
    this._data.content.background = content ?? this._data.content.background;
    return this.that;
  }

  public setTextColor(header?: string, content?: string): SmzCellTableBuilder {
    this._data.header.color = header ?? this._data.header.color;
    this._data.content.color = content ?? this._data.content.color;
    return this.that;
  }

  public addColumn(property: string, label?: string): SmzCellTableColumnBuilder {
    this._data.header.isVisible = true;
    return new SmzCellTableColumnBuilder(this, property, label, this._documentBuilder);
  }

  public setSource(selector?: any, items$?: Observable<any[]>, items?: any[]): SmzCellTableBuilder {
    if (selector != null) {
      const store = GlobalInjector.instance.get(Store);
      this._data.content.items$ = store.select(selector);
    }
    else if (items$ != null) {
      this._data.content.items$ = items$;
    }
    else if (items != null) {
      this._data.content.items$ = of(items);
    }
    else {
      throw new Error(`You need to provide at least one type of items to the table (setSource())`);
    }
    return this.that;
  }

}

export class SmzCellTableColumnBuilder {
  private _data: SmzDocumentTableColumn;
  constructor(public _tableBuilder: SmzCellTableBuilder, property: string, label: string, public _documentBuilder: SmzDocumentBuilder) {

    const defaultConfig = cloneDeep(this._documentBuilder._state.config);

    this._data = {
      colspan: 1,
      rowspan: 1,
      height: 'auto',
      width: 'auto',
      value: label,
      property,
      dataTransform: null,
      headerStyles: {
        styles: defaultConfig.tables.header.columns
      },
      contentStyles: {
        styles: defaultConfig.tables.content
      }
    };

    this._tableBuilder._data.header.columns.push(this._data)

  }

  // public setRowspan(rowsCount: number): SmzCellTableColumnBuilder {
  //   this._data.rowspan = rowsCount;
  //   return this;
  // }

  // public setColspan(colsCount: number): SmzCellTableColumnBuilder {
  //   this._data.colspan = colsCount;
  //   return this;
  // }

  public setHeight(height: string): SmzCellTableColumnBuilder {
    this._data.height = height;
    return this;
  }

  public setWidth(width: SmzDocumentWidthTypes): SmzCellTableColumnBuilder {
    let newWidth = 'unset';

    if (width !== 'auto')
    {
      const size = Number(width.split('-')[1]);
      newWidth = `${(100/12) * size}%`;
    }

    this._data.width = newWidth;
    return this;
  }

  public overrideStyles(header?: string, content?: string): SmzCellTableColumnBuilder {
    this._data.headerStyles.styles = header ?? this._data.headerStyles.styles;
    this._data.contentStyles.styles = content ?? this._data.contentStyles.styles;
    return this;
  }

  public setBackgroundColor(header?: string, content?: string): SmzCellTableColumnBuilder {
    this._data.headerStyles.background = header ?? this._data.headerStyles.background;
    this._data.contentStyles.background = content ?? this._data.contentStyles.background;
    return this;
  }

  public setTextColor(header?: string, content?: string): SmzCellTableColumnBuilder {
    this._data.headerStyles.color = header ?? this._data.headerStyles.color;
    this._data.contentStyles.color = content ?? this._data.contentStyles.color;
    return this;
  }

  public useCentralized(): SmzCellTableColumnBuilder {
    this._data.contentStyles.styles += ' items-center text-center';
    this._data.headerStyles.styles += ' items-center text-center';
    return this;
  }

  public dataTransform(callback: (value: string, row: any, index: number) => string): SmzCellTableColumnBuilder {
    this._data.dataTransform = callback;
    return this;
  }

  public get table(): SmzCellTableBuilder {
    return this._tableBuilder;
  }

}