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
      .emitChangesOnFocusExit()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .contentMask('input1', 'Conteúdo com variáveis',
`Anestesia da região de punho direito com xilocaína 2%.
Punção da artéria radial direita com agulha seguida da instalação de <variable id="755956dd-1696-4efb-448d-08d9b8dd31be">Introdutor</variable>.
Através deste instrumento avançou-se sobre uma <variable id="70026d73-50dd-43f7-448e-08d9b8dd31be">Guia</variable> um <variable id="3c8cf03b-fd29-4f42-448f-08d9b8dd31be">Cateter</variable>.
Realizados os registros pressóricos em:
<monitoredData id="6416118c-b362-4467-6ae4-08d9b8dd31bd">Monitoração ambulatorial da pressão arterial</monitoredData>
Na sequência, foi realizada a coronariografia direita.
Exame sem intercorrências.`)
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
        .number('input3', 'Fraction Number')
          .setFraction(2)
          .setLocale('pt-BR')
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
        .text('input2', 'I\'m required', 'sample')
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
  [DemoKeys.FORMS_INPUT_LIST_DIALOG_CRUD]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .list('input1', 'I\'m not required', ['Option 1', 'Option 2', 'Option 3'], ['Option 2'])
          .useDialogEditMode()
          .buttons()
            .add()
            .all()
            .clear()
            .edit()
            .move()
            .remove()
            .sort()
            .list
          .group
        .form
      .build();
  },
    //
    [DemoKeys.FORMS_INPUT_LIST_INLINE_CRUD]: () => {
      return new SmzFormBuilder<any>()
        .group()
          .setLayout('EXTRA_SMALL', 'col-12')
          .list('input1', 'I\'m not required', ['Option 1', 'Option 2', 'Option 3'], ['Option 2'])
            .buttons()
              .add()
              .all()
              .clear()
              .edit()
              .move()
              .remove()
              .sort()
              .list
            .group
          .form
        .build();
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

