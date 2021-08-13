import { Validators } from '@angular/forms';
import { SmzDialogFeature } from '../../smz-dialogs/models/smz-dialogs';
import { SmzTextControl, SmzControlType, SmzTextAreaControl } from '../../smz-forms/models/control-types';
import { SmzForm, SmzFormGroup } from '../../smz-forms/models/smz-forms';
import { FaqDetails } from '../models/faqs';

export namespace FaqsForms
{
    export function getFormFeature(data: FaqDetails = null): SmzDialogFeature
    {
        const form: SmzForm<never> = {
            formId: 'faqs-form',
            behaviors: { flattenResponse: true, avoidFocusOnLoad: true },
            groups: [
                getFaqsFormGroup(data),
            ],
        }

        return {
            type: 'form',
            data: form,
        };
    }


    export function getFaqsFormGroup(data: FaqDetails = null): SmzFormGroup
    {
        const question = data != null ? data.question : null;
        const answer = data != null ? data.answer : null;

        const questionInput: SmzTextControl = {
            propertyName: 'question', name: 'Escreva a pergunta', type: SmzControlType.TEXT,
            defaultValue: question,
            template: { large: { row: 'col-12' } },
            validatorsPreset: { isRequired: true, minLength: 5 },
            isDisabled: false,
            advancedSettings: {
                validationMessages: [
                    { type: 'minlength', message: `Precisa ter ao menos 5 caracteres.` },
                ]
            }
        };

        const answerInput: SmzTextAreaControl = {
            propertyName: 'answer', name: 'Resposta...', type: SmzControlType.TEXT_AREA,
            defaultValue: answer,
            template: { large: { row: 'col-12' } },
            validatorsPreset: { isRequired: true, minLength: 5 },
            isDisabled: false,
            textAreaRows: 10,
            advancedSettings: {
                validationMessages: [
                    { type: 'minlength', message: `Precisa ter ao menos 5 caracteres.` },
                ]
            }
        };


        return {
            name: '', showName: false,
            children: [questionInput, answerInput],
        };
    }

}




