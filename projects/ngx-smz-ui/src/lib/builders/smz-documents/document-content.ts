
import { SmzDocumentCell, SmzDocumentRow, SmzDocumentContent } from '../../modules/smz-documents/models/smz-document';
import { SmzDocumentTitle, SmzDocumentFeatureDefinitions, SmzDocumentDivider, SmzDocumentField, SmzDocumentImage, SmzDocumentSpacer, SmzDocumentSubTitle, SmzDocumentFieldsGroup, SmzDocumentTable, SmzDocumentChart, SmzDocumentPageBreak, SmzDocumentComponent, SmzDocumentHiddenBreak } from '../../modules/smz-documents/models/smz-document-features';
import { SmzDocumentBuilder } from './document-builder';
import { UUID } from 'angular2-uuid';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzChart } from '../../modules/smz-charts/models/chart';
import { cloneDeep } from 'lodash-es';
import { SmzCellChartBuilder } from './content-cells/chart';
import { SmzCellTableBuilder } from './content-cells/table';
import { SmzCellTitleBuilder } from './content-cells/title';
import { SmzCellDividerBuilder } from './content-cells/divider';
import { SmzCellFieldBuilder } from './content-cells/field';
import { SmzCellFieldsGroupBuilder } from './content-cells/fields-group';
import { SmzCellImageBuilder } from './content-cells/image';
import { SmzCellPageBreakBuilder } from './content-cells/page-break';
import { SmzCellSpacerBuilder } from './content-cells/spacer';
import { SmzCellSubTitleBuilder } from './content-cells/sub-title';
import { SmzCellComponentBuilder } from './content-cells/component';
import { SmzInjectableComponent } from '../../common/modules/inject-content/models/injectable.model';
import { SmzCellHiddenBreakBuilder } from './content-cells/hidden-break';

export class SmzDocumentContentBuilder extends SmzBuilderUtilities<SmzDocumentContentBuilder> {
  protected that = this;
  constructor(private _documentBuilder: SmzDocumentBuilder, private _content: SmzDocumentContent) {
    super();
    const defaultConfig = cloneDeep(this._documentBuilder._state.config);
    _content.container = { styles: defaultConfig.contents.container };

    if (this._documentBuilder._state.isDebug) {
      this._content.container.styles += ' border-dashed border-2 border-violet-500';
    }
  }
  public row(): SmzDocumentRowBuilder {
    const row: SmzDocumentRow = { id: UUID.UUID(), cells: [] };
    this._content.rows.push(row)
    return new SmzDocumentRowBuilder(this, row, this._documentBuilder, this._content);
  }

  public overrideContainerStyles(styleClass: string): SmzDocumentContentBuilder {
    this._content.container.styles = styleClass;
    return this.that;
  }

  public addContainerStyles(styleClass: string): SmzDocumentContentBuilder {
    this._content.container.styles += ' ' + styleClass;
    return this.that;
  }

  public useFixedLayout(): SmzDocumentContentBuilder {
    return this.addContainerStyles('table-fixed');
  }

  public get document(): SmzDocumentBuilder {
    return this._documentBuilder;
  }
}
export class SmzDocumentRowBuilder extends SmzBuilderUtilities<SmzDocumentRowBuilder>{
  protected that = this;
  constructor(private _contentBuilder: SmzDocumentContentBuilder, private _row: SmzDocumentRow, private _documentBuilder: SmzDocumentBuilder, private _content: SmzDocumentContent) {
    super();
  }

  public title(text: string): SmzCellTitleBuilder {
    const cell: SmzDocumentCell = { colspan: 1, rowspan: 1, height: '100%', width: 'auto', data: null };
    this._row.cells.push(cell)
    const item: SmzDocumentTitle = { type: SmzDocumentFeatureDefinitions.TITLE, text: { value: text } };
    cell.data = item;
    return new SmzCellTitleBuilder(this, cell, item, this._documentBuilder);
  }

  public divider(): SmzCellDividerBuilder {
    const cell: SmzDocumentCell = { colspan: 1, rowspan: 1, height: '100%', width: 'auto', data: null };
    this._row.cells.push(cell)
    const item: SmzDocumentDivider = { type: SmzDocumentFeatureDefinitions.DIVIDER };
    cell.data = item;
    return new SmzCellDividerBuilder(this, cell, item, this._documentBuilder);
  }

  public pageBreak(): SmzCellPageBreakBuilder {

    if (this._documentBuilder._state.renderer == 'jspdf') {
      throw new Error(`Page Break doen't work with jspdf renderer`);
    }

    const cell: SmzDocumentCell = { colspan: 1, rowspan: 1, height: '100%', width: 'auto', data: null };
    this._row.cells.push(cell)
    const item: SmzDocumentPageBreak = { type: SmzDocumentFeatureDefinitions.PAGE_BREAK };
    cell.data = item;
    return new SmzCellPageBreakBuilder(this, cell, item, this._documentBuilder);
  }

  public field(text: string, label?: string): SmzCellFieldBuilder {
    const cell: SmzDocumentCell = { colspan: 1, rowspan: 1, height: '100%', width: 'auto', data: null };
    this._row.cells.push(cell)
    const item: SmzDocumentField = { type: SmzDocumentFeatureDefinitions.FIELD, text: { value: text }, label: { value: label, isVisible: label != null } };
    cell.data = item;
    return new SmzCellFieldBuilder(this, cell, item, this._documentBuilder);
  }

  public image(src: string): SmzCellImageBuilder {
    const cell: SmzDocumentCell = { colspan: 1, rowspan: 1, height: '100%', width: 'auto', data: null };
    this._row.cells.push(cell)
    const item: SmzDocumentImage = { type: SmzDocumentFeatureDefinitions.IMAGE, image: { src, width: '100%' } };
    cell.data = item;
    return new SmzCellImageBuilder(this, cell, item, this._documentBuilder);
  }

  public spacer(): SmzCellSpacerBuilder {
    const cell: SmzDocumentCell = { colspan: 1, rowspan: 1, height: '100%', width: 'auto', data: null };
    this._row.cells.push(cell)
    const item: SmzDocumentSpacer = { type: SmzDocumentFeatureDefinitions.SPACER, height: '100%' };
    cell.data = item;
    return new SmzCellSpacerBuilder(this, cell, item, this._documentBuilder);
  }

  public hiddenBreak(): SmzCellHiddenBreakBuilder {
    const cell: SmzDocumentCell = { colspan: 1, rowspan: 1, height: '100%', width: 'auto', data: null };
    this._row.cells.push(cell)
    const item: SmzDocumentHiddenBreak = { type: SmzDocumentFeatureDefinitions.HIDDEN_BREAK, height: '100%' };
    cell.data = item;
    return new SmzCellHiddenBreakBuilder(this, cell, item, this._documentBuilder);
  }

  public subTitle(text: string): SmzCellSubTitleBuilder {
    const cell: SmzDocumentCell = { colspan: 1, rowspan: 1, height: '100%', width: 'auto', data: null };
    this._row.cells.push(cell)
    const item: SmzDocumentSubTitle = { type: SmzDocumentFeatureDefinitions.SUB_TITLE, text: { value: text } };
    cell.data = item;
    return new SmzCellSubTitleBuilder(this, cell, item, this._documentBuilder);
  }

  public group(): SmzCellFieldsGroupBuilder {
    const cell: SmzDocumentCell = { colspan: 1, rowspan: 1, height: '100%', width: 'auto', data: null };
    this._row.cells.push(cell)
    const item: SmzDocumentFieldsGroup = { type: SmzDocumentFeatureDefinitions.FIELDS_GROUP, fields: [] };
    cell.data = item;
    return new SmzCellFieldsGroupBuilder(this, cell, item, this._documentBuilder);
  }

  public table(): SmzCellTableBuilder {
    const cell: SmzDocumentCell = { colspan: 1, rowspan: 1, height: '100%', width: 'auto', data: null };
    this._row.cells.push(cell)
    const item: SmzDocumentTable = { type: SmzDocumentFeatureDefinitions.TABLE };
    cell.data = item;
    return new SmzCellTableBuilder(this, cell, item, this._documentBuilder);
  }

  public chart(chartData: SmzChart): SmzCellChartBuilder {
    const cell: SmzDocumentCell = { colspan: 1, rowspan: 1, height: '100%', width: 'auto', data: null };
    this._row.cells.push(cell)
    const item: SmzDocumentChart = { type: SmzDocumentFeatureDefinitions.CHART, content: { chartData }, flexWidth: 'col' };
    cell.data = item;
    return new SmzCellChartBuilder(this, cell, item, this._documentBuilder);
  }

  public component(component: any): SmzCellComponentBuilder {
    const cell: SmzDocumentCell = { colspan: 1, rowspan: 1, height: '100%', width: 'auto', data: null };
    this._row.cells.push(cell);
    const injectable: SmzInjectableComponent = { component, inputs: [], outputs: [], styleClass: 'w-full h-full' };
    const item: SmzDocumentComponent = { type: SmzDocumentFeatureDefinitions.COMPONENT, content: { component: injectable }, flexWidth: 'col' };
    cell.data = item;
    return new SmzCellComponentBuilder(this, cell, item, this._documentBuilder);
  }

  public get content(): SmzDocumentContentBuilder {

    const colsCount = this._row.cells.map(x => x.colspan).reduce((a, b) => (a + b));
    const currentIndex = this._content.rows.findIndex(x => x.id === this._row.id);
    const rowsBefore = this._content.rows.slice(0, currentIndex);

    let cellsMerging = 0;
    rowsBefore.reverse().forEach((x, i) => {
      const test = x.cells.filter(c => c.rowspan !== 1 && c.rowspan > i);
      if (test.length > 0) {
        cellsMerging += test.length;
      }
    });

    if ((colsCount + cellsMerging) > this._content.colsCount) {
      this._content.colsCount = colsCount;
    }
    return this._contentBuilder;
  }
}
