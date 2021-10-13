import { DemoKeys } from '@demos/demo-keys';
import { SmzFormBuilder } from 'ngx-smz-ui';
import * as moment from 'moment';

export const FormsDemo: { [key: string]: () => void } = {
  //
  [DemoKeys.FORMS_INPUT_CALENDAR]: () => {
    return new SmzFormBuilder<any>()
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
      .build();
  },
  //
  [DemoKeys.FORMS_INPUT_CHECKBOX]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .checkbox('input1', 'I\'m not required')
        .group
        .checkbox('input2', 'I\'m required')
          .validators()
          .required()
        .group
      .form
      .build();
  },
  //
  [DemoKeys.FORMS_INPUT_CHECKBOX_GROUP]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .checkboxGroup('input1', 'I\'m required', [{ id: '1', name: 'Option 1'}, { id: '2', name: 'Option 2'}, { id: '3', name: 'Option 3'}])
          .validators()
          .required()
        .group
      .form
      .build();
  },
  //
  [DemoKeys.FORMS_INPUT_CONTENT_MASK]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .contentMask('input1', 'Conteúdo com variáveis',
`Anestesia da região do punho direito com {{xilocaína a 2%}}.

Punção da artéria radial {{direita}} seguida da instalação de introdutor 5F.

Através deste instrumento avançou-se uma guia {{metálica 0.0035}} e um cateter {{TIG}} que foi posicionado no ventrículo esquerdo e com ele realizados o registro pressórico, a ventrículografia e as coronariogafias. Retirou-se o sistema.`)
          .validators()
          .required()
        .group
      .form
      .build();
  },
  //
  [DemoKeys.FORMS_INPUT_DROPDOWN]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .dropdown('input1', 'I\'m required', [{ id: '1', name: 'Option 1'}, { id: '2', name: 'Option 2'}, { id: '3', name: 'Option 3'}])
          .validators()
          .required()
        .group
      .form
      .build();
  },
  //
  [DemoKeys.FORMS_INPUT_LINKED_DROPDOWN]: () => {
    return new SmzFormBuilder<any>()
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
      .build();
  },
  //
  [DemoKeys.FORMS_INPUT_MULTISELECT]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .multiselect('input1', 'I\'m required', [{ id: '1', name: 'Option 1'}, { id: '2', name: 'Option 2'}, { id: '3', name: 'Option 3'}])
          .validators()
          .required()
        .group
      .form
      .build();
  },
  //
  [DemoKeys.FORMS_INPUT_LINKED_MULTISELECT]: () => {
    return new SmzFormBuilder<any>()
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
      .build();
  },
  //
  [DemoKeys.FORMS_INPUT_COLOR_PICKER]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .colorPicker('input1', 'I\'m not required')
        .group
        .colorPicker('input2', 'I\'m required')
          .validators()
          .required()
        .group
        .form
      .build();
  },
  //
  [DemoKeys.FORMS_INPUT_CURRENCY]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .currency('input1', 'I\'m not required')
        .group
        .currency('input2', 'I\'m required')
          .validators()
          .required()
        .group
        .form
      .build();
  },
  //
  [DemoKeys.FORMS_INPUT_NUMBER]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .number('input1', 'I\'m not required')
        .group
        .number('input2', 'I\'m required')
          .validators()
          .required()
        .group
        .form
      .build();
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
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .text('input1', 'I\'m not required')
        .group
        .text('input2', 'I\'m required')
          .validators()
          .required()
        .group
        .form
      .build();
  },
  //
  [DemoKeys.FORMS_INPUT_FILE]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .text('input1', 'I\'m not required')
        .group
          .file('file', 'Confirmação')
          .useBinaryFormat()
          .acceptImages()
          .validators()
          .required()
        .group
        .form
      .build();
  },
  //
  [DemoKeys.FORMS_INPUT_LIST]: () => {

  },
  //
  [DemoKeys.FORMS_INPUT_MASK]: () => {

  },
  //
  [DemoKeys.FORMS_INPUT_PASSWORD]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .password('password', 'Password')
          .validators()
          .required()
        .group
        .form
      .build();
  },
  //
  [DemoKeys.FORMS_INPUT_PASSWORD_WITH_CONFIRMATION]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .password('password', 'Password')
          .validators()
            .required()
        .group
        .addPasswordConfirmation('password', 'Confirmation')
          .validators()
            .required()
        .group
        .form
      .build();
  },
  //
  [DemoKeys.FORMS_FROM_UI_DEFINITION_CREATE]: () => {
    return new SmzFormBuilder<any>()
        .fromUiDefintion('entity')
        .form
      .build();
  },
  //
  [DemoKeys.FORMS_FROM_UI_DEFINITION_UPDATE]: () => {
    return new SmzFormBuilder<any>()
      .fromUiDefintion('entity')
        .forEntity({
          name: 'Name',
          company: 'Company',
          country: {
            name: 'Brazil',
            id: '55e08b38-cec6-4063-acd0-25747f31dc59'
          }
        })
      .form
      .build();
  },
}

