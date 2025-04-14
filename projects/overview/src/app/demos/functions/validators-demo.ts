import { DemoKeys } from '../../demos/demo-keys';
import { SmzFormBuilder } from '@ngx-smz/core';
import { UntypedFormControl } from '@angular/forms';

export const ValidatorsDemo: { [key: string]: () => void } = {
  //
  [DemoKeys.VALIDATORS_CUSTOM]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .text('input1', 'My Value must be 123')
          .validators()
          .custom((control: UntypedFormControl): { [key: string]: any } => {
                if (control.value === '123') return null;
                return { 'testValidation': true };
              }
          )
          .input
        .group
        .form
      .build();
  },
}

