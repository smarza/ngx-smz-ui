
// import { Store } from '@ngxs/store';
// import { SmzDialogBuilder } from '../../../builders/smz-dialogs/dialog-builder';
// import { getFirst } from '../../../common/utils/utils';
// import { RolesDbSelectors } from '../../../state/database/roles/roles.selectors';
// import { UsersDbActions } from '../../../state/database/users/users.actions';
// import { GlobalInjector } from '../../rbk-utils/misc/global.injector';
// import { SmzDialog } from '../../smz-dialogs/models/smz-dialogs';

// export function buildUpdateUserWithSingleRoleDialog(user: BaseUserDetails, success?: () => void): SmzDialog<UpdateUserWithSingleRole> {

//   const store: Store = GlobalInjector.instance.get(Store);
//   const roles = store.selectSnapshot(RolesDbSelectors.roles);

//   return new SmzDialogBuilder<UpdateUserWithSingleRole>()
//     .setTitle(`Edição de Perfil | ${user.username}`)
//     .setLayout('EXTRA_LARGE', 'col-4')
//     .setLayout('MEDIUM', 'col-6')
//     .setLayout('EXTRA_SMALL', 'col-12')
//     .form()
//       .group()
//         .text('id', '', user.id).hide().group
//         .text('name', 'Nome', user.name)
//           .disable()
//           .group
//         .text('username', 'Usuário', user.username)
//           .disable()
//           .group
//         .text('email', 'Email', user.email)
//           .disable()
//           .group
//         .text('sector', 'Gerência', user.sector)
//           .disable()
//           .group
//         .dropdown('role', 'Perfil', roles, getFirst(user.roles)?.id)
//           .setLayout('EXTRA_SMALL', 'col-12')
//           .validators()
//             .required()
//           .group
//         .form
//       .dialog
//     .buttons()
//       .cancel().buttons
//       .confirm()
//         .callback(data => store
//           .dispatch(new UsersDbActions.Update(data))
//           .subscribe(() => success != null ?? success()))
//         .buttons
//       .dialog
//     .build();

// }