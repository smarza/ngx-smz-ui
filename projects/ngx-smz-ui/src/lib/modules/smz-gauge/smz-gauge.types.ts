import { Observable } from 'rxjs';

export interface SmzGaugeState {
  // Title of the gauge
  title: string;

  // Show the title of the gauge
  showTitle: boolean;

  // Value of the gauge
  value$: Observable<number>;

  // Number pipe format of the value
  numberPipeFormat: string;

  // Min and Max of the gauge
  min: number;
  max: number;

  // Show the min of the gauge
  showMin: boolean;

  // Show the max of the gauge
  showMax: boolean;

  // Unit of the gauge
  unit: string;

  // Show the unit of the gauge
  showUnit: boolean;

  // Thresholds of the gauge
  thresholds: SmzGaugeThreshold[];
}

export interface SmzGaugeThreshold {
  // Value of the threshold
  value: number;

  // Hexadecimal color of the threshold
  color: string;

}