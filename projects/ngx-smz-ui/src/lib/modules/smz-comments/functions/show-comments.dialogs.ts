import { ComponentData } from '../../../common/modules/inject-content/models/injectable.model';
import { SmzDialog } from '../../smz-dialogs/models/smz-dialogs';


export namespace ShowCommentsDialogs
{

    export function showComents(data: { id: string, number: string}): SmzDialog<any>
    {
      const componentData: ComponentData = {
        component: CommentsSectionComponent,
        inputs: [
            { input: 'orderId', data: data.id },
            { input: 'loadOnInit', data: true },
            { input: 'fullWidth', data: true }
        ]
    };

    return {
        title: `Comentários: ${data.number}`,
        domElementId: 'comments-dialog',
        features: [
            { type: 'component', data: componentData }
        ],
        behaviors: {
            showCancelButton: false,
            showCloseButton: true,
            showConfirmButton: false,
            showFooter: false,
            closeOnEscape: true,
            // contentPadding: '2em'
        },
        dialogTemplate: {
            extraLarge: { row: 'col-8' },
            large: { row: 'col-10' },
            medium: { row: 'col-10' },
            small: { row: 'col-12' },
        }
    };
    }

}