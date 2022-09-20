import { Store } from '@ngxs/store';
import { GlobalInjector } from '../../../../rbk-utils/misc/global.injector';
import { SmzDialog } from '../../../../smz-dialogs/models/smz-dialogs';
import { SmzDialogBuilder } from '../../../../../builders/smz-dialogs/dialog-builder';
import { nameof } from '../../../../../common/models/simple-named-entity';
import { CreateRole } from '../../../models/create-role';
import { SmzTextPattern } from '../../../../smz-forms/models/text-patterns';
import { RolesActions } from '../../../state/roles/roles.actions';

export function CreateRoleDialog(): SmzDialog<CreateRole> {

  const store = GlobalInjector.instance.get(Store);

  return new SmzDialogBuilder<CreateRole>()
    .setTitle('Criar Regra de Acesso')
    .setLayout('LARGE', 'col-4')
    .setLayout('MEDIUM', 'col-6')
    .setLayout('SMALL', 'col-12')
    .confirmOnEnter()
    .closeOnEscape()
    .form()
      .group()
        .text(nameof<CreateRole>('name'), 'Chave')
        .setSaveFormat(SmzTextPattern.CAPITALIZE_FIRST_LETTERS_FOR_WORDS_WITH_MORE_THAN_3_CHARS)
          .validators().required()
          .group
        .form
      .dialog
    .buttons()
      .confirm()
        .callback((x) => { store.dispatch(new RolesActions.Create(x)); })
        .buttons
      .ok()
        .hide()
        .buttons
      .dialog
    .build();
}