import { Pipe, PipeTransform } from '@angular/core';
import { getLastElements } from '../../utils/utils';

@Pipe({
    name: 'smzTail',
    standalone: false
})
export class SmzTailPipe implements PipeTransform {
  transform<T>(input: T, num?: number): T;
  transform(input: any[], num?: number): any[];

  transform(input: any, num: number = 0): any {
    return getLastElements(input, num);
  }
}