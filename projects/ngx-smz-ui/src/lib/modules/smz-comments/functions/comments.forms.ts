import { TreeNode } from 'primeng/api';
import { SmzControlType, SmzTextAreaControl } from '../../smz-forms/models/control-types';
import { SmzForm, SmzFormGroup } from '../../smz-forms/models/smz-forms';
import { SmzCommentsDetails } from '../models/comments-details';


export namespace CommentsForms
{
  export function getCommentForm(focus = false, comment: TreeNode<SmzCommentsDetails> = null): SmzForm<any>
  {

    const form: SmzForm<any> = {
      formId: 'comment-form',
      behaviors: { flattenResponse: true, avoidFocusOnLoad: !focus },
      groups: [
        getCommentInput(comment),
      ],
    }

    return form;

  }


  export function getCommentInput(comment: TreeNode<SmzCommentsDetails> = null): SmzFormGroup
  {
    const label = comment != null ? comment.label : null;

    const commentInput: SmzTextAreaControl = {
      propertyName: 'comment', name: 'Escreva seu comentário', type: SmzControlType.TEXT_AREA,
      defaultValue: label,
      template: { large: { row: 'col-12' } },
      validatorsPreset: { isRequired: true, minLength: 2 },
      isDisabled: false, textAreaRows: 7,
      advancedSettings: {
        validationMessages: [
          { type: 'minlength', message: `O campo deve conter pelo menos 2 caracteres` },
        ]
      }
    };

    return {
      name: '', showName: false,
      children: [commentInput],
    };
  }

}




