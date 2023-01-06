import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzTableBuilder } from './state-builder';

export class SmzTableExcelBuilder extends SmzBuilderUtilities<SmzTableExcelBuilder> {

  protected that = this;
  constructor(private _builder: SmzTableBuilder) {
    super();

    this._builder._state.caption.isVisible = true;
    this._builder._state.caption.exportToExcel.isButtonVisible = true;

  }

  public setFilename(filename: string): SmzTableExcelBuilder {
    this._builder._state.caption.exportToExcel.filename = filename;
    return this.that;
  }

  public useHyperlinkAsHtml(): SmzTableExcelBuilder {
    this._builder._state.caption.exportToExcel.exportHyperLinkAsHtml = true;
    return this.that;
  }

  public setDateFormat(format: string): SmzTableExcelBuilder {
    this._builder._state.caption.exportToExcel.globalDateFormat = format;
    return this.that;
  }

  public setNewLineSeparator(separator: string): SmzTableExcelBuilder {
    this._builder._state.caption.exportToExcel.globalNewLineSeparator = separator;
    return this.that;
  }

  public setMaxFilenameLength(length: number): SmzTableExcelBuilder {
    this._builder._state.caption.exportToExcel.maxFilenameLength = length;
    return this.that;
  }

  public setShortenSuffix(suffix: string): SmzTableExcelBuilder {
    this._builder._state.caption.exportToExcel.maxFilenameShortenSuffix = suffix;
    return this.that;
  }

  public setUserAsAuthor(): SmzTableExcelBuilder {
    this._builder._state.caption.exportToExcel.includeUserAsAuthor = true;
    return this.that;
  }

  public get excel(): SmzTableBuilder {
    return this._builder;
  }
}
