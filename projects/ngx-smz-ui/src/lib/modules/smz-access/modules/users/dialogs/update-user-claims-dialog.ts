// import { Store } from '@ngxs/store';
// import { RemoveClaimsFromUser } from '../../../auto-generated/models/remove-claims-from-user';
// import { UserDTODetails } from '../../../auto-generated/models/user-dtodetails';
// import { SmzDialogBuilder } from '../../../builders/smz-dialogs/dialog-builder';
// import { SimpleNamedEntity } from '../../../common/models/simple-named-entity';
// import { UsersDbActions } from '../../../state/database/users/users.actions';
// import { GlobalInjector } from '../../rbk-utils/misc/global.injector';
// import { SmzDialog } from '../../smz-dialogs/models/smz-dialogs';
// import { SmzHelpDialogService } from '../../smz-dialogs/services/help-dialog.service';
// import { UserClaimsComponent } from '../components/user-claims/user-claims.component';

// export function buildUpdateUserClaimsDialog(user: UserDTODetails, helpService: SmzHelpDialogService): SmzDialog<void> {

//   const store: Store = GlobalInjector.instance.get(Store);

//   return new SmzDialogBuilder<void>()
//     .setTitle(`Edição de Permissões | ${user.username}`)
//     .setLayout('EXTRA_LARGE', 'col-8')
//     .setLayout('MEDIUM', 'col-10')
//     .setLayout('EXTRA_SMALL', 'col-12')
//     .component(UserClaimsComponent)
//       .addInput('userId', user.id)
//       .addOutput('desassociateClaim', (claims: SimpleNamedEntity[]): void => {
//         const data: RemoveClaimsFromUser = { id: user.id, claimIds: claims.map(x => x.id) };
//         store.dispatch(new UsersDbActions.DesassociateClaim(data));
//       })
//     .dialog
//     .buttons()
//       .topbar()
//         .setIcon('fa-solid fa-question')
//         .setCallback(() => helpService.showHelpByName('user-claims'))
//         .setTooltip('Ajuda')
//         .buttons
//       .confirm()
//         .hide()
//         .buttons
//       .cancel('FECHAR')
//         .buttons
//       .close()
//         .buttons
//     .dialog
//   .build();

// }