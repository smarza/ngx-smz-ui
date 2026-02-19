import { SmzDialogsConfig, SmzFormsPresets } from '@ngx-smz/core';

const linearPreset: SmzFormsPresets = {
  formTemplates: { extraSmall: { horizontalAlignment: 'justify-start', verticalAlignment: 'items-start' } },
  groupTemplates: { extraSmall: { row: 'col-12' } },
  inputTemplates: { extraSmall: { row: 'col-12', } },
  globalStyleScale: 1
};

export const smzDialogsConfig: SmzDialogsConfig = {
  dialogs: {
    behaviors: {
      showCancelButton: true,
      showConfirmButton: true,
      showCloseButton: true,
      useAdvancedResponse: false,
      closeOnEscape: false,
      showHeader: true,
      showFooter: true,
      dismissableMask: false,
      contentPadding: '1em',
    },
    builtInButtons: {
      confirmName: 'CONFIRMAR',
      cancelName: 'CANCELAR',
      confirmClass: 'smz-confirm-button',
      cancelClass: 'smz-cancel-button',
    },
    featureTemplate: {
      extraSmall: { row: 'col-12' }
    },
    dialogTemplate: {
      extraSmall: { row: 'col-12' },
      small: { row: 'col-10' },
      medium: { row: 'col-10' },
      large: { row: 'col-10' },
      extraLarge: { row: 'col-8' },
    }
  },
  forms: {
    behaviors: {
      avoidFocusOnLoad: true,
      debounceTime: 400,
      flattenResponse: true,
      runCustomFunctionsOnLoad: false,
      skipFunctionAfterNextEmit: false,
      showErrorsMethod: 'touched'
    },
    validators: {
      isRequired: true,
    },
    validationMessages: [
      { type: 'required', message: 'Campo obrigatório.' },
      { type: 'minlength', message: 'Número mínimo de caracteres não atingido.' },
      { type: 'maxlength', message: 'Número máximo de caracteres ultrapassado.' },
      { type: 'min', message: 'Valor mínimo atingido' },
      { type: 'max', message: 'Valor máximo atingido' },
    ],
    ...linearPreset
  }
};