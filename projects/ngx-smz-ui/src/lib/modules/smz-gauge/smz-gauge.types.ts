import { Observable } from 'rxjs';

export interface SmzGaugeState {
  // Size in pixels of the gauge
  size: number;

  // Title of the gauge
  title: string;

  // Title style of the gauge
  titleStyle: string;

  // Show the title of the gauge
  showTitle: boolean;

  // Value of the gauge
  value$: Observable<number>;

  // Throttle time of the value
  valueThrottleTime: number;

  // Pipe format of the value
  valuePipeFormat: string;

  // Font weight of the value
  valueFontWeight: string;

  // Font color of the value
  valueFontColor: string;

  // Min and Max pipe format
  minMaxPipeFormat: string;

  // Font weight of the min and max
  minMaxFontWeight: string;

  // Font color of the min and max
  minMaxFontColor: string;

  // Min of the gauge
  min: number;

  // Max of the gauge
  max: number;

  // Show the min of the gauge
  showMin: boolean;

  // Show the max of the gauge
  showMax: boolean;

  // Unit of the gauge
  unit: string;

  // Show the unit of the gauge
  showUnit: boolean;

  // Background color of the gauge
  backgroundColor: string;

  // Thresholds of the gauge
  thresholds: SmzGaugeThreshold[];
}

export interface SmzGaugeThreshold {
  // Value of the threshold
  value: number;

  // Hexadecimal color of the threshold
  color: string;

}