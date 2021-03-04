import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterObject'
})

export class SmzFilterObjectPipe implements PipeTransform {
  transform(field: string): string {
    if (field == null) return '';

    const properties = field.split('.');

    if(properties.length === 1){
      return field;
    }
    else
    {
      properties.pop();
      return properties.join('.');
    }

  }

}
