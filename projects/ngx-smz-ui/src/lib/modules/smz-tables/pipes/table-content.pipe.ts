import { Pipe, PipeTransform } from '@angular/core';
import { ObjectUtils } from 'primeng/utils';

@Pipe({
  name: 'tableContent'
})

export class SmzTableContentPipe implements PipeTransform {
  transform(data: any, field: string): string {
    if (data == null) return '';
    return ObjectUtils.resolveFieldData(data, field);
  }

}
