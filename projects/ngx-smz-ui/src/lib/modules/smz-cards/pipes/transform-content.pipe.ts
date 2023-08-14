import { Pipe, PipeTransform } from '@angular/core';
import { SmzCardsImageContent } from '../models/smz-cards-contents';
import cloneDeep from 'lodash-es/cloneDeep';

@Pipe({
  name: 'transformContent'
})

export class SmzCardsTransformContentPipe implements PipeTransform {
  transform(content: SmzCardsImageContent<unknown>, data: any): SmzCardsImageContent<unknown> {
    return content.transform.callback != null ? content.transform.callback(data, cloneDeep(content)) : content;
  }

}
