import { SmzExcelFontDefinitions } from '../../modules/smz-excels/models/smz-excel-definitions';
import { SmzExcelStyle } from '../../modules/smz-excels/models/smz-excel-table';

export class SmzExcelsStylesBuilder<T> {


  constructor(private _builder: T, private _state: SmzExcelStyle) {

  }

  public setFont(font: SmzExcelFontDefinitions): SmzExcelsStylesBuilder<T> {
    this._state.font = font;
    return this;
  }

  public setFontSize(fontSize: number): SmzExcelsStylesBuilder<T> {
    this._state.fontSize = fontSize;
    return this;
  }

  public enableBold(): SmzExcelsStylesBuilder<T> {
    this._state.bold = true;
    return this;
  }

  public enableItalic(): SmzExcelsStylesBuilder<T> {
    this._state.italic = true;
    return this;
  }

  public get apply(): T {
    return this._builder;
  }
}
