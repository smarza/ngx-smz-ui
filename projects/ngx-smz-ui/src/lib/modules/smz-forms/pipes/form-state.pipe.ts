import { Pipe, PipeTransform } from '@angular/core';
import { SmzForm } from '../models/smz-forms';

@Pipe({
  name: 'stateBuilder'
})

export class StateBuilderPipe implements PipeTransform {
  public transform(value: unknown, state: (data: unknown) => SmzForm<any>): SmzForm<any> {
    return state(value);
  }
}