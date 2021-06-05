import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';
import { SmzDropdownEditable, SmzEditableTypes } from '../models/editable-types';

@Pipe({
  name: 'editableSource'
})

export class SmzEditableSourcePipe implements PipeTransform {
  constructor(private store: Store) {}
  transform(field: SmzEditableTypes): any[] {
    const data: SmzDropdownEditable = (field as SmzDropdownEditable);

    if (data.sourceType === 'selector') {
      return this.store.selectSnapshot(data.sourceData);
    }
    else {
      return data.sourceData ?? []
    }

  }

}
