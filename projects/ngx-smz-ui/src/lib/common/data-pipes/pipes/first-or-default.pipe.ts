import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'firstOrDefault',
    standalone: false
})
export class FirstOrDefaultPipe implements PipeTransform {

  public transform(value: unknown[], fallback: never): unknown {
    if (value && value.length > 0) {
      return value[0];
    }
    else {
      return fallback;
    }
  }

}