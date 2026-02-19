import { Pipe, PipeTransform } from '@angular/core';
import { ScenarioSystemResults } from '@models/scenario-system-results';
import { UiTeam } from '../models/ui-team';

@Pipe({
  name: 'computeTeamManHoursUsedPipe',
  standalone: true
})
export class ComputeTeamManHoursUsedPipe implements PipeTransform {
  public transform(items: ScenarioSystemResults[], team: UiTeam): void {
    const totalManHoursUsed = items.reduce((acc, item) => acc + item.manHours, 0);
    team.manHoursUsed.next(totalManHoursUsed);
    team.isBellowMinimum = totalManHoursUsed < team.team.minimumManHours;
    team.isAboveMaximum = totalManHoursUsed > team.team.maximumManHours;
  }
}