import { createSelector, Selector } from '@ngxs/store';
import { AnnualPlanningsState, AnnualPlanningsStateModel } from './annual-plannings.state';
import { AnnualPlanningListItem } from '@models/annual-planning-list-item';
import { InspectionSpreadsheetParseErrors } from '@models/inspection-spreadsheet-parse-errors';

export class AnnualPlanningsSelectors {
  @Selector([AnnualPlanningsState])
  public static all(state: AnnualPlanningsStateModel): AnnualPlanningListItem[] {
    return state.items;
  }

  @Selector([AnnualPlanningsState])
  public static errors(state: AnnualPlanningsStateModel): InspectionSpreadsheetParseErrors[] {
    return state.errors.map<InspectionSpreadsheetParseErrors>(x => ({ error: x }));
  }

  public static single(id: string): (state: AnnualPlanningsStateModel) => AnnualPlanningListItem {
    return createSelector([AnnualPlanningsState], (state: AnnualPlanningsStateModel) => id == null ? null : state.items.find(x => x.id === id));
  }
}
