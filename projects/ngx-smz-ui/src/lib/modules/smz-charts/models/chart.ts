export type SmzChartTypes =
| 'bar'
| 'line'
| 'scatter'
| 'bubble'
| 'pie'
| 'doughnut'
| 'polarArea'
| 'radar';

export interface SmzChart {
  config: any;
  data: any;
  type: SmzChartTypes;
}