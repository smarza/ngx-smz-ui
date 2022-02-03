import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateBuilder'
})

export class StateBuilderPipe implements PipeTransform {
  public transform(state: (...args: any) => any, ...args: any): any {
    return state(...args);
  }
}