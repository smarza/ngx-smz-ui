import { Chart } from 'chart.js';

export interface SmzChartInteractionEvent<T> {
  chart: Chart;
  event: MouseEvent;
  value: T;
}