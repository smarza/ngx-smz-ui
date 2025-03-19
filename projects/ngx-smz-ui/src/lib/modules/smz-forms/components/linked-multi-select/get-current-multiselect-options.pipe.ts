import { Pipe, PipeTransform } from '@angular/core';
import { SmzLinkedMultiSelectControl } from '../../models/control-types';
import { CONTROL_FUNCTIONS } from '../../models/control-type-functions';

@Pipe({
    name: 'GetCurrentMultiselectOptions',
    standalone: false
})

export class GetCurrentMultiselectOptionsPipe implements PipeTransform {
  transform(value: any[], input: SmzLinkedMultiSelectControl<any>): any {
    input.currentOptions = value;

    setTimeout(() => {
      CONTROL_FUNCTIONS[input.type].applyDefaultValue(input._inputFormControl, input);
    }, 0);

    return value;

  }
}