import { DemoKeys } from '@demos/demo-keys';
import { Store } from '@ngxs/store';
import { GlobalInjector, SmzDialogsService, SmzFormBuilder } from 'ngx-smz-ui';
import { FormControl } from '@angular/forms';

export const ValidatorsDemo: { [key: string]: () => void } = {
  //
  [DemoKeys.VALIDATORS_CUSTOM]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .text('input1', 'My Value must be 123')
          .validators()
          .custom((control: FormControl): { [key: string]: any } => {
                if (control.value === '123') return null;
                return { 'testValidation': true };
              }
          )
        .group
        .form
      .build();
  },
}

