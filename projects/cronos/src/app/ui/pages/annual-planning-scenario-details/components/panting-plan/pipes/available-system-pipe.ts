import { Pipe, PipeTransform } from '@angular/core';
import { ScenarioSystemResults } from '@models/scenario-system-results';

@Pipe({
  name: 'availableSystemPipe',
  standalone: true
})
export class AvailableSystemPipe implements PipeTransform {
  public transform(items: ScenarioSystemResults[]): ScenarioSystemResults[] {
    return items.filter(item => item.team == null);
  }
}
