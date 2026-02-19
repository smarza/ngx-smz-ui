import { Pipe, PipeTransform } from '@angular/core';
import { ScenarioSystemResults } from '@models/scenario-system-results';
import { SimpleNamedEntity } from '@ngx-smz/core';

@Pipe({
  name: 'systemByTeamPipe',
  standalone: true
})
export class SystemByTeamPipe implements PipeTransform {
  public transform(items: ScenarioSystemResults[], team: SimpleNamedEntity): ScenarioSystemResults[] {
    return items.filter(item => item.team?.id === team.id);
  }
}
