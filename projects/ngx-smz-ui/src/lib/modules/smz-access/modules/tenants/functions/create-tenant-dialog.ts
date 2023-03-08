import { Store } from '@ngxs/store';
import { SmzDialogBuilder } from '../../../../../builders/smz-dialogs/dialog-builder';
import { nameof } from '../../../../../common/models/simple-named-entity';
import { CreateTenant } from '../../../models/create-tenant';
import { SmzTextPattern } from '../../../../smz-forms/models/text-patterns';
import { TenantsActions } from '../../../state/tenants/tenants.actions';
import { GlobalInjector } from '../../../../../common/services/global-injector';
import { SmzDialogsService } from '../../../../smz-dialogs/services/smz-dialogs.service';

export function showCreateTenantDialog(): void {

  const displayName = GlobalInjector.config.locale.authorization.tenant.displayName;

  const store = GlobalInjector.instance.get(Store);
  const dialogs = GlobalInjector.instance.get(SmzDialogsService);

  dialogs.open(new SmzDialogBuilder<CreateTenant>()
    .setTitle(`Criar ${displayName}`)
    .setLayout('LARGE', 'col-4')
    .setLayout('MEDIUM', 'col-6')
    .setLayout('SMALL', 'col-12')
    .confirmOnEnter()
    .closeOnEscape()
    .form()
      .group()
        .text(nameof<CreateTenant>('alias'), 'Identificador')
        .setSaveFormat(SmzTextPattern.CLAIM_PATTERN)
          .validators().required()
          .group
        .text(nameof<CreateTenant>('name'), 'Nome')
          .validators().required()
          .group
        .form
      .dialog
    .buttons()
      .confirm()
        .callback((x) => { store.dispatch(new TenantsActions.Create(x)); })
        .buttons
      .ok()
        .hide()
        .buttons
      .dialog
    .build()
  );
}