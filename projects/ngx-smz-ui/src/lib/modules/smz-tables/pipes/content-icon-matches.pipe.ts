import { Pipe, PipeTransform } from '@angular/core';
import { SmzIconContentMatch } from '../models/content-types';

@Pipe({
    name: 'contentIconMatches',
    standalone: false
})
export class SmzContentIconMatchesPipe implements PipeTransform {
  transform(options: SmzIconContentMatch[], value: any): SmzIconContentMatch {
    if (options == null || options.length === 0) return null;

    const match = options.find(x => x.value === value);

    if (match != null) {
      return match;
    }
    else
    {
      return null;
    }
  }
}