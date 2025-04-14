import { Pipe, PipeTransform } from '@angular/core';
import { SmzCardsBaseContext } from '../models/contexts/smz-base-context';

@Pipe({
    name: 'resetContext',
    standalone: false
})

export class SmzCardsResetContextPipe implements PipeTransform {
  transform(data: any[], context: SmzCardsBaseContext): any[] {

    if (context?.reset != null) {
      context.reset(data);
    }

    return data;
  }

}
