import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';

@Pipe({
  name: 'select$'
})

export class SelectorPipe implements PipeTransform {
  constructor(private store: Store) {}
  public transform(selectorFunction: any, ...args: any[]): any {
    return this.store.select(selectorFunction(...args));
  }
}