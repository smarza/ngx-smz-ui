import { ChartData } from '@models/chart-data';
import { TableData } from '@models/table-data';

export interface VisualizationPanel {
  title: string;
  chartData: ChartData;
  tableData: TableData;
}
