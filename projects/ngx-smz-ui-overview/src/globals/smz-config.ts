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
            contentPadding: '1.5em',
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
            { type: 'test', message: 'Erro na validação test' },
        ],
        multipleErrorMessagesLabel: 'Multiplos erros encontrados',
        controlTypes: {
            [SmzControlType.MULTI_SELECT]: {
                defaultLabel: 'Escolha uma ou mais opções'
            },
            [SmzControlType.FILE]: {
                fileAccept: 'image/*,application/pdf',
            },
            [SmzControlType.CONTENT_MASK]: {
                tagClass: 'bg-primary-color rounded px-1 py-0.5 mx-1 text-primary-color-text font-bold',
                inputClass: 'leading-7'
            }
        },
        formTemplates: {
            extraSmall: { horizontalAlignment: 'justify-between', verticalAlignment: 'items-start' },
            small: { horizontalAlignment: 'justify-between', verticalAlignment: 'items-start' },
        },
        groupTemplates: {
            extraSmall: { row: 'col-12' },
        },
        inputTemplates: {
            extraSmall: { row: 'col-12', },
        },
        globalStyleScale: 1
    },
    charts: {
        emptyMessage: 'Sem dados para exibir'
    }
};