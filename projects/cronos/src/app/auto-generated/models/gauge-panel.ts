import { GaugeThreshold } from '@models/gauge-threshold';

export interface GaugePanel {
  title: string;
  currentValue: number;
  minimumValue: number;
  maximumValue: number;
  unit: string;
  thresholds: GaugeThreshold[];
}
