import { getCurrencySymbol, getLocaleCurrencyCode } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { GlobalInjector } from '../../common/services/global-injector';
import { getWidthInPoints } from '../../modules/smz-excels/functions/smz-excel-convertions';
import { SmzExcelDataDefinitions } from '../../modules/smz-excels/models/smz-excel-definitions';
import { SmzExcelColumn } from '../../modules/smz-excels/models/smz-excel-table';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzExcelsTableColumnsBuilder } from './excels-table-columns';


export class SmzExcelsTableColumnTextBuilder extends SmzBuilderUtilities<SmzExcelsTableColumnTextBuilder> {
  protected that = this;

  constructor(protected _builder: SmzExcelsTableColumnsBuilder, protected _state: SmzExcelColumn) {
    super();

    this._state.dataType = SmzExcelDataDefinitions.Text;
  }

  public setMaxWidthInPixels(maxWidth: number, resolution: number = undefined): SmzExcelsTableColumnTextBuilder {
    this._state.maxWidth = getWidthInPoints(maxWidth, resolution);
    return this.that;
  }

  public setMaxWidthInPoints(maxWidth: number): SmzExcelsTableColumnTextBuilder {
    this._state.maxWidth = maxWidth;
    return this.that;
  }

  public get column(): SmzExcelsTableColumnsBuilder {
    return this._builder;
  }

}

export class SmzExcelsTableColumnNumberBuilder extends SmzBuilderUtilities<SmzExcelsTableColumnNumberBuilder> {
  protected that = this;

  constructor(protected _builder: SmzExcelsTableColumnsBuilder, protected _state: SmzExcelColumn) {
    super();

    this._state.dataType = SmzExcelDataDefinitions.Number;

    const locale = GlobalInjector.instance.get(LOCALE_ID);

    const currencySymbol = getCurrencySymbol(getLocaleCurrencyCode(locale), 'wide', locale);
    const numberFormat = '0.00'; // Intl.NumberFormat(this.locale, { style: 'decimal', minimumFractionDigits: 2}).format(0);

    this._state.dataFormat = `${currencySymbol} ${numberFormat}`;
  }

  public setMaxWidthInPixels(maxWidth: number, resolution: number = undefined): SmzExcelsTableColumnNumberBuilder {
    this._state.maxWidth = getWidthInPoints(maxWidth, resolution);
    return this.that;
  }

  public setMaxWidthInPoints(maxWidth: number): SmzExcelsTableColumnNumberBuilder {
    this._state.maxWidth = maxWidth;
    return this.that;
  }

  public setFormat(format: string): SmzExcelsTableColumnNumberBuilder {
    this._state.dataFormat = format;
    return this;
  }

  public get column(): SmzExcelsTableColumnsBuilder {
    return this._builder;
  }

}

export class SmzExcelsTableColumnBooleanBuilder extends SmzBuilderUtilities<SmzExcelsTableColumnBooleanBuilder> {
  protected that = this;

  constructor(protected _builder: SmzExcelsTableColumnsBuilder, protected _state: SmzExcelColumn) {
    super();

    this._state.dataType = SmzExcelDataDefinitions.Boolean;
  }

  public setMaxWidthInPixels(maxWidth: number, resolution: number = undefined): SmzExcelsTableColumnBooleanBuilder {
    this._state.maxWidth = getWidthInPoints(maxWidth, resolution);
    return this.that;
  }

  public setMaxWidthInPoints(maxWidth: number): SmzExcelsTableColumnBooleanBuilder {
    this._state.maxWidth = maxWidth;
    return this.that;
  }

  public get column(): SmzExcelsTableColumnsBuilder {
    return this._builder;
  }

}

export class SmzExcelsTableColumnHyperlinkBuilder extends SmzBuilderUtilities<SmzExcelsTableColumnHyperlinkBuilder> {
  protected that = this;

  constructor(protected _builder: SmzExcelsTableColumnsBuilder, protected _state: SmzExcelColumn) {
    super();

    this._state.dataType = SmzExcelDataDefinitions.HyperLink;
  }

  public setMaxWidthInPixels(maxWidth: number, resolution: number = undefined): SmzExcelsTableColumnHyperlinkBuilder {
    this._state.maxWidth = getWidthInPoints(maxWidth, resolution);
    return this.that;
  }

  public setMaxWidthInPoints(maxWidth: number): SmzExcelsTableColumnHyperlinkBuilder {
    this._state.maxWidth = maxWidth;
    return this.that;
  }

  public get column(): SmzExcelsTableColumnsBuilder {
    return this._builder;
  }

}