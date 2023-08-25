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

  public setAsMultilined(overrideNewlineSeparator?: string): SmzExcelsTableColumnTextBuilder
  {
    this._state.isMultilined = true;
    this._state.newLineSeparator = overrideNewlineSeparator ?? this._builder._.workbookModel.globalColumnBehavior.newLineSeparator;
    return this.that;
  }

  public get column(): SmzExcelsTableColumnsBuilder {
    return this._builder;
  }

}

export class SmzExcelsTableColumnDateBuilder extends SmzBuilderUtilities<SmzExcelsTableColumnDateBuilder> {
  protected that = this;

  constructor(protected _builder: SmzExcelsTableColumnsBuilder, protected _state: SmzExcelColumn) {
    super();

    this._state.dataType = SmzExcelDataDefinitions.DateTime;
  }

  public setMaxWidthInPixels(maxWidth: number, resolution: number = undefined): SmzExcelsTableColumnDateBuilder {
    this._state.maxWidth = getWidthInPoints(maxWidth, resolution);
    return this.that;
  }

  public setMaxWidthInPoints(maxWidth: number): SmzExcelsTableColumnDateBuilder {
    this._state.maxWidth = maxWidth;
    return this.that;
  }

  public setDateFormat(dataFormat: string): SmzExcelsTableColumnDateBuilder {
    this._state.dataFormat = dataFormat;
    return this.that;
  }

  public setAsMultilined(overrideNewlineSeparator?: string): SmzExcelsTableColumnDateBuilder
  {
    this._state.isMultilined = true;
    this._state.newLineSeparator = overrideNewlineSeparator ?? this._builder._.workbookModel.globalColumnBehavior.newLineSeparator;
    return this.that;
  }

  public get column(): SmzExcelsTableColumnsBuilder {
    return this._builder;
  }

}

export class SmzExcelsTableColumnAutoDetectBuilder extends SmzBuilderUtilities<SmzExcelsTableColumnAutoDetectBuilder> {
  protected that = this;

  constructor(protected _builder: SmzExcelsTableColumnsBuilder, protected _state: SmzExcelColumn) {
    super();

    this._state.dataType = SmzExcelDataDefinitions.AutoDetect;
  }

  public setMaxWidthInPixels(maxWidth: number, resolution: number = undefined): SmzExcelsTableColumnAutoDetectBuilder {
    this._state.maxWidth = getWidthInPoints(maxWidth, resolution);
    return this.that;
  }

  public setMaxWidthInPoints(maxWidth: number): SmzExcelsTableColumnAutoDetectBuilder {
    this._state.maxWidth = maxWidth;
    return this.that;
  }

  public setAsMultilined(overrideNewlineSeparator?: string): SmzExcelsTableColumnAutoDetectBuilder
  {
    this._state.isMultilined = true;
    this._state.newLineSeparator = overrideNewlineSeparator ?? this._builder._.workbookModel.globalColumnBehavior.newLineSeparator;
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
    this._state.dataFormat = null;
  }

  public useCurrencyFormat(currencySymbol?: string): SmzExcelsTableColumnNumberBuilder {
    const locale = GlobalInjector.instance.get(LOCALE_ID);

    const numberFormat = ' #,##0.00'; // Intl.NumberFormat(this.locale, { style: 'decimal', minimumFractionDigits: 2}).format(0);

    this._state.dataFormat = `${currencySymbol ?? getCurrencySymbol(getLocaleCurrencyCode(locale), 'wide', locale)} ${numberFormat}`;

    return this.that;
  }

  public usePercentageFormat(): SmzExcelsTableColumnNumberBuilder {
    this._state.dataFormat = '0.00 %';

    return this.that;
  }


  public setCustomFormat(format: string): SmzExcelsTableColumnNumberBuilder {
    this._state.dataFormat = format;

    return this.that;
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
    return this.that;
  }

  public useSubTotal(): SmzExcelsTableColumnNumberBuilder {
    this._state.hasSubTotal = true;
    return this.that;
  }

  public setAsMultilined(overrideNewlineSeparator?: string): SmzExcelsTableColumnNumberBuilder
  {
    this._state.isMultilined = true;
    this._state.newLineSeparator = overrideNewlineSeparator ?? this._builder._.workbookModel.globalColumnBehavior.newLineSeparator;
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

  public setAsMultilined(overrideNewlineSeparator?: string): SmzExcelsTableColumnHyperlinkBuilder
  {
    this._state.isMultilined = true;
    this._state.newLineSeparator = overrideNewlineSeparator ?? this._builder._.workbookModel.globalColumnBehavior.newLineSeparator;
    return this.that;
  }

  public get column(): SmzExcelsTableColumnsBuilder {
    return this._builder;
  }

}