import { Pipe, PipeTransform } from '@angular/core';
import { ObjectUtils } from 'primeng/utils';

@Pipe({
  name: 'tableContent'
})

export class SmzTableContentPipe implements PipeTransform {
  transform(data: any, field: string): { result: string } {
    console.log(`>> ${field}`, data);
    if (data == null) return { result: '' };
    console.log(1);
    console.log(ObjectUtils.resolveFieldData(data, field));
    return { result: ObjectUtils.resolveFieldData(data, field) };
  }

}
