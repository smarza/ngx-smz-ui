import { Team } from '@models/team';
import { SmzGaugeState, SmzTableState } from '@ngx-smz/core';
import { BehaviorSubject } from 'rxjs';

export interface UiTeam {
  team: Team;
  tableState: SmzTableState;
  manHoursUsed: BehaviorSubject<number>;
  gaugeState: SmzGaugeState;
  isBellowMinimum: boolean;
  isAboveMaximum: boolean;
}