import { Pipe, PipeTransform } from '@angular/core';
import { ObjectUtils } from 'primeng/utils';

@Pipe({
  name: 'getData'
})

export class SmzGetDataPipe implements PipeTransform {
  transform(data: any, field: string): { result: string } {
    // console.log('----');
    // console.log('data', data);
    // console.log('field', field);
    // console.log('result', { result: ObjectUtils.resolveFieldData(data, field) });
    if (data == null) return { result: '' };
    return { result: ObjectUtils.resolveFieldData(data, field) };
  }

}
