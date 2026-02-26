import {
  SimpleNamedEntity,
  SmzFormBuilder,
  SmzFormsResponse,
  SmzFormViewdata,
} from '@ngx-smz/core';
import { Observable, of } from 'rxjs';
import { UntypedFormControl } from '@angular/forms';

export interface FormUseCase {
  id: string;
  title: string;
  getConfig: () => ReturnType<SmzFormBuilder<unknown>['build']>;
  snippet: string;
}

function buildVisibilityCondition() {
  return new SmzFormBuilder<{
    multiselect1Ids: string[];
    check1: boolean;
    check2: boolean;
    check3: boolean;
  }>()
    .group()
      .setLayout('EXTRA_SMALL', 'col-12')

      .multiselect('multiselect1', 'Multiselect', [
        { id: '1', name: 'Option 1' },
        { id: '2', name: 'Option 2' },
        { id: '3', name: 'Option 3' },
      ], [])
        .validators()
          .required()
          .input
        .group

      .text('text1', 'Multiselect has Option 1')
        .setVisibilityFunction((formValues) => formValues.multiselect1Ids?.includes('1'))
        .validators()
          .required()
          .input
        .group

      .checkbox('check2', 'Multiselect has Option 2')
        .setVisibilityFunction((formValues) => formValues.multiselect1Ids?.includes('2'))
        .group

      .checkbox('check3', 'Multiselect has Option 3')
        .setVisibilityFunction((formValues) => formValues.multiselect1Ids?.includes('3'))
        .group

      .radioGroup('inspectionDataLoadBehavior', 'Método de carregamento', [
        { id: 'giants', name: 'Via Giants' },
        { id: 'spreadsheet', name: 'Via Upload de Planilha' },
      ])
        .setVisibilityFunction((formValues) => formValues.multiselect1Ids?.includes('3'))
        .overrideResponseFormat('Raw')
        .validators()
          .required()
          .input
        .group

      .form
    .build();
}

function buildAllInputs() {
  return new SmzFormBuilder<any>()
    .withNestedResponseKeySeparator('_')
    .disableFlattenResponse()
    .group()
      .setLayout('EXTRA_SMALL', 'col-12')

      .text('info_input1', "I'm required", 'sample')
        .setLayout('EXTRA_SMALL', 'col-4')
        .validators()
          .required()
          .input
        .group

      .checkbox('info_input3', "I'm required")
        .setLayout('EXTRA_SMALL', 'col-4')
        .useLabel('Label Text')
        .validators()
          .required()
          .input
        .group

      .checkboxGroup('info_input4', "I'm required", [
        { id: '1', name: 'Option 1' },
        { id: '2', name: 'Option 2' },
        { id: '3', name: 'Option 3' },
      ])
        .setLayout('EXTRA_SMALL', 'col-4')
        .validators()
          .required()
          .input
        .group

      .calendar('info_input2', 'Date', new Date())
        .setLayout('EXTRA_SMALL', 'col-4')
        .validators()
          .required()
          .input
        .group

      .dropdown('info_input6', "I'm required", [
        { id: '1', name: 'Option 1' },
        { id: '2', name: 'Option 2' },
        { id: '3', name: 'Option 3' },
      ])
        .validators()
          .required()
          .input
        .group

      .multiselect('info_input9', "I'm required", [
        { id: '1', name: 'Option 1' },
        { id: '2', name: 'Option 2' },
        { id: '3', name: 'Option 3' },
      ])
        .validators()
          .required()
          .input
        .group

      .colorPicker('info_input12', "I'm required")
        .validators()
          .required()
          .input
        .group

      .currency('metadata_input13', "I'm required")
        .validators()
          .required()
          .input
        .group

      .number('metadata_input14', 'Fraction Number')
        .setFraction(2, 2)
        .setLocale('pt-BR')
        .validators()
          .required()
          .input
        .group

      .radioGroup('metadata_input15', 'Radio', [
        { id: 'Nenhum', name: 'Nenhum' },
        { id: 'Irregularidade', name: 'Irregularidade' },
        { id: 'Tortuosidade', name: 'Tortuosidade' },
      ], 'Irregularidade')
        .validators()
          .required()
          .input
        .group

      .switch('metadata_input16', 'IsContracted')
        .validators()
          .required()
          .input
        .group

      .password('metadata_input21', 'Password')
        .validators()
          .required()
          .input
        .group

      .form
    .build();
}

function buildCalendar() {
  return new SmzFormBuilder<any>()
    .group()
      .setLayout('EXTRA_SMALL', 'col-12')

      .calendar('input1', "I'm not required")
        .group

      .calendar('input2', 'With default', new Date())
        .group

      .calendar('input3', "I'm required")
        .validators()
          .required()
          .input
        .group

      .form
    .build();
}

function buildCheckbox() {
  return new SmzFormBuilder<any>()
    .group()
      .setLayout('EXTRA_SMALL', 'col-12')

      .checkbox('input1', "I'm not required")
        .group

      .checkbox('input2', "I'm required")
        .validators()
          .required()
          .input
        .group

      .form
    .build();
}

function buildCheckboxGroup() {
  return new SmzFormBuilder<any>()
    .group()
      .setLayout('EXTRA_SMALL', 'col-12')

      .checkboxGroup('input1', "I'm required", [
        { id: '1', name: 'Option 1' },
        { id: '2', name: 'Option 2' },
        { id: '3', name: 'Option 3' },
      ])
        .validators()
          .required()
          .input
        .group

      .form
    .build();
}

function buildDropdown() {
  return new SmzFormBuilder<any>()
    .group()
      .setLayout('EXTRA_SMALL', 'col-12')

      .dropdown('input1', "I'm required", [
        { id: '1', name: 'Option 1' },
        { id: '2', name: 'Option 2' },
        { id: '3', name: 'Option 3' },
      ])
        .showFilter()
        .validators()
          .required()
          .input
        .group

      .form
    .build();
}

function buildLinkedDropdown() {
  return new SmzFormBuilder<any>()
    .disableFlattenResponse()
    .group()
      .setLayout('EXTRA_SMALL', 'col-12')

      .dropdown('plant', 'Planta', [
        { id: 'A', name: 'Plant A' },
        { id: 'B', name: 'Plant B' },
      ], 'A')
        .validators()
          .required()
          .input
        .group

      .linkedDropdown('year', 'plant', 'Ano', [
        {
          parentId: 'A',
          data: [
            { id: 'A1', name: '2024' },
            { id: 'A2', name: '2025' },
          ],
        },
        {
          parentId: 'B',
          data: [
            { id: 'B1', name: '2024' },
            { id: 'B2', name: '2025' },
          ],
        },
      ], 'A1')
        .validators()
          .required()
          .input
        .group

      .form
    .build();
}

function buildMultiselect() {
  return new SmzFormBuilder<any>()
    .group()
      .setLayout('EXTRA_SMALL', 'col-12')

      .multiselect('input1', "I'm required", [
        { id: '1', name: 'Option 1' },
        { id: '2', name: 'Option 2' },
        { id: '3', name: 'Option 3' },
      ])
        .validators()
          .required()
          .input
        .group

      .form
    .build();
}

function buildLinkedMultiselect() {
  return new SmzFormBuilder<any>()
    .group()
      .setLayout('EXTRA_SMALL', 'col-12')

      .dropdown('input1', "I'm required", [
        { id: 'A', name: 'Group A' },
        { id: 'B', name: 'Group B' },
      ], 'B')
        .validators()
          .required()
          .input
        .group

      .linkedMultiselect('input2', 'input1', "I'm required", [
        {
          parentId: 'A',
          data: [
            { id: 'A1', name: 'Option A1' },
            { id: 'A2', name: 'Option A2' },
          ],
        },
        {
          parentId: 'B',
          data: [
            { id: 'B1', name: 'Option B1' },
            { id: 'B2', name: 'Option B2' },
          ],
        },
      ], ['B1', 'B2'])
        .validators()
          .required()
          .input
        .group

      .form
    .build();
}

function buildColorPicker() {
  return new SmzFormBuilder<any>()
    .group()
      .setLayout('EXTRA_SMALL', 'col-12')

      .colorPicker('input1', "I'm not required")
        .group

      .colorPicker('input2', "I'm required")
        .validators()
          .required()
          .input
        .group

      .form
    .build();
}

function buildCurrency() {
  return new SmzFormBuilder<any>()
    .group()
      .setLayout('EXTRA_SMALL', 'col-12')

      .currency('input1', "I'm not required")
        .group

      .currency('input2', "I'm required")
        .validators()
          .required()
          .input
        .group

      .form
    .build();
}

function buildNumber() {
  return new SmzFormBuilder<any>()
    .emitChangesOnFocusExit()
    .group()
      .setLayout('EXTRA_SMALL', 'col-12')

      .number('input1', "I'm not required")
        .group

      .number('input2', "I'm required")
        .validators()
          .required()
          .input
        .group

      .number('input3', 'Fraction Number')
        .setFraction(2, 2)
        .setLocale('pt-BR')
        .group

      .form
    .build();
}

function buildRadioGroup() {
  return new SmzFormBuilder<any>()
    .group()
      .setLayout('EXTRA_SMALL', 'col-12')

      .radioGroup('radio', 'Radio', [
        { id: 'Nenhum', name: 'Nenhum' },
        { id: 'Irregularidade', name: 'Irregularidade' },
        { id: 'Tortuosidade', name: 'Tortuosidade' },
      ], 'Irregularidade')
        .group

      .form
    .build();
}

function buildSwitch() {
  return new SmzFormBuilder<any>()
    .group()
      .setLayout('EXTRA_SMALL', 'col-12')

      .switch('isContracted', 'IsContracted')
        .validators()
          .required()
          .input
        .group

      .switch('isContracted2', 'Disabled', true)
        .disable()
        .group

      .form
    .build();
}

function buildText() {
  return new SmzFormBuilder<any>()
    .group()
      .setLayout('EXTRA_SMALL', 'col-12')

      .text('input1', "I'm not required")
        .group

      .text('input2', "I'm required", 'sample')
        .autoFocus()
        .validators()
          .required()
          .input
        .group

      .form
    .build();
}

function buildTextButton() {
  return new SmzFormBuilder<any>()
    .showMultipleErrorsMessages()
    .group('Chave correta: access')

      .textButton(
        'key',
        'Chave',
        '',
        (
          response: SmzFormsResponse<any>,
          utils: SmzFormViewdata
        ): Observable<{ isValid: boolean; messages?: string[] }> => {
          if (response.data.key === 'access') {
            utils.updateInputValue('name', 'user.name');
            utils.updateInputValue('email', 'user@email.com');
            return of({ isValid: true });
          }
          utils.updateInputValue('name', '');
          utils.updateInputValue('email', '');
          return of({ isValid: false, messages: ['Chave inválida'] });
        }
      )
        .useLabel('Buscar')
        .validators()
          .required()
          .custom((control: UntypedFormControl): { [key: string]: unknown } => {
            if (control.value === '123') {
              return null;
            }
            return { testValidation: true };
          })
          .input
        .group

      .form

    .group('Preenchimento automático')

      .text('name', 'Nome')
        .disable()
        .validators()
          .required()
          .input
        .group

      .text('email', 'Email')
        .disable()
        .validators()
          .required()
          .email()
          .input
        .group

      .form
    .build();
}

function buildFile() {
  return new SmzFormBuilder<any>()
    .group()
      .setLayout('EXTRA_SMALL', 'col-12')

      .text('input1', "I'm not required", 'Texto')
        .group

      .file('first', 'Confirmação First')
        .acceptImages()
        .validators()
          .required()
          .input
        .group

      .file('second', 'Confirmação Second')
        .validators()
          .required()
          .input
        .group

      .form
    .build();
}

function buildListDialogCrud() {
  return new SmzFormBuilder<any>()
    .group()
      .setLayout('EXTRA_SMALL', 'col-12')

      .list('input1', "I'm not required", ['Option 1', 'Option 2', 'Option 3'])
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
}

function buildListInlineCrud() {
  return new SmzFormBuilder<any>()
    .group()
      .setLayout('EXTRA_SMALL', 'col-12')

      .list('input1', "I'm not required", ['Option 1', 'Option 2', 'Option 3'])
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
}

function buildPassword() {
  return new SmzFormBuilder<any>()
    .group()
      .setLayout('EXTRA_SMALL', 'col-12')

      .password('password', 'Password')
        .validators()
          .required()
          .input
        .group

      .form
    .build();
}

function buildPasswordWithConfirmation() {
  return new SmzFormBuilder<any>()
    .group()
      .setLayout('EXTRA_SMALL', 'col-12')

      .password('password', 'Password')
        .validators()
          .required()
          .input
        .group

      .addPasswordConfirmation('password', 'Confirmation')
        .validators()
          .required()
          .input
        .group

      .form
    .build();
}

function buildTagArea() {
  return new SmzFormBuilder<any>()
    .group()
      .setLayout('EXTRA_SMALL', 'col-12')

      .tagArea('description', 'Descrição')
        .validators()
          .required()
          .input
        .setTagCharacters('<', '>')
        .addOption('#', [{ id: 'M0-10', value: 'M0-10' }])
        .group

      .form
    .build();
}

function buildMultipleGroups() {
  return new SmzFormBuilder<any>()
    .runCustomFunctionsOnLoad()
    .group('Main')
      .setLayout('EXTRA_SMALL', 'col-12')

      .dropdown('input1', "I'm required", [
        { id: 'both', name: 'Show Both Groups' },
        { id: '1', name: 'Only Group 1' },
        { id: '2', name: 'Only Group 2' },
      ], 'both')
        .addGroupReaction<SimpleNamedEntity>('group1', (option) => option.id === '1' || option.id === 'both')
        .addGroupReaction<SimpleNamedEntity>('group2', (option) => option.id === '2' || option.id === 'both')
        .showFilter()
        .validators()
          .required()
          .input
        .group

      .form

    .group('Group 1', 'group1')
      .hide()
      .setLayout('EXTRA_SMALL', 'col-6')

      .dropdown('country1', 'Países', [
        { id: '55e08b38-cec6-4063-acd0-25747f31dc59', name: 'Brazil' },
      ])
        .validators()
          .required()
          .input
        .group

      .form

    .group('Group 2', 'group2')
      .hide()
      .setLayout('EXTRA_SMALL', 'col-6')

      .dropdown('country2', 'Países', [
        { id: '55e08b38-cec6-4063-acd0-25747f31dc59', name: 'Brazil' },
      ])
        .validators()
          .required()
          .input
        .group

      .form
    .build();
}

// ────────────────────────────────────────────────────────
// Snippets
// ────────────────────────────────────────────────────────

const SNIPPET_VISIBILITY = `new SmzFormBuilder()
  .group()
    .multiselect('multiselect1', 'Multiselect', options, [])
      .validators().required().input
      .group
    .text('text1', 'Visible when Option 1 selected')
      .setVisibilityFunction((formValues) => formValues.multiselect1Ids?.includes('1'))
      .validators().required().input
      .group
    .form
  .build();`;

const SNIPPET_ALL_INPUTS = `new SmzFormBuilder<any>()
  .group()
    .text('info_input1', "I'm required", 'sample')
      .validators().required().input
      .group
    .checkbox('info_input3', "I'm required")
      .validators().required().input
      .group
    .calendar('info_input2', 'Date', new Date())
      .validators().required().input
      .group
    .dropdown('info_input6', "I'm required", options)
      .validators().required().input
      .group
    .multiselect('info_input9', "I'm required", options)
      .validators().required().input
      .group
    .currency('metadata_input13', "I'm required")
      .validators().required().input
      .group
    .radioGroup('metadata_input15', 'Radio', options, 'Irregularidade')
      .group
    .switch('metadata_input16', 'IsContracted')
      .validators().required().input
      .group
    .password('metadata_input21', 'Password')
      .validators().required().input
      .group
    .form
  .build();`;

const SNIPPET_CALENDAR = `new SmzFormBuilder<any>()
  .group()
    .calendar('input1', "I'm not required")
      .group
    .calendar('input2', 'With default', new Date())
      .group
    .calendar('input3', "I'm required")
      .validators().required().input
      .group
    .form
  .build();`;

const SNIPPET_CHECKBOX = `new SmzFormBuilder<any>()
  .group()
    .checkbox('input1', "I'm not required")
      .group
    .checkbox('input2', "I'm required")
      .validators().required().input
      .group
    .form
  .build();`;

const SNIPPET_CHECKBOX_GROUP = `new SmzFormBuilder<any>()
  .group()
    .checkboxGroup('input1', "I'm required", [
      { id: '1', name: 'Option 1' },
      { id: '2', name: 'Option 2' },
    ])
      .validators().required().input
      .group
    .form
  .build();`;

const SNIPPET_DROPDOWN = `new SmzFormBuilder<any>()
  .group()
    .dropdown('input1', "I'm required", options)
      .showFilter()
      .validators().required().input
      .group
    .form
  .build();`;

const SNIPPET_LINKED_DROPDOWN = `new SmzFormBuilder<any>()
  .disableFlattenResponse()
  .group()
    .dropdown('plant', 'Planta', plants, 'A')
      .validators().required().input
      .group
    .linkedDropdown('year', 'plant', 'Ano', linkedData, 'A1')
      .validators().required().input
      .group
    .form
  .build();`;

const SNIPPET_MULTISELECT = `new SmzFormBuilder<any>()
  .group()
    .multiselect('input1', "I'm required", options)
      .validators().required().input
      .group
    .form
  .build();`;

const SNIPPET_LINKED_MULTISELECT = `new SmzFormBuilder<any>()
  .group()
    .dropdown('input1', 'Parent', parentOptions, 'B')
      .validators().required().input
      .group
    .linkedMultiselect('input2', 'input1', 'Child', linkedData, ['B1', 'B2'])
      .validators().required().input
      .group
    .form
  .build();`;

const SNIPPET_COLOR_PICKER = `new SmzFormBuilder<any>()
  .group()
    .colorPicker('input1', "I'm not required")
      .group
    .colorPicker('input2', "I'm required")
      .validators().required().input
      .group
    .form
  .build();`;

const SNIPPET_CURRENCY = `new SmzFormBuilder<any>()
  .group()
    .currency('input1', "I'm not required")
      .group
    .currency('input2', "I'm required")
      .validators().required().input
      .group
    .form
  .build();`;

const SNIPPET_NUMBER = `new SmzFormBuilder<any>()
  .emitChangesOnFocusExit()
  .group()
    .number('input1', "I'm not required")
      .group
    .number('input2', "I'm required")
      .validators().required().input
      .group
    .number('input3', 'Fraction')
      .setFraction(2, 2)
      .setLocale('pt-BR')
      .group
    .form
  .build();`;

const SNIPPET_RADIO_GROUP = `new SmzFormBuilder<any>()
  .group()
    .radioGroup('radio', 'Radio', [
      { id: 'A', name: 'Option A' },
      { id: 'B', name: 'Option B' },
    ], 'A')
      .group
    .form
  .build();`;

const SNIPPET_SWITCH = `new SmzFormBuilder<any>()
  .group()
    .switch('isContracted', 'IsContracted')
      .validators().required().input
      .group
    .switch('disabled', 'Disabled', true)
      .disable()
      .group
    .form
  .build();`;

const SNIPPET_TEXT = `new SmzFormBuilder<any>()
  .group()
    .text('input1', "I'm not required")
      .group
    .text('input2', "I'm required", 'sample')
      .autoFocus()
      .validators().required().input
      .group
    .form
  .build();`;

const SNIPPET_TEXT_BUTTON = `new SmzFormBuilder<any>()
  .showMultipleErrorsMessages()
  .group('Chave correta: access')
    .textButton('key', 'Chave', '', callback)
      .useLabel('Buscar')
      .validators().required().input
      .group
    .form
  .group('Preenchimento automático')
    .text('name', 'Nome')
      .disable()
      .group
    .text('email', 'Email')
      .disable()
      .group
    .form
  .build();`;

const SNIPPET_FILE = `new SmzFormBuilder<any>()
  .group()
    .file('first', 'File')
      .acceptImages()
      .validators().required().input
      .group
    .file('second', 'Second')
      .validators().required().input
      .group
    .form
  .build();`;

const SNIPPET_LIST_DIALOG = `new SmzFormBuilder<any>()
  .group()
    .list('input1', 'List', ['Option 1', 'Option 2'])
      .useDialogEditMode()
      .buttons()
        .add().clear().edit().move().remove().sort()
        .list
      .group
    .form
  .build();`;

const SNIPPET_LIST_INLINE = `new SmzFormBuilder<any>()
  .group()
    .list('input1', 'List', ['Option 1', 'Option 2'])
      .buttons()
        .add().clear().edit().move().remove().sort()
        .list
      .group
    .form
  .build();`;

const SNIPPET_PASSWORD = `new SmzFormBuilder<any>()
  .group()
    .password('password', 'Password')
      .validators().required().input
      .group
    .form
  .build();`;

const SNIPPET_PASSWORD_CONFIRMATION = `new SmzFormBuilder<any>()
  .group()
    .password('password', 'Password')
      .validators().required().input
      .group
    .addPasswordConfirmation('password', 'Confirmation')
      .validators().required().input
      .group
    .form
  .build();`;

const SNIPPET_TAG_AREA = `new SmzFormBuilder<any>()
  .group()
    .tagArea('description', 'Descrição')
      .validators().required().input
      .setTagCharacters('<', '>')
      .addOption('#', [{ id: 'M0-10', value: 'M0-10' }])
      .group
    .form
  .build();`;

const SNIPPET_MULTIPLE_GROUPS = `new SmzFormBuilder<any>()
  .runCustomFunctionsOnLoad()
  .group('Main')
    .dropdown('input1', 'Choose', options, 'both')
      .addGroupReaction('group1', (opt) => opt.id === '1' || opt.id === 'both')
      .addGroupReaction('group2', (opt) => opt.id === '2' || opt.id === 'both')
      .showFilter()
      .validators().required().input
      .group
    .form
  .group('Group 1', 'group1')
    .hide()
    .dropdown('country1', 'Países', countries)
      .validators().required().input
      .group
    .form
  .group('Group 2', 'group2')
    .hide()
    .dropdown('country2', 'Países', countries)
      .validators().required().input
      .group
    .form
  .build();`;

export const FORMS_USE_CASES: FormUseCase[] = [
  {
    id: 'visibility-condition',
    title: 'Visibility condition',
    getConfig: buildVisibilityCondition,
    snippet: SNIPPET_VISIBILITY,
  },
  {
    id: 'all-inputs',
    title: 'All inputs',
    getConfig: buildAllInputs,
    snippet: SNIPPET_ALL_INPUTS,
  },
  {
    id: 'calendar',
    title: 'Calendar',
    getConfig: buildCalendar,
    snippet: SNIPPET_CALENDAR,
  },
  {
    id: 'checkbox',
    title: 'Checkbox',
    getConfig: buildCheckbox,
    snippet: SNIPPET_CHECKBOX,
  },
  {
    id: 'checkbox-group',
    title: 'Checkbox group',
    getConfig: buildCheckboxGroup,
    snippet: SNIPPET_CHECKBOX_GROUP,
  },
  {
    id: 'dropdown',
    title: 'Dropdown',
    getConfig: buildDropdown,
    snippet: SNIPPET_DROPDOWN,
  },
  {
    id: 'linked-dropdown',
    title: 'Linked dropdown',
    getConfig: buildLinkedDropdown,
    snippet: SNIPPET_LINKED_DROPDOWN,
  },
  {
    id: 'multiselect',
    title: 'Multiselect',
    getConfig: buildMultiselect,
    snippet: SNIPPET_MULTISELECT,
  },
  {
    id: 'linked-multiselect',
    title: 'Linked multiselect',
    getConfig: buildLinkedMultiselect,
    snippet: SNIPPET_LINKED_MULTISELECT,
  },
  {
    id: 'color-picker',
    title: 'Color picker',
    getConfig: buildColorPicker,
    snippet: SNIPPET_COLOR_PICKER,
  },
  {
    id: 'currency',
    title: 'Currency',
    getConfig: buildCurrency,
    snippet: SNIPPET_CURRENCY,
  },
  {
    id: 'number',
    title: 'Number',
    getConfig: buildNumber,
    snippet: SNIPPET_NUMBER,
  },
  {
    id: 'radio-group',
    title: 'Radio group',
    getConfig: buildRadioGroup,
    snippet: SNIPPET_RADIO_GROUP,
  },
  {
    id: 'switch',
    title: 'Switch',
    getConfig: buildSwitch,
    snippet: SNIPPET_SWITCH,
  },
  {
    id: 'text',
    title: 'Text',
    getConfig: buildText,
    snippet: SNIPPET_TEXT,
  },
  {
    id: 'text-button',
    title: 'Text button',
    getConfig: buildTextButton,
    snippet: SNIPPET_TEXT_BUTTON,
  },
  {
    id: 'file',
    title: 'File',
    getConfig: buildFile,
    snippet: SNIPPET_FILE,
  },
  {
    id: 'list-dialog-crud',
    title: 'List (dialog CRUD)',
    getConfig: buildListDialogCrud,
    snippet: SNIPPET_LIST_DIALOG,
  },
  {
    id: 'list-inline-crud',
    title: 'List (inline CRUD)',
    getConfig: buildListInlineCrud,
    snippet: SNIPPET_LIST_INLINE,
  },
  {
    id: 'password',
    title: 'Password',
    getConfig: buildPassword,
    snippet: SNIPPET_PASSWORD,
  },
  {
    id: 'password-with-confirmation',
    title: 'Password with confirmation',
    getConfig: buildPasswordWithConfirmation,
    snippet: SNIPPET_PASSWORD_CONFIRMATION,
  },
  {
    id: 'tag-area',
    title: 'Tag area',
    getConfig: buildTagArea,
    snippet: SNIPPET_TAG_AREA,
  },
  {
    id: 'multiple-groups',
    title: 'Multiple groups',
    getConfig: buildMultipleGroups,
    snippet: SNIPPET_MULTIPLE_GROUPS,
  },
];
