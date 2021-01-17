import { FaqDetails } from '../models/faqs';
import { FaqsForms } from './faqs.forms';


export namespace FaqsDialogs
{

    export function getDialog(data: FaqDetails, callback: (data: any) => void): Partial<any>
    {

        const inputs: any[] = [];

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

    export function getCancel(): any
    {
        return {
            validationRequired: false, closeDialogAfterClicked: true, icon: '', iconPos: '', label: 'CANCELAR', style: 'secondary', styleClass: '', visible: true,
            onClick: (response: any) => { },
        };
    }

    export function getConfirm(callback: (response: any) => void): any
    {
        return {
            validationRequired: true, closeDialogAfterClicked: true, icon: '', iconPos: '', label: 'CONFIRMAR', style: 'primary', styleClass: '', visible: true,
            onClick: (response: any) => callback(response),
        };
    }

}
