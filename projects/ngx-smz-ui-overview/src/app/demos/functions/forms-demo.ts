import { DemoKeys } from '@demos/demo-keys';
import { GlobalInjector, SmzFormBuilder, SmzFormsResponse, SmzFormViewdata, ToastActions } from 'ngx-smz-ui';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { Store } from '@ngxs/store';

const store = GlobalInjector.instance.get(Store);

export const FormsDemo: { [key: string]: () => void } = {
  //
  [DemoKeys.FORMS_ALL_INPUTS]: () => {

    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .text('input1', 'I\'m required', 'sample').validators().required().group
        .calendar('input2', 'new Date()', new Date()).validators().required().group
        .checkbox('input3', 'I\'m not required').validators().required().group
        .checkboxGroup('input4', 'I\'m required', [{ id: '1', name: 'Option 1'}, { id: '2', name: 'Option 2'}, { id: '3', name: 'Option 3'}]).validators().required().group
        .contentMask('input5', 'Conteúdo com variáveis',
`Anestesia da região de punho direito com xilocaína 2%.
Punção da artéria radial direita com agulha seguida da instalação de <variable id="755956dd-1696-4efb-448d-08d9b8dd31be">Introdutor</variable>.
Através deste instrumento avançou-se sobre uma <variable id="70026d73-50dd-43f7-448e-08d9b8dd31be">Guia</variable> um <variable id="3c8cf03b-fd29-4f42-448f-08d9b8dd31be">Cateter</variable>.
Realizados os registros pressóricos em:
<monitoredData id="6416118c-b362-4467-6ae4-08d9b8dd31bd">Monitoração ambulatorial da pressão arterial</monitoredData>
Na sequência, foi realizada a coronariografia direita.
Exame sem intercorrências.`).validators().required().group
        .dropdown('input6', 'I\'m required', [{ id: '1', name: 'Option 1'}, { id: '2', name: 'Option 2'}, { id: '3', name: 'Option 3'}]).validators().required().group
        .dropdown('input7', 'I\'m required', [{ id: 'A', name: 'Group A'}, { id: 'B', name: 'Group B'}]).validators().required().group
        .linkedDropdown('input8', 'input7', 'I\'m required', [{ parentId: 'A', data: [{ id: 'A1', name: 'Option A1' }, { id: 'A2', name: 'Option A2' }]}, { parentId: 'B', data: [{ id: 'B1', name: 'Option B1' }, { id: 'B2', name: 'Option B2' }]}]).validators().required().group
        .multiselect('input9', 'I\'m required', [{ id: '1', name: 'Option 1'}, { id: '2', name: 'Option 2'}, { id: '3', name: 'Option 3'}]).validators().required().group
        .dropdown('input10', 'I\'m required', [{ id: 'A', name: 'Group A'}, { id: 'B', name: 'Group B'}]).validators().required().group
        .linkedMultiselect('input11', 'input10', 'I\'m required', [{ parentId: 'A', data: [{ id: 'A1', name: 'Option A1' }, { id: 'A2', name: 'Option A2' }]}, { parentId: 'B', data: [{ id: 'B1', name: 'Option B1' }, { id: 'B2', name: 'Option B2' }]}]).validators().required().group
        .colorPicker('input12', 'I\'m required').validators().required().group
        .currency('input13', 'I\'m required').validators().required().group
        .number('input14', 'Fraction Number').setFraction(2).setLocale('pt-BR').validators().required().group
        .radioGroup('input15', 'Radio', [{id: 'Nenhum', name: 'Nenhum'}, {id: 'Irregularidade', name: 'Irregularidade'}, {id: 'Tortuosidade', name: 'Tortuosidade'}], 'Irregularidade').validators().required().group
        .switch('input16', 'IsContracted').validators().required().group
        .text('input17', 'I\'m required', 'sample').validators().required().group
        .textButton('input18', 'Chave', '', (response: SmzFormsResponse<any>, utils: SmzFormViewdata): Observable<{ isValid: boolean, messages?: string[] }> => { console.log('callback response...', response); return of({ isValid: true }); }).useLabel('Buscar').validators().required().group
        .file('input19', 'Confirmação').useBinaryFormat().acceptImages().validators().required().group
        .list('input20', 'I\'m not required', ['Option 1', 'Option 2', 'Option 3']).useDialogEditMode().buttons().add().all().clear().edit().move().remove().sort().list.validators().required().group
        .password('input21', 'Password').validators().required().group
        .form
      .build();
  },
  //
  [DemoKeys.FORMS_ALL_INPUTS_DISABLED]: () => {

    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .text('input1', 'I\'m required', 'sample').disable().validators().required().group
        .calendar('input2', 'new Date()', new Date()).disable().validators().required().group
        .checkbox('input3', 'I\'m not required').disable().validators().required().group
        .checkboxGroup('input4', 'I\'m required', [{ id: '1', name: 'Option 1'}, { id: '2', name: 'Option 2'}, { id: '3', name: 'Option 3'}]).disable().validators().required().group
        .contentMask('input5', 'Conteúdo com variáveis',
`Anestesia da região de punho direito com xilocaína 2%.
Punção da artéria radial direita com agulha seguida da instalação de <variable id="755956dd-1696-4efb-448d-08d9b8dd31be">Introdutor</variable>.
Através deste instrumento avançou-se sobre uma <variable id="70026d73-50dd-43f7-448e-08d9b8dd31be">Guia</variable> um <variable id="3c8cf03b-fd29-4f42-448f-08d9b8dd31be">Cateter</variable>.
Realizados os registros pressóricos em:
<monitoredData id="6416118c-b362-4467-6ae4-08d9b8dd31bd">Monitoração ambulatorial da pressão arterial</monitoredData>
Na sequência, foi realizada a coronariografia direita.
Exame sem intercorrências.`).disable().validators().required().group
        .dropdown('input6', 'I\'m required', [{ id: '1', name: 'Option 1'}, { id: '2', name: 'Option 2'}, { id: '3', name: 'Option 3'}]).disable().validators().required().group
        .dropdown('input7', 'I\'m required', [{ id: 'A', name: 'Group A'}, { id: 'B', name: 'Group B'}]).disable().validators().required().group
        .linkedDropdown('input8', 'input7', 'I\'m required', [{ parentId: 'A', data: [{ id: 'A1', name: 'Option A1' }, { id: 'A2', name: 'Option A2' }]}, { parentId: 'B', data: [{ id: 'B1', name: 'Option B1' }, { id: 'B2', name: 'Option B2' }]}]).disable().validators().required().group
        .multiselect('input9', 'I\'m required', [{ id: '1', name: 'Option 1'}, { id: '2', name: 'Option 2'}, { id: '3', name: 'Option 3'}]).disable().validators().required().group
        .dropdown('input10', 'I\'m required', [{ id: 'A', name: 'Group A'}, { id: 'B', name: 'Group B'}]).disable().validators().required().group
        .linkedMultiselect('input11', 'input10', 'I\'m required', [{ parentId: 'A', data: [{ id: 'A1', name: 'Option A1' }, { id: 'A2', name: 'Option A2' }]}, { parentId: 'B', data: [{ id: 'B1', name: 'Option B1' }, { id: 'B2', name: 'Option B2' }]}]).disable().validators().required().group
        .colorPicker('input12', 'I\'m required').disable().validators().required().group
        .currency('input13', 'I\'m required').disable().validators().required().group
        .number('input14', 'Fraction Number').setFraction(2).setLocale('pt-BR').disable().validators().required().group
        .radioGroup('input15', 'Radio', [{id: 'Nenhum', name: 'Nenhum'}, {id: 'Irregularidade', name: 'Irregularidade'}, {id: 'Tortuosidade', name: 'Tortuosidade'}], 'Irregularidade').disable().validators().required().group
        .switch('input16', 'IsContracted').disable().validators().required().group
        .text('input17', 'I\'m required', 'sample').disable().validators().required().group
        .textButton('input18', 'Chave', '', (response: SmzFormsResponse<any>, utils: SmzFormViewdata): Observable<{ isValid: boolean, messages?: string[] }> => { console.log('callback response...', response); return of({ isValid: true }) }).useLabel('Buscar').disable().validators().required().group
        .file('input19', 'Confirmação').useBinaryFormat().acceptImages().disable().validators().required().group
        .list('input20', 'I\'m not required', ['Option 1', 'Option 2', 'Option 3']).useDialogEditMode().buttons().add().all().clear().edit().move().remove().sort().list.disable().validators().required().group
        .password('input21', 'Password').disable().validators().required().group
        .form
      .build();
  },
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
          .validators().required()
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
      .emitChangesOnFocusExit()
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
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .radioGroup('radio', 'Radio', [{id: 'Nenhum', name: 'Nenhum'}, {id: 'Irregularidade', name: 'Irregularidade'}, {id: 'Tortuosidade', name: 'Tortuosidade'}], 'Irregularidade')
          .group
        .form
      .build();
  },
  //
  [DemoKeys.FORMS_INPUT_SWITCH]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .switch('isContracted', 'IsContracted')
          .disable()
          .validators().required()
          .group
        .form
      .build();
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
  [DemoKeys.FORMS_INPUT_TEXT_BUTTON]: () => {
    return new SmzFormBuilder<any>()
      .showMultipleErrorsMessages()
      .group('Chave correta: access')
        .textButton('key', 'Chave', '',
          (response: SmzFormsResponse<any>, utils: SmzFormViewdata): Observable<{ isValid: boolean, messages?: string[] }> => {
            console.log('callback data...', response);

            if (response.data.key === 'access') {
              utils.updateInputValue('name', 'user.name');
              utils.updateInputValue('email', 'user@email.com');
              utils.updateInputValue('sector', 'user.sector');
              utils.updateInputValue('identifier', 'user.identifier');
              utils.updateInputValue('isContracted', true);
              store.dispatch(new ToastActions.Success('Chave válida'));
              return of({ isValid: true });
            }
            else {
              utils.updateInputValue('name', '');
              utils.updateInputValue('email', '');
              utils.updateInputValue('sector', '');
              utils.updateInputValue('identifier', '');
              utils.updateInputValue('isContracted', null);
              store.dispatch(new ToastActions.Error('Chave Inválida'));
              return of({ isValid: false, messages: ['Chave Inválida'] });
            }

          })
          .useLabel('Buscar')
          .validators()
            .required()
          .group
        .form

      .group('Preenchimento automático')
        .text('name', 'Nome')
          .disable()
          .validators()
            .required()
          .group
        .text('email', 'Email')
          .disable()
          .validators()
            .required()
            .email()
          .group
        .text('sector', 'Gerência')
          .disable()
          .validators()
            .required()
          .group

        // OCULTOS
        .text('identifier', 'Identificador')
          .disable()
          .hide()
          .validators()
            .required()
          .group
        .switch('isContracted', 'IsContracted')
          .disable()
          .hide()
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
        .list('input1', 'I\'m not required', ['Option 1', 'Option 2', 'Option 3'])
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
        .list('input1', 'I\'m not required', ['Option 1', 'Option 2', 'Option 3'])
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
  [DemoKeys.FORMS_INPUT_LIST_BATCH_CRUD]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .list('input1', 'I\'m not required', ['Option 1', 'Option 2', 'Option 3'])
          .allowBatchCreation()
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
        .fromUiDefinition('entity')
        .form
      .build();
  },
  //
  [DemoKeys.FORMS_FROM_UI_DEFINITION_UPDATE]: () => {
    return new SmzFormBuilder<any>()
      .fromUiDefinition('entity')
        .forEntity({
          name: 'Name',
          company: 'Company',
          country: {
            name: 'Brazil',
            id: '55e08b38-cec6-4063-acd0-25747f31dc59'
          }
        })
      .form
      .group()
        .dropdown('country', 'Países', [ { id: '55e08b38-cec6-4063-acd0-25747f31dc59', name: 'Brazil'}])
          .validators().required()
          .group
        .form
      .build();
  },
  //
  [DemoKeys.FORMS_WITH_APPLY_DATA]: () => {
    return new SmzFormBuilder<any>()
      .fromUiDefinition('entity')
      .form
      .group()
        .dropdown('country', 'Países', [ { id: '55e08b38-cec6-4063-acd0-25747f31dc59', name: 'Brazil'}])
          .validators().required()
          .group
        .form
      .applyData({
        name: 'Name',
        company: 'Company',
        country: {
          name: 'Brazil',
          id: '55e08b38-cec6-4063-acd0-25747f31dc59'
        }})
      .build();
  },
  [DemoKeys.FORMS_BEHAVIORS_DATA_DEPENDENCY]: () => {
    return new SmzFormBuilder<any>()
      .fromUiDefinition('entity')
        .form
      .debugMode()
      .group()

        // .text('scope', '')
        //   .addDataDependency('typeId', 'some', [0], (input) => input.name = 'PBS Number')
        //   .addDataDependency('typeId', 'some', [1], (input) => input.name = 'Hop Number')
        //   .addDataDependency('typeId', 'some', [2], (input) => input.name = 'Current Number')
        //   .validators().required()
        //   .group

        .text('name', 'Nome Original')
          .addDataDependency('company', 'some', ['ideia', 'teste'], (input) => {
            input.name = 'Igual a ideia';
            input._inputFormControl.setValue('teste 1');
            input._inputFormControl.enable();
          })
          .addDataDependency('company', 'none', ['ideia', 'teste'], (input) => {
            input.name = 'Diferente de ideia';
            input._inputFormControl.setValue('teste 2');
            input._inputFormControl.enable();
          })
          .addDataDependency('countryId', 'some', ['22e08b38-cec6-4063-acd0-25747f31dc22'], (input) => {
            input.name = 'Denmark Ganhou';
            input._inputFormControl.setValue('teste 3 (blocked)');
            input._inputFormControl.disable();
          })
          .group

        .dropdown('country', 'Países', [ { id: '55e08b38-cec6-4063-acd0-25747f31dc59', name: 'Brazil'}, { id: '22e08b38-cec6-4063-acd0-25747f31dc22', name: 'Denmark'}])
          .validators().required()
          .group

        .form
      .applyData({
        name: 'Name',
        company: 'Company',
        country: {
          name: 'Brazil',
          id: '55e08b38-cec6-4063-acd0-25747f31dc59'
        }})
      .build();
  },
}

