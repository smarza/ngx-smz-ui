import { SmzExcelColorDefinitions, SmzExcelFontDefinitions } from '../../modules/smz-excels/models/smz-excel-definitions';
import { SmzExcelWatermarkSheet } from '../../modules/smz-excels/models/smz-excel-table';
import { SmzExcelsBuilder } from './excels-builder';

export class SmzExcelsDraftBuilder {

  constructor(private _builder: SmzExcelsBuilder, private _state: SmzExcelWatermarkSheet) {

  }

  // public setOpacity(opacity: number): SmzExcelsDraftBuilder {
  //   this._state.alpha = opacity;
  //   return this;
  // }

  public setColor(hexColor: string): SmzExcelsDraftBuilder {
    this._state.fontColor = hexColor;
    return this;
  }

  public setFont(font: SmzExcelFontDefinitions): SmzExcelsDraftBuilder {
    this._state.font = font;
    return this;
  }

  public setRotationAngle(rotationAngle: number): SmzExcelsDraftBuilder {
    this._state.rotationAngle = rotationAngle;
    return this;
  }

  public setFontSize(fontSize: number): SmzExcelsDraftBuilder {
    this._state.fontSize = fontSize;
    return this;
  }


  public get excels(): SmzExcelsBuilder {
    return this._builder;
  }
}
