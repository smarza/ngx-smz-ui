import { Validators } from '@angular/forms';
import { FaqDetails } from '../models/faqs';
import { FormGroupConfig, FormGroupInputData } from 'ngx-smz'

export namespace FaqsForms
{
    export function getForm(data: FaqDetails = null): FormGroupConfig
    {
        const inputs: FormGroupInputData[] = [];

        inputs.push(...getInputs(data));

        return {
            components: [],
            inputs,
            avoidFocusOnLoad: true
        };
    }
    export function getInputs(data: FaqDetails = null): FormGroupInputData[]
    {
        const response: FormGroupInputData[] = [];

        const question = data != null ? data.question : null;
        const answer = data != null ? data.answer : null;

        response.push({
            type: 'text', placeholder: 'Escreva a pergunta', name: 'question', defaultValue: question,
            validators: Validators.compose([Validators.required, Validators.minLength(5)]), validationMessages: [{ type: 'required', message: 'Campo obrigatório.' }, { type: 'minLength', message: 'Precisa ter ao menos 5 caracteres.'}],
        });

        response.push({
            type: 'text-area', placeholder: 'Resposta...', name: 'answer', defaultValue: answer, textAreaRows: 10,
            validators: Validators.compose([Validators.required, Validators.minLength(5)]), validationMessages: [{ type: 'required', message: 'Campo obrigatório.' }, { type: 'minLength', message: 'Precisa ter ao menos 5 caracteres.'}],
        });

        return response;
    }
}




