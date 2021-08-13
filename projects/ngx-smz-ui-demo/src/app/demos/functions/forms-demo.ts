import { DemoKeys } from '@demos/demo-keys';
import { Store } from '@ngxs/store';
import { GlobalInjector, SmzDialogBuilder, SmzDialogsService } from 'ngx-smz-ui';
import * as moment from 'moment';

const service = GlobalInjector.instance.get(SmzDialogsService);
const store = GlobalInjector.instance.get(Store);

export const FormsDemo: { [key: string]: () => void } = {
  //
  [DemoKeys.FORMS_INPUT_CALENDAR]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Calendar Demo`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('LARGE', 'col-4')
        .setLayout('EXTRA_LARGE', 'col-3')
        .form()
          .group()
            .setLayout('EXTRA_SMALL', 'col-12')
            .calendar('input1', 'I\'m not required')
            .group
            .calendar('input2', 'new Date()', new Date())
            .group
            .calendar('input3', 'moment().toDate()', moment().toDate())
            .group
            .calendar('input4', `moment(new Date()).endOf('month').toDate()`, moment(new Date()).endOf('month').toDate())
            .group
            .calendar('input5', 'I\'m required')
              .validators()
                .required()
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
  //
  [DemoKeys.FORMS_INPUT_CHECKBOX]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Checkbox Demo`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('LARGE', 'col-4')
        .setLayout('EXTRA_LARGE', 'col-3')
        .form()
          .group()
            .setLayout('EXTRA_SMALL', 'col-12')
            .checkbox('input1', 'I\'m not required')
            .group
            .checkbox('input2', 'I\'m required')
              .validators()
              .required()
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
  //
  [DemoKeys.FORMS_INPUT_CHECKBOX_GROUP]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Checkbox Group Demo`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('LARGE', 'col-4')
        .setLayout('EXTRA_LARGE', 'col-3')
        .form()
          .group()
            .setLayout('EXTRA_SMALL', 'col-12')
            .checkboxGroup('input1', 'I\'m required', [{ id: '1', name: 'Option 1'}, { id: '2', name: 'Option 2'}, { id: '3', name: 'Option 3'}])
              .validators()
              .required()
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
  //
  [DemoKeys.FORMS_INPUT_DROPDOWN]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Dropdown Demo`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('LARGE', 'col-4')
        .setLayout('EXTRA_LARGE', 'col-3')
        .form()
          .group()
            .setLayout('EXTRA_SMALL', 'col-12')
            .dropdown('input1', 'I\'m required', [{ id: '1', name: 'Option 1'}, { id: '2', name: 'Option 2'}, { id: '3', name: 'Option 3'}])
              .validators()
              .required()
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
  //
  [DemoKeys.FORMS_INPUT_LINKED_DROPDOWN]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Linked Dropdown Demo`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('LARGE', 'col-4')
        .setLayout('EXTRA_LARGE', 'col-3')
        .form()
          .group()
            .setLayout('EXTRA_SMALL', 'col-12')
            .dropdown('input1', 'I\'m required', [{ id: 'A', name: 'Group A'}, { id: 'B', name: 'Group B'}])
              .validators()
              .required()
            .group
            .linkedDropdown('input2', 'input1', 'I\'m required', [{ parentId: 'A', data: [{ id: 'A1', name: 'Option A1' }, { id: 'A2', name: 'Option A2' }]}, { parentId: 'B', data: [{ id: 'B1', name: 'Option B1' }, { id: 'B2', name: 'Option B2' }]}])
              .validators()
              .required()
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
  //
  [DemoKeys.FORMS_INPUT_MULTISELECT]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Multiselect Demo`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('LARGE', 'col-4')
        .setLayout('EXTRA_LARGE', 'col-3')
        .form()
          .group()
            .setLayout('EXTRA_SMALL', 'col-12')
            .multiselect('input1', 'I\'m required', [{ id: '1', name: 'Option 1'}, { id: '2', name: 'Option 2'}, { id: '3', name: 'Option 3'}])
              .validators()
              .required()
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
  //
  [DemoKeys.FORMS_INPUT_LINKED_MULTISELECT]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Linked Multiselect Demo`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('LARGE', 'col-4')
        .setLayout('EXTRA_LARGE', 'col-3')
        .form()
          .group()
            .setLayout('EXTRA_SMALL', 'col-12')
            .dropdown('input1', 'I\'m required', [{ id: 'A', name: 'Group A'}, { id: 'B', name: 'Group B'}])
              .validators()
              .required()
            .group
            .linkedMultiselect('input2', 'input1', 'I\'m required', [{ parentId: 'A', data: [{ id: 'A1', name: 'Option A1' }, { id: 'A2', name: 'Option A2' }]}, { parentId: 'B', data: [{ id: 'B1', name: 'Option B1' }, { id: 'B2', name: 'Option B2' }]}])
              .validators()
              .required()
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
  //
  [DemoKeys.FORMS_INPUT_COLOR_PICKER]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Color Picker Demo`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('LARGE', 'col-4')
        .setLayout('EXTRA_LARGE', 'col-3')
        .form()
          .group()
            .setLayout('EXTRA_SMALL', 'col-12')
            .colorPicker('input1', 'I\'m not required')
            .group
            .colorPicker('input2', 'I\'m required')
              .validators()
              .required()
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
  //
  [DemoKeys.FORMS_INPUT_CURRENCY]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Currency Demo`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('LARGE', 'col-4')
        .setLayout('EXTRA_LARGE', 'col-3')
        .form()
          .group()
            .setLayout('EXTRA_SMALL', 'col-12')
            .currency('input1', 'I\'m not required')
            .group
            .currency('input2', 'I\'m required')
              .validators()
              .required()
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
  //
  [DemoKeys.FORMS_INPUT_NUMBER]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Number Demo`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('LARGE', 'col-4')
        .setLayout('EXTRA_LARGE', 'col-3')
        .form()
          .group()
            .setLayout('EXTRA_SMALL', 'col-12')
            .number('input1', 'I\'m not required')
            .group
            .number('input2', 'I\'m required')
              .validators()
              .required()
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
  //
  [DemoKeys.FORMS_INPUT_RADIO_GROUP]: () => {

  },
  //
  [DemoKeys.FORMS_INPUT_SWITCH]: () => {

  },
  //
  [DemoKeys.FORMS_INPUT_TEXT_AREA]: () => {

  },
  //
  [DemoKeys.FORMS_INPUT_TAG_AREA]: () => {

  },
  //
  [DemoKeys.FORMS_INPUT_TEXT]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Text Demo`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('LARGE', 'col-4')
        .setLayout('EXTRA_LARGE', 'col-3')
        .form()
          .group()
            .setLayout('EXTRA_SMALL', 'col-12')
            .text('input1', 'I\'m not required')
            .group
            .text('input2', 'I\'m required')
              .validators()
              .required()
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
  //
  [DemoKeys.FORMS_INPUT_FILE]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Text Demo`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('LARGE', 'col-4')
        .setLayout('EXTRA_LARGE', 'col-3')
        .form()
          .group()
            .setLayout('EXTRA_SMALL', 'col-12')
            .text('input1', 'I\'m not required')
            .group
              .file('file', 'Confirmação')
              .useBinaryFormat()
              .validators()
              .required()
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
  //
  [DemoKeys.FORMS_INPUT_LIST]: () => {

  },
  //
  [DemoKeys.FORMS_INPUT_MASK]: () => {

  },
  //
  [DemoKeys.FORMS_INPUT_PASSWORD]: () => {

  },
}

