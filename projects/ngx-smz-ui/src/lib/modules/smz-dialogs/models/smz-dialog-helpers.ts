import { SmzForm } from '../../smz-forms/models/smz-forms';
import { SmzDialog } from './smz-dialogs';

export function getFormInputFromDialog<TInputControl>(inputIdentifier: string, dialog: SmzDialog<any>): TInputControl {

  let result: TInputControl | null = null;

  dialog.features.forEach(feature => {
    if (feature.type === 'form') {
      const form = feature.data as SmzForm<any>;

      form.groups.forEach(group => {
        const match = group.children.find(x => x.propertyName === inputIdentifier);

        if (match != null) {
          result = match as TInputControl;
        }
      })
    }
  });

  return result;

}