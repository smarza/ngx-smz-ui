import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterObject'
})

export class SmzFilterObjectPipe implements PipeTransform {
  transform(field: string): string {
    if (field == null) return '';

    const properties = field.split('.');

    if(properties.length === 1){
      console.log('return 1', field);
      return field;
    }
    else
    {
      properties.pop();
      console.log('return 2', properties.join('.'));
      return properties.join('.');
    }

  }

}
