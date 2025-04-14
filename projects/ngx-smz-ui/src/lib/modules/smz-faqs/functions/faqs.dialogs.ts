import { SmzDialog } from '../../smz-dialogs/models/smz-dialogs';
import { SmzPresets } from '../../smz-dialogs/models/smz-presets';
import { FaqDetails } from '../models/faqs';
import { FaqsForms } from './faqs.forms';

export namespace FaqsDialogs
{
    export function getDialog(data: FaqDetails, callback: (data: any) => void): SmzDialog<never>
    {

        return {
            presetId: SmzPresets.SimpleCrud,
            title: 'Editar Pergunta & Resposta',
            features: [FaqsForms.getFormFeature(data)],
            callbacks: {
              onConfirm: (data) =>
              {
                callback(data);
              }
            }
          };

    }

}
