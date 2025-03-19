import { Pipe, PipeTransform } from '@angular/core';
import { getFirstElements } from '../../utils/utils';

@Pipe({
    name: 'smzInitial',
    standalone: false
})
export class SmzInitialPipe implements PipeTransform {
  transform(input: any[], num: number): any[];
  transform(input: any): any;

  transform(input: any, num: number = 0): any[] {
    return getFirstElements(input, num);
  }
}
