import { VisualizationPanel } from '@models/visualization-panel';
import { SummaryPanel } from '@models/summary-panel';
import { GaugePanel } from '@models/gauge-panel';

export interface ResultsVisualizationGroup {
  title: string;
  messageDetail: string;
  visualizations: VisualizationPanel[];
  summaries: SummaryPanel[];
  gauges: GaugePanel[];
}
