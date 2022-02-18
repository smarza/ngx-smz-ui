import { Pipe, PipeTransform } from '@angular/core';
import { cloneDeep } from 'lodash-es';

@Pipe({
  name: 'stateBuilder'
})

export class StateBuilderPipe implements PipeTransform {
  public transform(state: (...args: any) => any, ...args: any): any {
    const temp = { args };
    const cloned = cloneDeep(temp);
    // console.log('args', args);
    // console.log('temp', temp);
    // console.log('cloned', cloned);
    return state(...cloned.args);
  }
}