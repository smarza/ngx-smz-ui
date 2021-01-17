import { FaqDetails } from '../models/faqs';
import { FaqsForms } from './faqs.forms';
import { FormGroupDialogResponse, IDialogData, FormGroupInputData, IDialogActionButton } from 'ngx-smz';


export namespace FaqsDialogs
{

    export function getDialog(data: FaqDetails, callback: (data: FormGroupDialogResponse) => void): Partial<IDialogData>
    {

        const inputs: FormGroupInputData[] = [];

        inputs.push(...FaqsForms.getInputs(data));

        return {
            title: 'Editar Pergunta & Resposta',
            buttons: [getCancel(), getConfirm(callback)],
            maximizable: true,
            style: { width: '30%' },
            componentConfig: {
                inputs,
                components: [],
            }
        };

    }

    export function getCancel(): IDialogActionButton
    {
        return {
            validationRequired: false, closeDialogAfterClicked: true, icon: '', iconPos: '', label: 'CANCELAR', style: 'secondary', styleClass: '', visible: true,
            onClick: (response: FormGroupDialogResponse) => { },
        };
    }

    export function getConfirm(callback: (response: FormGroupDialogResponse) => void): IDialogActionButton
    {
        return {
            validationRequired: true, closeDialogAfterClicked: true, icon: '', iconPos: '', label: 'CONFIRMAR', style: 'primary', styleClass: '', visible: true,
            onClick: (response: FormGroupDialogResponse) => callback(response),
        };
    }

}
