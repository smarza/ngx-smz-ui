import { Store } from '@ngxs/store';
import { GlobalInjector } from '../../../../rbk-utils/misc/global.injector';
import { SmzDialog } from '../../../../smz-dialogs/models/smz-dialogs';
import { SmzDialogBuilder } from '../../../../../builders/smz-dialogs/dialog-builder';
import { nameof } from '../../../../../common/models/simple-named-entity';
import { RolesDetails } from '../../../models/roles-details';
import { UpdateRoleClaims } from '../../../models/update-role-claims';
import { ClaimsSelectors } from '../../../state/claims/claims.selectors';
import { RolesActions } from '../../../state/roles/roles.actions';

export function UpdateRoleClaimsDialog(role: RolesDetails): SmzDialog<UpdateRoleClaims> {

  const store = GlobalInjector.instance.get(Store);
  const claims = store.selectSnapshot(ClaimsSelectors.all).map(x => ({ id: x.id, name: x.description }));

  return new SmzDialogBuilder<UpdateRoleClaims>()
    .setTitle('Editar permissões de acesso do Usuário')
    .setLayout('LARGE', 'col-4')
    .setLayout('MEDIUM', 'col-6')
    .setLayout('SMALL', 'col-12')
    .confirmOnEnter()
    .closeOnEscape()
    .form()
      .group()
        .text(nameof<RolesDetails>('id'), '')
          .hide()
          .group
        .text(nameof<RolesDetails>('name'), 'Regra de Acesso')
          .disable()
          .excludeFromResponse()
          .group
        .multiselect('claims', 'Permissões de Acesso', claims, role.claims.map(x => x.id))
          .validators().required()
          .group
        .form
      .applyData(role)
      .dialog
    .buttons()
      .confirm()
        .callback((x) => { store.dispatch(new RolesActions.UpdateClaims(x)); })
        .buttons
      .ok()
        .hide()
        .buttons
      .dialog
    .build();
}