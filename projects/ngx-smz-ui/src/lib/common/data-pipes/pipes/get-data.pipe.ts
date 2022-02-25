import { Pipe, PipeTransform } from '@angular/core';
import { ObjectUtils } from 'primeng/utils';

@Pipe({
  name: 'getData'
})

export class SmzGetDataPipe implements PipeTransform {
  transform(data: any, field: string, dataTransform: (value: string) => string): { result: string } {
    // console.log('----');
    // console.log('data', data);
    // console.log('field', field);
    // console.log('result', { result: ObjectUtils.resolveFieldData(data, field) });
    if (data == null) return { result: '' };

    const rawValue = ObjectUtils.resolveFieldData(data, field);

    return { result: dataTransform != null ? dataTransform(rawValue) : rawValue };
  }

}
