import { DemoKeys } from '@demos/demo-keys';
import { Store } from '@ngxs/store';
import { GlobalInjector, SmzDialogBuilder, SmzDialogsService } from 'ngx-smz-ui';
import { FormControl } from '@angular/forms';

const service = GlobalInjector.instance.get(SmzDialogsService);
const store = GlobalInjector.instance.get(Store);

export const ValidatorsDemo: { [key: string]: () => void } = {
  //
  [DemoKeys.VALIDATORS_CUSTOM]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Custom Validator Demo`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('LARGE', 'col-4')
        .setLayout('EXTRA_LARGE', 'col-3')
        .form()
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
      .dialog
        .buttons()
          .confirm()
            .dependsOnValidation()
            .buttons
          .dialog
      .build()
    );
  },
}

