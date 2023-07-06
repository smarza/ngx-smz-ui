import { Store } from '@ngxs/store';
import { GlobalInjector } from '../../../../common/services/global-injector';
import { SmzDialogsService } from '../../../smz-dialogs/services/smz-dialogs.service';
import { SmzDialogBuilder } from '../../../../builders/smz-dialogs/dialog-builder';
import { AuthenticationActions } from '../../../../state/global/authentication/authentication.actions';
import { TenantsSelectors } from '../../../smz-access/state/tenants/tenants.selectors';
import { SimpleNamedEntity } from '../../../../common/models/simple-named-entity';

export function showSwitchTenantDialog(): void {
  const store = GlobalInjector.instance.get(Store);
  const dialogs = GlobalInjector.instance.get(SmzDialogsService);
  const config = GlobalInjector.config;

  const currentTenant = store.selectSnapshot(TenantsSelectors.currentTenant);
  const tenantDisplayName = config.locale.authorization.tenant.displayName;

  console.log(store.selectSnapshot(TenantsSelectors.userAllowedTenants));
  console.log(currentTenant)

  const allowedTenants = store
    .selectSnapshot(TenantsSelectors.userAllowedTenants)
    .filter(x => x.alias !== currentTenant?.alias)
    .map(x => ({ id: x.alias, name: x.name }));

  dialogs.open(new SmzDialogBuilder<{ tenant: SimpleNamedEntity }>()
    .setTitle(`Alterar ${tenantDisplayName}`)
    .setLayout('EXTRA_LARGE', 'col-12')
    .setLayout('LARGE', 'col-12')
    .setLayout('MEDIUM', 'col-12')
    .setLayout('SMALL', 'col-12')
    .setLayout('EXTRA_SMALL', 'col-12')
    .form()
      .disableFlattenResponse()
      .group()
        .customizeInputStyles('my-0')

        // TENANT ATUAL
        .text('currentTenant', `${tenantDisplayName} atual`, currentTenant.name)
          .disable()
          .setLayout('EXTRA_LARGE', 'col-12')
          .setLayout('LARGE', 'col-12')
          .setLayout('MEDIUM', 'col-12')
          .setLayout('SMALL', 'col-12')
          .setLayout('EXTRA_SMALL', 'col-12')
          .group

        // SELETOR DE TENANT
        .dropdown('tenant', 'Alterar para', allowedTenants)
          .setLayout('EXTRA_LARGE', 'col-12')
          .setLayout('LARGE', 'col-12')
          .setLayout('MEDIUM', 'col-12')
          .setLayout('SMALL', 'col-12')
          .setLayout('EXTRA_SMALL', 'col-12')
          .validators().required().input
          .group
        .form
      .dialog
    .buttons()
      .confirm()
        .callback((data: { tenant: SimpleNamedEntity }) => store.dispatch(new AuthenticationActions.SwitchTenant({ tenant: data.tenant.name })))
        .buttons
      .ok().hide().buttons
      .dialog
    .build()
  );
}