import { Observable } from 'rxjs';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzGaugeState, SmzGaugeThreshold } from '../../modules/smz-gauge/smz-gauge.types';

export class SmzGaugeBuilder extends SmzBuilderUtilities<SmzGaugeBuilder> {
  protected that = this;
  private _state: SmzGaugeState = {
    debugMode: false,
    size: 200,
    title: null,
    titleStyle: 'font-bold text-2xl',
    showTitle: false,
    value$: null,
    valueThrottleTime: 300,
    valuePipeFormat: "1.0-0",
    valueFontWeight: "bold",
    valueFontColor: "#000000",
    minMaxPipeFormat: "1.0-0",
    minMaxFontWeight: "bold",
    minMaxFontColor: "#000000",
    min: 0,
    max: 100,
    showMin: true,
    showMax: true,
    unit: null,
    showUnit: true,
    backgroundColor: '#e6e6e6',
    thresholds: []
  };
  constructor() {
    super();
  }

  public withDebugMode(debugMode: boolean): SmzGaugeBuilder {
    this._state.debugMode = debugMode;
    return this;
  }

  public withSize(size: number): SmzGaugeBuilder {
    if (size < 100) {
      throw new Error('SmzGaugeBuilder: Size must be a positive number');
    }

    this._state.size = size;
    return this;
  }

  public withTitle(title: string): SmzGaugeBuilder {
    this._state.title = title;
    this._state.showTitle = true;
    return this;
  }

  public withTitleStyle(titleStyle: string): SmzGaugeBuilder {
    this._state.titleStyle = titleStyle;
    return this;
  }

  public withValue(value$: Observable<number>): SmzGaugeBuilder {
    this._state.value$ = value$;
    return this;
  }

  public withValueThrottleTime(valueThrottleTime: number): SmzGaugeBuilder {
    this._state.valueThrottleTime = valueThrottleTime;
    return this;
  }

  public withDecimalPlaces(decimalPlaces: number, includeMinMax: boolean = false): SmzGaugeBuilder {

    if (decimalPlaces < 0) {
      throw new Error('SmzGaugeBuilder: Decimal places must be a positive number');
    }

    if (decimalPlaces > 3) {
      throw new Error('SmzGaugeBuilder: Decimal places must be less than 3');
    }

    this._state.valuePipeFormat  =`1.${decimalPlaces}-${decimalPlaces}`;

    if (includeMinMax) {
      this._state.minMaxPipeFormat = `1.${decimalPlaces}-${decimalPlaces}`;
    }

    return this;
  }

  public withRange(min: number, max: number): SmzGaugeBuilder {
    this._state.min = min;
    this._state.max = max;
    return this;
  }

  public hideMinMax(): SmzGaugeBuilder {
    this._state.showMin = false;
    this._state.showMax = false;
    return this;
  }

  public withUnit(unit: string): SmzGaugeBuilder {
    this._state.unit = unit;
    this._state.showUnit = true;
    return this;
  }

  public withFont(fontWeight: string, fontColor: string): SmzGaugeBuilder {
    this._state.valueFontWeight = fontWeight;
    this._state.valueFontColor = fontColor;
    return this;
  }

  public withMinMaxFont(fontWeight: string, fontColor: string): SmzGaugeBuilder {
    this._state.minMaxFontWeight = fontWeight;
    this._state.minMaxFontColor = fontColor;
    return this;
  }

  public withBackgroundColor(backgroundColor: string): SmzGaugeBuilder {
    this._state.backgroundColor = backgroundColor;
    return this;
  }

  public addThreshold(): SmzGaugeThresholdBuilder {

    const threshold: SmzGaugeThreshold = {
      value: 0,
      color: getRandomColor()
    };

    this._state.thresholds.push(threshold);
    return new SmzGaugeThresholdBuilder(this, threshold);
  }

  public build(): SmzGaugeState {
    this._state.thresholds.sort((a, b) => a.value - b.value);
    return this._state;
  }
}

function getRandomColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}


export class SmzGaugeThresholdBuilder extends SmzBuilderUtilities<SmzGaugeThresholdBuilder> {
  protected that = this;

  constructor(private _parent: SmzGaugeBuilder, private _threshold: SmzGaugeThreshold) {
    super();
  }

  public withValue(value: number): SmzGaugeThresholdBuilder {
    this._threshold.value = value;
    return this;
  }

  public withColor(color: string): SmzGaugeThresholdBuilder {
    this._threshold.color = color;
    return this;
  }

  public get gauge(): SmzGaugeBuilder {
    return this._parent;
  }

  public build(): SmzGaugeThreshold {
    return this._threshold;
  }

}

