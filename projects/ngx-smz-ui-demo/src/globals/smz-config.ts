import { SmzControlType, SmzDialogsConfig } from 'ngx-smz-ui';

export const smzDialogsConfig: SmzDialogsConfig = {
    dialogs: {
        behaviors: {
            showCancelButton: true,
            showConfirmButton: true,
            showCloseButton: true,
            showMaximizeButton: false,
            useAdvancedResponse: false,
            closeOnEscape: false,
            showHeader: true,
            showFooter: true,
            dismissableMask: false,
            contentPadding: '1em',
            baseZIndex: 0,
            includeComponentResponses: false
        },
        builtInButtons: {
            confirmName: 'CONFIRMAR',
            confirmDependsOnValidation: true,
            cancelName: 'CANCELAR',
            cancelClass: 'smz-button-ghost',
            okName: 'OK',
            okDependsOnValidation: false,
        },
        featureTemplate: {
            extraSmall: { row: 'col-12' }
        },
        dialogTemplate: {
            extraSmall: { row: 'col-12' },
            large: { row: 'col-8' },
            extraLarge: { row: 'col-6' },
        }
    },
    forms: {
        behaviors: {
            avoidFocusOnLoad: true,
            debounceTime: 400,
            flattenResponse: true,
            runCustomFunctionsOnLoad: false,
            skipFunctionAfterNextEmit: false,
            showErrorsMethod: 'touched',
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
        multipleErrorMessagesLabel: 'Multiplos erros encontrados',
        controlTypes: {
            [SmzControlType.MULTI_SELECT]: {
                defaultLabel: 'Escolha uma ou mais opções'
            },
            [SmzControlType.FILE]: {
                fileAccept: 'image/*,application/pdf',
            }
        },
        formTemplates: {
            extraSmall: { horizontalAlignment: 'justify-content-between', verticalAlignment: 'align-items-start' },
            small: { horizontalAlignment: 'justify-content-between', verticalAlignment: 'align-items-start' },
        },
        groupTemplates: {
            extraSmall: { row: 'col-12' },
        },
        inputTemplates: {
            extraSmall: { row: 'col-12', },
        },
        globalStyleScale: 0.8
    },
    charts: {
        emptyMessage: 'Sem dados para exibir'
    }
};