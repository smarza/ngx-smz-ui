import { Store } from '@ngxs/store';
import { GlobalInjector } from '../../../../rbk-utils/misc/global.injector';
import { SmzDialog } from '../../../../smz-dialogs/models/smz-dialogs';
import { SmzDialogBuilder } from '../../../../../builders/smz-dialogs/dialog-builder';
import { nameof } from '../../../../../common/models/simple-named-entity';
import { ClaimDetails } from '../../../models/claim-details';
import { UpdateClaim } from '../../../models/update-claim';
import { ClaimsActions } from '../../../state/claims/claims.actions';

export function UpdateClaimDialog(claim: ClaimDetails): SmzDialog<UpdateClaim> {

  const store = GlobalInjector.instance.get(Store);

  return new SmzDialogBuilder<UpdateClaim>()
    .setTitle('Criar Acesso')
    .setLayout('LARGE', 'col-4')
    .setLayout('MEDIUM', 'col-6')
    .setLayout('SMALL', 'col-12')
    .confirmOnEnter()
    .closeOnEscape()
    .form()
      .group()
        .text(nameof<UpdateClaim>('id'), '')
          .hide()
          .group
        .text(nameof<UpdateClaim>('description'), 'Descrição')
          .validators().required()
          .group
        .form
      .applyData(claim)
      .dialog
    .buttons()
      .confirm()
        .callback((x) => { store.dispatch(new ClaimsActions.Update(x)); })
        .buttons
      .ok()
        .hide()
        .buttons
      .dialog
    .build();
}