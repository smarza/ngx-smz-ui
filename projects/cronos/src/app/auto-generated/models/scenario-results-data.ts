import { ScenarioSystemResults } from '@models/scenario-system-results';
import { ResultsVisualizationGroup } from '@models/results-visualization-group';

export interface ScenarioResultsData {
  hasRtiHidroblastCoverage?: boolean;
  systems: ScenarioSystemResults[];
  groups: ResultsVisualizationGroup[];
}
