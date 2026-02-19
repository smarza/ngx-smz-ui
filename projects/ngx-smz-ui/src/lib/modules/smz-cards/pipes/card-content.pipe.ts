import { Pipe, PipeTransform } from '@angular/core';
import { ObjectUtils } from 'primeng/utils';

@Pipe({
    name: 'cardsContent',
    standalone: false
})

export class SmzCardsContentPipe implements PipeTransform {
  transform(data: any, field: string): { result: string } {
    if (data == null) return { result: '' };
    return { result: ObjectUtils.resolveFieldData(data, field) };
  }

}
