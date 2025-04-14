import { Pipe, PipeTransform } from '@angular/core';
import { ObjectUtils } from 'primeng/utils';
import { SmzContentType } from '../models/content-types';

@Pipe({
    name: 'tableContent',
    standalone: false
})

export class SmzTableContentPipe implements PipeTransform {
  transform(data: any, field: string, columnType: SmzContentType): { result: string } {
    if (data == null) return { result: '' };

    if (columnType === SmzContentType.DATA_TRANSFORM) {
      return {
        result: Reflect.get(data, `_dom_${field}`)
      };
    }

    return {
      result: ObjectUtils.resolveFieldData(data, field)
    };
  }

}
