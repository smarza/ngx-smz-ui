import { Store } from '@ngxs/store';
import { SmzDialogBuilder } from '../../../../../builders/smz-dialogs/dialog-builder';
import { nameof } from '../../../../../common/models/simple-named-entity';
import { TenantDetails } from '../../../models/tenant-details';
import { UpdateTenant } from '../../../models/update-tenant';
import { TenantsActions } from '../../../state/tenants/tenants.actions';
import { GlobalInjector } from '../../../../../common/services/global-injector';
import { SmzDialogsService } from '../../../../smz-dialogs/services/smz-dialogs.service';

export function showUpdateTenantDialog(tenant: TenantDetails): void {

  const store = GlobalInjector.instance.get(Store);
  const dialogs = GlobalInjector.instance.get(SmzDialogsService);

  const displayName = GlobalInjector.config.locale.authorization.tenant.displayName;

  dialogs.open(new SmzDialogBuilder<UpdateTenant>()
    .setTitle(`Renomear ${displayName}`)
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
          .validators().required().input
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
    .build()
  );
}