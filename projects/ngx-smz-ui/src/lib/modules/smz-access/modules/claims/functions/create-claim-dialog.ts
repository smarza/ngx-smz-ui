import { Store } from '@ngxs/store';
import { SmzDialog } from '../../../../smz-dialogs/models/smz-dialogs';
import { SmzDialogBuilder } from '../../../../../builders/smz-dialogs/dialog-builder';
import { nameof } from '../../../../../common/models/simple-named-entity';
import { CreateClaim } from '../../../models/create-claim';
import { SmzTextPattern } from '../../../../smz-forms/models/text-patterns';
import { ClaimsActions } from '../../../state/claims/claims.actions';
import { GlobalInjector } from '../../../../../common/services/global-injector';

export function CreateClaimDialog(): SmzDialog<CreateClaim> {

  const store = GlobalInjector.instance.get(Store);

  return new SmzDialogBuilder<CreateClaim>()
    .setTitle('Criar Permissão de Acesso')
    .setLayout('LARGE', 'col-4')
    .setLayout('MEDIUM', 'col-6')
    .setLayout('SMALL', 'col-12')
    .confirmOnEnter()
    .closeOnEscape()
    .form()
      .group()
        .text(nameof<CreateClaim>('identification'), 'Identificador')
          .setSaveFormat(SmzTextPattern.CLAIM_PATTERN)
          .validators().required()
          .group
        .text(nameof<CreateClaim>('description'), 'Nome')
          .validators().required()
          .group
        .form
      .dialog
    .buttons()
      .confirm()
        .callback((x) => { store.dispatch(new ClaimsActions.Create(x)); })
        .buttons
      .ok()
        .hide()
        .buttons
      .dialog
    .build();
}