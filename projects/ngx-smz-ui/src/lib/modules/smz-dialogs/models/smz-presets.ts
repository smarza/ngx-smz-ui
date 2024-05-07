import { SmzDialogPreset } from './smz-dialogs';

export type SmzPresetTypes = keyof typeof SmzPresets

export const enum SmzPresets
{
    Message = 'Message',
    CustomMessage = 'CustomMessage',
    SimpleCrud = 'SimpleCrud',
    SaveForm = 'SaveForm',
    FlatCrud = 'FlatCrud',
    Confirmation = 'Confirmation',
    CriticalConfirmation = 'CriticalConfirmation',
    Html = 'Html',
}

export function getPreset(preset: SmzPresetTypes): SmzDialogPreset
{
    return SmzPreset[preset];
}

const SmzPreset: { [key in SmzPresets]: SmzDialogPreset } = {
    'Message': {
        dialog: {
            behaviors: {
                showCancelButton: false,
                showConfirmButton: false,
                showCloseButton: true,
                showOkButton: true,
                showSaveButton: false,
                useAdvancedResponse: false,
                closeOnEscape: false,
                confirmOnEnter: true,
                showHeader: true,
                showFooter: true,
                dismissableMask: false,
                contentPadding: '1.5em',
                includeComponentResponses: false,
            },
            builtInButtons: {
                confirmDependsOnValidation: false,
                okDependsOnValidation: false
            },
            dialogTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-10' },
                medium: { row: 'col-8' },
                large: { row: 'col-8' },
                extraLarge: { row: 'col-6' },
            }
        },
        features: {
            formBehaviors: {},
            featureTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-12' },
                medium: { row: 'col-12' },
                large: { row: 'col-12' },
                extraLarge: { row: 'col-12' },
            },
            formGroupTemplate: {},
            formControlTemplate: {}
        },
    },
    'CustomMessage': {
        dialog: {
            behaviors: {
                showCancelButton: false,
                showConfirmButton: false,
                showCloseButton: true,
                showOkButton: false,
                showSaveButton: false,
                useAdvancedResponse: false,
                closeOnEscape: false,
                confirmOnEnter: false,
                showHeader: true,
                showFooter: true,
                dismissableMask: false,
                contentPadding: '1.5em',
                includeComponentResponses: false,
            },
            builtInButtons: {
                confirmDependsOnValidation: false,
                okDependsOnValidation: false
            },
            dialogTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-10' },
                medium: { row: 'col-8' },
                large: { row: 'col-8' },
                extraLarge: { row: 'col-6' },
            }
        },
        features: {
            formBehaviors: {},
            featureTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-12' },
                medium: { row: 'col-12' },
                large: { row: 'col-12' },
                extraLarge: { row: 'col-12' },
            },
            formGroupTemplate: {},
            formControlTemplate: {}
        },
    },
    'Html': {
        dialog: {
            behaviors: {
                showCancelButton: false,
                showConfirmButton: false,
                showCloseButton: true,
                showOkButton: false,
                showSaveButton: false,
                useAdvancedResponse: false,
                closeOnEscape: true,
                confirmOnEnter: false,
                showHeader: true,
                showFooter: false,
                dismissableMask: false,
                contentPadding: '1.5em',
                includeComponentResponses: false,
            },
            builtInButtons: {
                confirmDependsOnValidation: false,
                okDependsOnValidation: false
            },
            dialogTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-12' },
                medium: { row: 'col-10' },
                large: { row: 'col-10' },
                extraLarge: { row: 'col-10' },
            }
        },
        features: {
            formBehaviors: {},
            featureTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-12' },
                medium: { row: 'col-12' },
                large: { row: 'col-12' },
                extraLarge: { row: 'col-12' },
            },
            formGroupTemplate: {},
            formControlTemplate: {}
        },
    },
    'SimpleCrud': {
        dialog: {
            behaviors: {
                showCancelButton: true,
                showConfirmButton: true,
                showCloseButton: true,
                showOkButton: false,
                showSaveButton: false,
                useAdvancedResponse: false,
                closeOnEscape: false,
                confirmOnEnter: false,
                showHeader: true,
                showFooter: true,
                dismissableMask: false,
                contentPadding: '1.5em',
                includeComponentResponses: false,
            },
            builtInButtons: {
                confirmDependsOnValidation: true,
                okDependsOnValidation: false
            },
            dialogTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-10' },
                medium: { row: 'col-8' },
                large: { row: 'col-8' },
                extraLarge: { row: 'col-6' },
            }
        },
        features: {
            formBehaviors: {
                avoidFocusOnLoad: false,
                debounceTime: 200,
                runCustomFunctionsOnLoad: false,
                skipFunctionAfterNextEmit: false,
                flattenResponse: false,
                showErrorsMethod: 'touched',
            },
            featureTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-12' },
                medium: { row: 'col-12' },
                large: { row: 'col-12' },
                extraLarge: { row: 'col-12' },
            },
            formGroupTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-12' },
                medium: { row: 'col-12' },
                large: { row: 'col-12' },
                extraLarge: { row: 'col-12' },
            },
            formControlTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-12' },
                medium: { row: 'col-12' },
                large: { row: 'col-12' },
                extraLarge: { row: 'col-12' },
            }
        },
        globals: {
            globalStyleScale: 1,
            spacer: '0.3em'
        }
    },
    'SaveForm': {
        dialog: {
            behaviors: {
                showCancelButton: false,
                showConfirmButton: false,
                showCloseButton: true,
                showOkButton: false,
                showSaveButton: true,
                useAdvancedResponse: false,
                closeOnEscape: true,
                confirmOnEnter: true,
                showHeader: true,
                showFooter: true,
                dismissableMask: false,
                contentPadding: '1.5em',
                includeComponentResponses: false,
            },
            builtInButtons: {
                saveDependsOnValidation: true,
                saveName: 'SALVAR'
            },
            dialogTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-10' },
                medium: { row: 'col-8' },
                large: { row: 'col-8' },
                extraLarge: { row: 'col-6' },
            }
        },
        features: {
            formBehaviors: {
                avoidFocusOnLoad: false,
                debounceTime: 400,
                runCustomFunctionsOnLoad: false,
                skipFunctionAfterNextEmit: false,
                flattenResponse: false,
                showErrorsMethod: 'dirty',
            },
            featureTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-12' },
                medium: { row: 'col-12' },
                large: { row: 'col-12' },
                extraLarge: { row: 'col-12' },
            },
            formGroupTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-12' },
                medium: { row: 'col-12' },
                large: { row: 'col-12' },
                extraLarge: { row: 'col-12' },
            },
            formControlTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-12' },
                medium: { row: 'col-12' },
                large: { row: 'col-12' },
                extraLarge: { row: 'col-12' },
            }
        },
        globals: {
            globalStyleScale: 1,
            spacer: '0.3em'
        }
    },
    'FlatCrud': {
        dialog: {
            behaviors: {
                showCancelButton: true,
                showConfirmButton: true,
                showCloseButton: true,
                showOkButton: false,
                showSaveButton: false,
                useAdvancedResponse: false,
                closeOnEscape: false,
                confirmOnEnter: false,
                showHeader: true,
                showFooter: true,
                dismissableMask: false,
                contentPadding: '1.5em',
                includeComponentResponses: false,
            },
            builtInButtons: {
                confirmDependsOnValidation: true,
                okDependsOnValidation: false
            },
            dialogTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-10' },
                medium: { row: 'col-8' },
                large: { row: 'col-8' },
                extraLarge: { row: 'col-6' },
            }
        },
        features: {
            formBehaviors: {
                avoidFocusOnLoad: false,
                debounceTime: 400,
                runCustomFunctionsOnLoad: false,
                skipFunctionAfterNextEmit: false,
                flattenResponse: true,
                showErrorsMethod: 'touched',
            },
            featureTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-12' },
                medium: { row: 'col-12' },
                large: { row: 'col-12' },
                extraLarge: { row: 'col-12' },
            },
            formGroupTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-12' },
                medium: { row: 'col-12' },
                large: { row: 'col-12' },
                extraLarge: { row: 'col-12' },
            },
            formControlTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-12' },
                medium: { row: 'col-12' },
                large: { row: 'col-12' },
                extraLarge: { row: 'col-12' },
            }
        },
        globals: {
            globalStyleScale: 1,
            spacer: '0.3em'
        }
    },
    'Confirmation': {
        dialog: {
            behaviors: {
                showCancelButton: true,
                showConfirmButton: true,
                showCloseButton: true,
                showOkButton: false,
                showSaveButton: false,
                useAdvancedResponse: false,
                closeOnEscape: false,
                confirmOnEnter: true,
                showHeader: true,
                showFooter: true,
                dismissableMask: false,
                contentPadding: '1.5em',
                includeComponentResponses: false,
            },
            builtInButtons: {
                confirmDependsOnValidation: false,
                okDependsOnValidation: false,
                confirmName: 'Sim',
                cancelName: 'Não'
            },
            dialogTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-10' },
                medium: { row: 'col-8' },
                large: { row: 'col-8' },
                extraLarge: { row: 'col-6' },
            }
        },
        features: {
            formBehaviors: {},
            featureTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-12' },
                medium: { row: 'col-12' },
                large: { row: 'col-12' },
                extraLarge: { row: 'col-12' },
            },
            formGroupTemplate: {},
            formControlTemplate: {}
        },
    },
    'CriticalConfirmation': {
        dialog: {
            behaviors: {
                showCancelButton: true,
                showConfirmButton: true,
                showCloseButton: true,
                showOkButton: false,
                showSaveButton: false,
                useAdvancedResponse: false,
                closeOnEscape: false,
                confirmOnEnter: true,
                showHeader: true,
                showFooter: true,
                dismissableMask: false,
                contentPadding: '1.5em',
                includeComponentResponses: false,
            },
            builtInButtons: {
                confirmDependsOnValidation: false,
                okDependsOnValidation: false,
                confirmName: 'Sim',
                confirmClass: 'p-button-outlined p-button-danger',
                cancelName: 'Não',
                cancelClass: 'p-button-outlined',
            },
            dialogTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-10' },
                medium: { row: 'col-8' },
                large: { row: 'col-8' },
                extraLarge: { row: 'col-6' },
            }
        },
        features: {
            formBehaviors: {},
            featureTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-12' },
                medium: { row: 'col-12' },
                large: { row: 'col-12' },
                extraLarge: { row: 'col-12' },
            },
            formGroupTemplate: {},
            formControlTemplate: {}
        },
    },
}