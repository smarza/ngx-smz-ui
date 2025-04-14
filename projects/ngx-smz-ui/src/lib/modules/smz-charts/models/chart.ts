export type SmzChartTypes =
| 'bar'
| 'line'
| 'scatter'
| 'bubble'
| 'pie'
| 'doughnut'
| 'polarArea'
| 'radar'
| 'empty';

export interface SmzChart {
  config: any;
  data: any;
  type: SmzChartTypes;
}