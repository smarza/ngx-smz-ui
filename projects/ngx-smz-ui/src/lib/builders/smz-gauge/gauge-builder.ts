import { Observable } from 'rxjs';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzGaugeState, SmzGaugeThreshold } from '../../modules/smz-gauge/smz-gauge.types';

export class SmzGaugeBuilder extends SmzBuilderUtilities<SmzGaugeBuilder> {
  protected that = this;
  private _state: SmzGaugeState = {
    title: null,
    showTitle: false,
    value$: null,
    numberPipeFormat: "1.0-0",
    min: 0,
    max: 100,
    showMin: false,
    showMax: false,
    unit: null,
    showUnit: true,
    thresholds: []
  };
  constructor() {
    super();
  }

  public withTitle(title: string): SmzGaugeBuilder {
    this._state.title = title;
    this._state.showTitle = true;
    return this;
  }

  public withValue(value$: Observable<number>): SmzGaugeBuilder {
    this._state.value$ = value$;
    return this;
  }

  public withDecimalPlaces(decimalPlaces: number): SmzGaugeBuilder {

    if (decimalPlaces < 0) {
      throw new Error('SmzGaugeBuilder: Decimal places must be a positive number');
    }

    if (decimalPlaces > 3) {
      throw new Error('SmzGaugeBuilder: Decimal places must be less than 3');
    }

    this._state.numberPipeFormat  =`1.${decimalPlaces}-${decimalPlaces}`;
    return this;
  }

  public withMin(min: number): SmzGaugeBuilder {
    this._state.min = min;
    return this;
  }

  public withMax(max: number): SmzGaugeBuilder {
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

  public addThreshold(): SmzGaugeThresholdBuilder {

    const threshold: SmzGaugeThreshold = {
      value: 0,
      color: getRandomColor()
    };

    this._state.thresholds.push(threshold);
    return new SmzGaugeThresholdBuilder(this, threshold);
  }

  public build(): SmzGaugeState {
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

