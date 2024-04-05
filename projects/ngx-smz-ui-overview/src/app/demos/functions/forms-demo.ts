import { DemoKeys } from '@demos/demo-keys';
import { GlobalInjector, SimpleNamedEntity, SmzFormBuilder, SmzFormsResponse, SmzFormViewdata, ToastActions } from 'ngx-smz-ui';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { Store } from '@ngxs/store';
import { UntypedFormControl } from '@angular/forms';
import { DemoFeatureSelectors, plantsWithModels } from '@states/demo/demo.selectors';
import { TreeNode } from 'primeng/api';
import { DemoFeatureActions } from '@states/demo/demo.actions';

const store = GlobalInjector.instance.get(Store);

export const FormsDemo: { [key: string]: () => void } = {
  //
  [DemoKeys.FORMS_BEHAVIORS_VISIBILITY_CONDITION]: () => {

    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .checkbox('check1', 'I\'m not required').validators().required().input.group
        .text('text1', 'Visible if Check Control True', 'Check box is Enabled')
          .setVisibilityCondition('check1', false, [true])
          .validators().required().input
          .group
        .dropdown('dropdown1', 'Dropdown Control', [{ id: 'A', name: 'Group A'}, { id: 'B', name: 'Group B Mostrar'}], 'B').validators().required().input.group
        .text('text2', 'Visible if Dropdown Control Group B', 'Dropdown is Group B')
          .setVisibilityCondition('dropdown1', false, ['B'])
          .validators().required().input
          .group
        .form
      .build();
  },
  //
  [DemoKeys.FORMS_ALL_INPUTS]: () => {
    return new SmzFormBuilder<any>()
    .group()
      .setLayout('EXTRA_SMALL', 'col-12')
      .text('info.input1', 'I\'m required', 'sample').setLayout('EXTRA_SMALL', 'col-4').validators().required().input.group
      .checkbox('info.input3', 'I\'m required').setLayout('EXTRA_SMALL', 'col-4').useLabel('Label Text').validators().required().input.group
      .checkboxGroup('info.input4', 'I\'m required', [{ id: '1', name: 'Option 1'}, { id: '2', name: 'Option 2'}, { id: '3', name: 'Option 3'}]).setLayout('EXTRA_SMALL', 'col-4').validators().required().input.group
      .calendar('info.input2', 'new Date()', new Date()).setLayout('EXTRA_SMALL', 'col-4').validators().required().input.group
      .contentMask('info.input5', 'Conteúdo com variáveis',
`Anestesia da região de punho direito com xilocaína 2%.
Punção da artéria radial direita com agulha seguida da instalação de <variable id="755956dd-1696-4efb-448d-08d9b8dd31be">Introdutor</variable>.
Através deste instrumento avançou-se sobre uma <variable id="70026d73-50dd-43f7-448e-08d9b8dd31be">Guia</variable> um <variable id="3c8cf03b-fd29-4f42-448f-08d9b8dd31be">Cateter</variable>.
Realizados os registros pressóricos em:
<monitoredData id="6416118c-b362-4467-6ae4-08d9b8dd31bd">Monitoração ambulatorial da pressão arterial</monitoredData>
Na sequência, foi realizada a coronariografia direita.
Exame sem intercorrências.`).validators().required().input.group
      .dropdown('info.input6', 'I\'m required', [{ id: '1', name: 'Option 1'}, { id: '2', name: 'Option 2'}, { id: '3', name: 'Option 3'}]).validators().required().input.group
      .dropdown('info.input7', 'I\'m required', [{ id: 'A', name: 'Group A'}, { id: 'B', name: 'Group B'}]).validators().required().input.group
      .linkedDropdown('info.input8', 'input7', 'I\'m required', [{ parentId: 'A', data: [{ id: 'A1', name: 'Option A1' }, { id: 'A2', name: 'Option A2' }]}, { parentId: 'B', data: [{ id: 'B1', name: 'Option B1' }, { id: 'B2', name: 'Option B2' }]}]).validators().required().input.group
      .multiselect('info.input9', 'I\'m required', [{ id: '1', name: 'Option 1'}, { id: '2', name: 'Option 2'}, { id: '3', name: 'Option 3'}]).validators().required().input.group
      .dropdown('info.input10', 'I\'m required', [{ id: 'A', name: 'Group A'}, { id: 'B', name: 'Group B'}]).validators().required().input.group
      .linkedMultiselect('info.input11', 'input10', 'I\'m required', [{ parentId: 'A', data: [{ id: 'A1', name: 'Option A1' }, { id: 'A2', name: 'Option A2' }]}, { parentId: 'B', data: [{ id: 'B1', name: 'Option B1' }, { id: 'B2', name: 'Option B2' }]}]).validators().required().input.group
      .colorPicker('info.input12', 'I\'m required').validators().required().input.group
      .currency('metadata.input13', 'I\'m required').validators().required().input.group
      .number('metadata.input14', 'Fraction Number').setFraction(2).setLocale('pt-BR').validators().required().input.group
      .radioGroup('metadata.input15', 'Radio', [{id: 'Nenhum', name: 'Nenhum'}, {id: 'Irregularidade', name: 'Irregularidade'}, {id: 'Tortuosidade', name: 'Tortuosidade'}], 'Irregularidade').validators().required().input.group
      .switch('metadata.input16', 'IsContracted').validators().required().input.group
      .text('metadata.input17', 'I\'m required', 'sample').validators().required().input.group
      .textButton('metadata.input18', 'Chave', '', (response: SmzFormsResponse<any>, utils: SmzFormViewdata): Observable<{ isValid: boolean, messages?: string[] }> => { console.log('callback response...', response); return of({ isValid: true }); }).useLabel('Buscar').validators().required().input.group
      .file('metadata.input19', 'Confirmação').useBinaryFormat().acceptImages().validators().required().input.group
      .list('metadata.input20', 'I\'m not required', ['Option 1', 'Option 2', 'Option 3']).useDialogEditMode().buttons().all().list.validators().required().input.group
      .password('metadata.input21', 'Password').validators().required().input.group
      .form
    .build();
    },
  //
  [DemoKeys.FORMS_ALL_INPUTS_DISABLED]: () => {

    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .text('input1', 'I\'m required', 'sample').disable().validators().required().input.group
        .calendar('input2', 'new Date()', new Date()).disable().validators().required().input.group
        .checkbox('input3', 'I\'m not required').disable().validators().required().input.group
        .checkboxGroup('input4', 'I\'m required', [{ id: '1', name: 'Option 1'}, { id: '2', name: 'Option 2'}, { id: '3', name: 'Option 3'}]).disable().validators().required().input.group
        .contentMask('input5', 'Conteúdo com variáveis',
`Anestesia da região de punho direito com xilocaína 2%.
Punção da artéria radial direita com agulha seguida da instalação de <variable id="755956dd-1696-4efb-448d-08d9b8dd31be">Introdutor</variable>.
Através deste instrumento avançou-se sobre uma <variable id="70026d73-50dd-43f7-448e-08d9b8dd31be">Guia</variable> um <variable id="3c8cf03b-fd29-4f42-448f-08d9b8dd31be">Cateter</variable>.
Realizados os registros pressóricos em:
<monitoredData id="6416118c-b362-4467-6ae4-08d9b8dd31bd">Monitoração ambulatorial da pressão arterial</monitoredData>
Na sequência, foi realizada a coronariografia direita.
Exame sem intercorrências.`).disable().validators().required().input.group
        .dropdown('input6', 'I\'m required', [{ id: '1', name: 'Option 1'}, { id: '2', name: 'Option 2'}, { id: '3', name: 'Option 3'}]).disable().validators().required().input.group
        .dropdown('input7', 'I\'m required', [{ id: 'A', name: 'Group A'}, { id: 'B', name: 'Group B'}]).disable().validators().required().input.group
        .linkedDropdown('input8', 'input7', 'I\'m required', [{ parentId: 'A', data: [{ id: 'A1', name: 'Option A1' }, { id: 'A2', name: 'Option A2' }]}, { parentId: 'B', data: [{ id: 'B1', name: 'Option B1' }, { id: 'B2', name: 'Option B2' }]}]).disable().validators().required().input.group
        .multiselect('input9', 'I\'m required', [{ id: '1', name: 'Option 1'}, { id: '2', name: 'Option 2'}, { id: '3', name: 'Option 3'}]).disable().validators().required().input.group
        .dropdown('input10', 'I\'m required', [{ id: 'A', name: 'Group A'}, { id: 'B', name: 'Group B'}]).disable().validators().required().input.group
        .linkedMultiselect('input11', 'input10', 'I\'m required', [{ parentId: 'A', data: [{ id: 'A1', name: 'Option A1' }, { id: 'A2', name: 'Option A2' }]}, { parentId: 'B', data: [{ id: 'B1', name: 'Option B1' }, { id: 'B2', name: 'Option B2' }]}]).disable().validators().required().input.group
        .colorPicker('input12', 'I\'m required').disable().validators().required().input.group
        .currency('input13', 'I\'m required').disable().validators().required().input.group
        .number('input14', 'Fraction Number').setFraction(2).setLocale('pt-BR').disable().validators().required().input.group
        .radioGroup('input15', 'Radio', [{id: 'Nenhum', name: 'Nenhum'}, {id: 'Irregularidade', name: 'Irregularidade'}, {id: 'Tortuosidade', name: 'Tortuosidade'}], 'Irregularidade').disable().validators().required().input.group
        .switch('input16', 'IsContracted').disable().validators().required().input.group
        .text('input17', 'I\'m required', 'sample').disable().validators().required().input.group
        .textButton('input18', 'Chave', '', (response: SmzFormsResponse<any>, utils: SmzFormViewdata): Observable<{ isValid: boolean, messages?: string[] }> => { console.log('callback response...', response); return of({ isValid: true }) }).useLabel('Buscar').disable().validators().required().input.group
        .file('input19', 'Confirmação').useBinaryFormat().acceptImages().disable().validators().required().input.group
        .list('input20', 'I\'m not required', ['Option 1', 'Option 2', 'Option 3']).useDialogEditMode().buttons().add().all().clear().edit().move().remove().sort().list.disable().validators().required().input.group
        .password('input21', 'Password').disable().validators().required().input.group
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
          .validators().required().input
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
          .validators().required().input
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
          .validators().required().input
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
          .validators().required().input
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
          .addValueReaction<SimpleNamedEntity>('inputText', (option) => `Opção escolhida: ${option.name}`)
          // .addStatusReaction<SimpleNamedEntity>('inputText', (option) =>  option.id === '1' ? true : false)
          .showFilter()
          .validators().required().input
          .group
        .text('inputText', 'Automatic')
          .group
      .form
      .build();
  },
  //
  [DemoKeys.FORMS_INPUT_LINKED_DROPDOWN]: () => {
    return new SmzFormBuilder<any>()
    .debugMode()
      .disableFlattenResponse()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .dropdown('input1', 'I\'m required', [{ id: 'A', name: 'Group A'}, { id: 'B', name: 'Group B'}], 'B')
          .validators().required().input
          .group
        .linkedDropdown('input2', 'input1', 'I\'m required', [{ parentId: 'A', data: [{ id: 'A1', name: 'Option A1' }, { id: 'A2', name: 'Option A2' }]}, { parentId: 'B', data: [{ id: 'B1', name: 'Option B1' }, { id: 'B2', name: 'Option B2' }]}], 'B2')
          .validators().required().input
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
          .validators().required().input
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
          .validators().required().input
          .group
        .linkedMultiselect('input2', 'input1', 'I\'m required', [{ parentId: 'A', data: [{ id: 'A1', name: 'Option A1' }, { id: 'A2', name: 'Option A2' }]}, { parentId: 'B', data: [{ id: 'B1', name: 'Option B1' }, { id: 'B2', name: 'Option B2' }]}])
          .validators().required().input
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
          .validators().required().input
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
          .validators().required().input
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
          .validators().required().input
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
          .validators().required().input
          .group
        .switch('isContracted2', 'This input is disabled', true)
          .disable()
          .group
        .form
      .build();
  },
  //
  [DemoKeys.FORMS_INPUT_TEXT_AREA]: () => {

  },
  //
  [DemoKeys.FORMS_INPUT_TAG_AREA]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .tagArea('description', 'Descrição')
          .validators().required().input
          .setTagCharacters('<', '>')
          .addOption('#', [{ id: 'M0-10', value: 'M0-10'}])
          .group
        .form
      .build();
  },
  //
  [DemoKeys.FORMS_INPUT_AUTOCOMPLETE_TAG_AREA]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .autocompleteTagArea('description', 'Descrição com Autocomplete 1', 'Valor inicial <TAG_EXEMPLO>')
          .validators().required().input
          .setTagCharacters('<', '>')
          // .allowCustomValues()
          .addOption('#')
            .setLabel('Sugestões baseadas na sua busca')
            .setEmptyMessage('Nada aqui')
            .setSearchTriggerLength(4)
            .setSearchTrigger((query) => store.dispatch(new DemoFeatureActions.SimulateSearch(query)))
            .setSearchResults(store.select(DemoFeatureSelectors.searchResults))
            .input
          .group
        .form
      .build();
  },
  //
  [DemoKeys.FORMS_INPUT_TEXT]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
          .text('input1', 'I\'m not required')
            .group
        .text('input2', 'I\'m required', 'sample')
            .autoFocus()
            .validators().required().input
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
            .custom((control: UntypedFormControl): { [key: string]: any } => {
              if (control.value === '123') return null;
              return { 'testValidation': true };
            }
          )
            .input
          .group
        .form

      .group('Preenchimento automático')
        .text('name', 'Nome')
          .disable()
          .validators().required().input
          .group
        .text('email', 'Email')
          .disable()
          .validators().required().email().input
          .group
        .text('sector', 'Gerência')
          .disable()
          .validators().required().input
          .group

        // OCULTOS
        .text('identifier', 'Identificador')
          .disable()
          .hide()
          .validators().required().input
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
    const base64Sample = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=';

    return new SmzFormBuilder<any>()
      // .debugMode()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .text('input1', 'I\'m not required', 'Texto')
          .group
        .file('file', 'Confirmação')
          .setDefaultFile(base64Sample, 'teste.jpg', 'image/jpg')
          .useBinaryFormat()
          .acceptImages()
          .validators().required().input
          .group
        .file('file2', 'Confirmação')
            .useGlobalLoader()
            .validators().required().input
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
          .buttons().all().list
          .group
        .form
      .build();
  },
  //
  [DemoKeys.FORMS_INPUT_LIST_NUMBER]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .list('input1', 'I\'m not required', [1, 2, 3])
          .useNumberInput()
          .buttons().all().list
          .group
        .form
      .build();
  },
  //
  [DemoKeys.FORMS_INPUT_LIST_FRACTION_NUMBER]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .list('input1', 'I\'m not required', [1.1, 2, 3.1235])
          .useFractionNumberInput('Ponto', 3)
          .setLimitCount(4)
          .useDialogEditMode()
          .allowOnlyUniqueData()
          .buttons().all().list
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
          .validators().required().input
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
          .validators().required().input
        .group
        .addPasswordConfirmation('password', 'Confirmation')
          .validators().required().input
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
          .validators().required().input
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
          .validators().required().input
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
          .validators().required().input
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
  [DemoKeys.FORMS_MULTIPLE_GROUPS]: () => {
    return new SmzFormBuilder<any>()
      .runCustomFunctionsOnLoad()
      .group('Main')
        .setLayout('EXTRA_SMALL', 'col-12')
        .dropdown('input1', 'I\'m required', [{ id: 'both', name: 'Show Both Groups'}, { id: '1', name: 'Only Group 1'}, { id: '2', name: 'Only Group 2'}], 'both')
          .addGroupReaction<SimpleNamedEntity>('group1', (option) =>  option.id === '1' || option.id === 'both' ? true : false)
          .addGroupReaction<SimpleNamedEntity>('group2', (option) =>  option.id === '2' || option.id === 'both' ? true : false)
          .showFilter()
          .validators().required().input
          .group
        .form
      .group('Group 1', 'group1')
        .hide()
        .setLayout('EXTRA_SMALL', 'col-6')
        .dropdown('country1', 'Países', [ { id: '55e08b38-cec6-4063-acd0-25747f31dc59', name: 'Brazil'}])
          .validators().required().input
          .group
        .form
      .group('Group 2', 'group2')
        .hide()
        .setLayout('EXTRA_SMALL', 'col-6')
        .dropdown('country2', 'Países', [ { id: '55e08b38-cec6-4063-acd0-25747f31dc59', name: 'Brazil'}])
          .validators().required().input
          .group
        .form
    .build();
  },
  //
  [DemoKeys.FORMS_INPUT_TREE_SINGLE_SELECTION]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .tree('singleTree', 'I\'m required')
          .initializeDataTransformation()
            .nested('plant')
              .conditionalSelection((item: any) => { return false; })
              .addChild('topsideModules')
                .back
              .addChild('hullSpaces')
                .setType('space')
                .addChild('structuralMembers')
                  .setType('structural-members')
                  .addChild('plates')
                    .setType('plate')
                    .setIcon('fa-solid fa-bug')
                    // .conditionalSelection((item: any) => item.name !== 'HGP-104-1-2 plate')
                    .makeAsGroup('Chapas')
                      .setIcon('fa-solid fa-circle')
                      .child
                    .back
                  .addChild('reinforcements')
                    .setType('reinforcement')
                    .setIcon('fa-solid fa-user')
                    .makeAsGroup('Reforços')
                      .setIcon('fa-solid fa-circle')
                      .child
                    .back
                  .back
                .back
              .dataSource
            .tree
            .addRawData(store.selectSnapshot(DemoFeatureSelectors.giants))
          .validators().required().input
          .group
      .form
    .build();
  },
  //
  [DemoKeys.FORMS_INPUT_TREE_MULTIPLE_SELECTION]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .tree('multipleTree', 'I\'m required')
          .allowMultiple()
          .initializeDataTransformation()
            .nested('plant')
              .conditionalSelection((item: any) => { return false; })
              .addChild('topsideModules')
                .back
              .addChild('hullSpaces')
                .setType('space')
                .addChild('structuralMembers')
                  .setType('structural-members')
                  .addChild('plates')
                    .setType('plate')
                    .setIcon('fa-solid fa-bug')
                    // .conditionalSelection((item: any) => item.name !== 'HGP-104-1-2 plate')
                    .makeAsGroup('Chapas')
                      .setIcon('fa-solid fa-circle')
                      .child
                    .back
                  .addChild('reinforcements')
                    .setType('reinforcement')
                    .setIcon('fa-solid fa-user')
                    .makeAsGroup('Reforços')
                      .setIcon('fa-solid fa-circle')
                      .child
                    .back
                  .back
                .back
              .dataSource
            .tree
          .addRawData(store.selectSnapshot(DemoFeatureSelectors.giants))
          .validators().required().input
          .group
      .form
    .build();
  },
  //
  [DemoKeys.FORMS_INPUT_TREE_CHECKBOX_SELECTION]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .tree('checkboxTree', 'I\'m required')
          .allowCheckbox()
          .initializeDataTransformation()
            .nested('plant')
              .conditionalSelection((item: any) => { return false; })
              .addChild('topsideModules')
                .back
              .addChild('hullSpaces')
                .setType('space')
                .addChild('structuralMembers')
                  .setType('structural-members')
                  .addChild('plates')
                    .setType('plate')
                    .setIcon('fa-solid fa-bug')
                    // .conditionalSelection((item: any) => item.name !== 'HGP-104-1-2 plate')
                    .makeAsGroup('Chapas')
                      .setIcon('fa-solid fa-circle')
                      .disableSelection()
                      .child
                    .back
                  .addChild('reinforcements')
                    .setType('reinforcement')
                    .setIcon('fa-solid fa-user')
                    .makeAsGroup('Reforços')
                      .setIcon('fa-solid fa-circle')
                      .child
                    .back
                  .back
                .back
              .dataSource
            .tree
          .addRawData(store.selectSnapshot(DemoFeatureSelectors.giants))
          .validators().required().input
          .group
      .form
    .build();
  },
  //
  [DemoKeys.FORMS_INPUT_TREE_CHECKBOX_SELECTION_WITH_DEPENDENCY]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .dropdown('input1', 'I\'m required', [{ id: 'f2b1ae4b-9d37-435e-b566-d15ba51a9c91', name: 'P-38'}, { id: '219746bc-803c-402f-a0d3-40b9a9bacbc', name: 'P-40'}], 'f2b1ae4b-9d37-435e-b566-d15ba51a9c91')
          .validators().required().input
          .group
        .linkedDropdown('input2', 'input1', 'I\'m required', [{ parentId: '219746bc-803c-402f-a0d3-40b9a9bacbc', data: [{ id: 'A1', name: 'Option P-40 1' }, { id: 'A2', name: 'Option P-40 2' }]}, { parentId: 'f2b1ae4b-9d37-435e-b566-d15ba51a9c91', data: [{ id: 'B1', name: 'Option P-38 1' }, { id: 'B2', name: 'Option P-38 2' }] }], 'B2')
          .validators().required().input
        .group
        .tree('tree', 'I\'m required')
          .allowCheckbox()
          .initializeDataTransformation()
            .nested('plant')
              .addChild('topsideModules')
                .back
              .addChild('hullSpaces')
                .setType('space')
                .addChild('structuralMembers')
                  .setType('structural-members')
                  .addChild('plates')
                    .setType('plate')
                    .setIcon('fa-solid fa-bug')
                    // .conditionalSelection((item: any) => item.name !== 'HGP-104-1-2 plate')
                    .makeAsGroup('Chapas')
                      .setIcon('fa-solid fa-circle')
                      .disableSelection()
                      .child
                    .back
                  .addChild('reinforcements')
                    .setType('reinforcement')
                    .setIcon('fa-solid fa-user')
                    .makeAsGroup('Reforços')
                      .setIcon('fa-solid fa-circle')
                      .child
                    .back
                  .back
                .back
              .dataSource
            .tree
          .setTreeDependency('input1')
          .addParentRawData([
            {
              parentId: 'f2b1ae4b-9d37-435e-b566-d15ba51a9c91',
              data: [
                {
                  "name": "P-38",
                  "topsideModules": [],
                  "hullSpaces": [
                    {
                      "name": "Tanque n°1 de carga",
                      "structuralMembers": [
                        {
                          "name": "Escoa Superior da Cav.104",
                          "plates": [
                            {
                              "name": "HGP-104-1-2 plate",
                              "id": "0700c8f1-8ea8-4aa5-b5a3-20f65831c18f"
                            },
                            {
                              "name": "HGP-104-1-4 plate",
                              "id": "0a4e17d6-a04b-4a0b-bc84-dd4eccac4054"
                            },
                            {
                              "name": "HGP-104-1-1 plate",
                              "id": "67980107-db46-4209-8b6a-d3d1815d9e1a"
                            },
                          ],
                          "reinforcements": [
                            {
                              "name": "HGS-104-1-2 reinforcement",
                              "id": "2cc85f5b-e7e9-4d62-a528-d127b9e2562d"
                            },
                            {
                              "name": "HGS-104-1-3 reinforcement",
                              "id": "79bf5fbf-2106-45e9-b6aa-fea5c4fe3584"
                            },
                            {
                              "name": "HGS-104-1-6 reinforcement",
                              "id": "856b9a44-9ba4-4363-8b4c-2936860436a1"
                            },

                          ],
                          "id": "0868ac4f-e17d-4e92-9794-f380540584a2"
                        },
                      ],
                      "id": "b15661d2-e1b1-42ca-bd86-b620ce374939"
                    }
                  ],
                  "id": "f2b1ae4b-9d37-435e-b566-d15ba51a9c91"
                },
              ]
            },
            {
              parentId: '219746bc-803c-402f-a0d3-40b9a9bacbc',
              data: [
                {
                  "name": "P-40",
                  "topsideModules": [],
                  "hullSpaces": [],
                  "id": "219746bc-803c-402f-a0d3-40b9a9bacbc"
                },
              ]
            }
          ])
          .setDefaultValues(['2cc85f5b-e7e9-4d62-a528-d127b9e2562d'])
          .validators().required().input
          .group
      .form
    .build();
  },
  //
  [DemoKeys.FORMS_INPUT_TREE_SELECTION_UTILITIES]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .dropdown('input1', 'I\'m required', store.selectSnapshot(DemoFeatureSelectors.plants))
          .validators().required().input
          .group
        .tree('tree', 'I\'m required')
          .setTreeDependency('input1')
          .addParentTreeNodes(store.selectSnapshot(DemoFeatureSelectors.parentedPortalModelsTree))
          // .setDefaultValue('45c4bc17-039b-463f-ab7e-08dc3c795e42')
          .setDefaultValue(null)
          .utilities()
            .disableSelectionForAllTypes()
            .enableSelection('model')
            .tree
          .validators().required().input
          .group
      .form
    .build();
  },
  //
  [DemoKeys.FORMS_INPUT_TREE_PROPERTY_BASED]: () => {
    return new SmzFormBuilder<any>()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .dropdown('input1', 'I\'m required', store.selectSnapshot(DemoFeatureSelectors.plants))
          .setLayout('EXTRA_SMALL', 'col-6')
          .validators().required().input
          .group
        .tree('tree', 'I\'m related to the Dropdown value')
          .setTreeDependency('input1')
          .setLayout('EXTRA_SMALL', 'col-6')
          .showClear()
          .initializeDataTransformation()
            .propertyBased()
              .includeData()
              .addConditionalRelation('folders', (folder: any): string => {
                if (folder.projects?.length === 0 || folder.projects?.some(x => x.id === '33eb5a13-0829-43d6-ef60-08dc44100a3a')) {
                  return 'SelectableFolder';
                }

                return 'NonSelectableFolder';
              }, true)
              .addRelation('models', 'Model')
              .dataSource
            .tree
          .addParentRawData(store.selectSnapshot(DemoFeatureSelectors.treeWithModelsParented))
          .setDefaultValue('59d58db0-9fba-4eb0-66af-08dc440f7152')
          // .setDefaultValue('4b370629-be52-4b3f-66ac-08dc440f7152')
          .setHeightInPixel(600)
          .utilities()
            .disableSelectionForAllTypes(true)
            .enableSelection('SelectableFolder', true)
            .addIcon('SelectableFolder', 'fa-regular fa-folder')
            .addIcon('NonSelectableFolder', 'fa-regular fa-folder-closed')
            .forEachType('NonSelectableFolder', (node) => node.styleClass = 'text-red-500')
            .addToolTip('NonSelectableFolder', 'Pasta com projetos associados.')
            .tree
          .group

        .tree('tree2', 'I\'m not')
          .setLayout('EXTRA_SMALL', 'col-12')
          .showClear()
          .initializeDataTransformation()
            .propertyBased()
              .includeData()
              .addConditionalRelation('folders', (folder: any): string => {

                if (folder.projects?.length === 0 || folder.projects?.some(x => x.id === '33eb5a13-0829-43d6-ef60-08dc44100a3a')) {
                  return 'SelectableFolder';
                }

                return 'NonSelectableFolder';
              }, true)
              .addRelation('models', 'Model')
              .dataSource
            .tree
          .addRawData(plantsWithModels[0].folders)
          .setDefaultValue('4b370629-be52-4b3f-66ac-08dc440f7152')
          .setHeightInPixel(600)
          .utilities()
            .disableSelectionForAllTypes(true)
            .enableSelection('SelectableFolder', true)
            .addIcon('SelectableFolder', 'fa-regular fa-folder')
            .addIcon('NonSelectableFolder', 'fa-regular fa-folder-cloded')
            .forEachType('NonSelectableFolder', (node) => node.styleClass = 'text-red-500')
            .addToolTip('NonSelectableFolder', 'Pasta com projetos associados.')
            .tree
          .group
      .form
    .build();
  },
  //
  [DemoKeys.FORMS_PLAYGROUND]: () => {
    return new SmzFormBuilder<any>()
      // .debugMode()
      .group()
        .setLayout('EXTRA_SMALL', 'col-12')
        .file('file', 'Confirmação')
          .maxDisplayName(40)
          .useBinaryFormat()
          .validators().required().input
          .group
        .form
      .build();
  },
};