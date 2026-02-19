import { ChartDataset } from '@models/chart-dataset';

export interface ChartData {
  labels: string[];
  type: string;
  datasets: ChartDataset[];
  normalize: boolean;
  min?: number;
  max?: number;
}
