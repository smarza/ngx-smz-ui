import { Store } from '@ngxs/store';
import { SmzDialogsService } from '../../../../smz-dialogs/services/smz-dialogs.service';
import { SmzDialogBuilder } from '../../../../../builders/smz-dialogs/dialog-builder';
import { GlobalInjector } from '../../../../../common/services/global-injector';
import { UserDetails } from '../../../models/user-details';
import { SmzHelpDialogService } from '../../../../smz-dialogs/services/help-dialog.service';
import { RemoveClaimsOverride } from '../../../models/remove-claims-override';
import { UserClaimsComponent } from '../components/user-claims/user-claims.component';
import { UsersActions } from '../../../state/users/users.actions';
import { ClaimOverride } from '../../../models/claim-override';

export function showUpdateUserClaimsDialog(user: UserDetails): void {

  const store: Store = GlobalInjector.instance.get(Store);
  const dialogs = GlobalInjector.instance.get(SmzDialogsService);
  const helpService = GlobalInjector.instance.get(SmzHelpDialogService);

  dialogs.open(new SmzDialogBuilder<void>()
    .setTitle('Edição de Permissões de Acesso')
    .setLayout('EXTRA_LARGE', 'col-8')
    .setLayout('MEDIUM', 'col-10')
    .setLayout('EXTRA_SMALL', 'col-12')
    .component(UserClaimsComponent)
      .addInput('username', user.username)
      .addOutput('desassociateClaim', (claims: ClaimOverride[]): void => {
        const data: RemoveClaimsOverride = { username: user.username, claimIds: claims.map(x => x.claim.id) };
        store.dispatch(new UsersActions.RemoveClaimsOverride(data));
      })
    .dialog
    .buttons()
      .topbar()
        .setIcon('fa-solid fa-question')
        .setCallback(() => helpService.showHelpByName('user-claims'))
        .setTooltip('Ajuda')
        .buttons
      .confirm()
        .hide()
        .buttons
      .cancel('FECHAR')
        .buttons
      .close()
        .buttons
    .dialog
  .build()
  );

}