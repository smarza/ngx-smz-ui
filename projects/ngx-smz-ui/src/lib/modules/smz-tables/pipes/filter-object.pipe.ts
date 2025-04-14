import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterObject',
    standalone: false
})

export class SmzFilterObjectPipe implements PipeTransform {
  transform(field: string): string {
    if (field == null) return '';

    const properties = field.split('.');

    if(properties.length === 1){
      // console.log(field);
      return field;
    }
    else
    {
      properties.pop();
      // console.log(properties.join('.'));
      return properties.join('.');
    }

  }

}
