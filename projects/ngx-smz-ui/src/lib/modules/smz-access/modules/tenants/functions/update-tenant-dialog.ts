import { Store } from '@ngxs/store';
import { SmzDialog } from '../../../../smz-dialogs/models/smz-dialogs';
import { SmzDialogBuilder } from '../../../../../builders/smz-dialogs/dialog-builder';
import { nameof } from '../../../../../common/models/simple-named-entity';
import { TenantDetails } from '../../../models/tenant-details';
import { UpdateTenant } from '../../../models/update-tenant';
import { TenantsActions } from '../../../state/tenants/tenants.actions';
import { GlobalInjector } from '../../../../../common/services/global-injector';

export function UpdateTenantDialog(tenant: TenantDetails): SmzDialog<UpdateTenant> {

  const store = GlobalInjector.instance.get(Store);

  return new SmzDialogBuilder<UpdateTenant>()
    .setTitle('Criar Permissão de Acesso')
    .setLayout('LARGE', 'col-4')
    .setLayout('MEDIUM', 'col-6')
    .setLayout('SMALL', 'col-12')
    .confirmOnEnter()
    .closeOnEscape()
    .form()
      .group()
        .text(nameof<UpdateTenant>('alias'), '')
          .hide()
          .group
        .text(nameof<UpdateTenant>('name'), 'Nome')
          .validators().required()
          .group
        .form
      .applyData(tenant)
      .dialog
    .buttons()
      .confirm()
        .callback((x) => { store.dispatch(new TenantsActions.Update(x)); })
        .buttons
      .ok()
        .hide()
        .buttons
      .dialog
    .build();
}