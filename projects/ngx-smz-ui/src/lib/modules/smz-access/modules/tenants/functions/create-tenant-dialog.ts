import { Store } from '@ngxs/store';
import { SmzDialog } from '../../../../smz-dialogs/models/smz-dialogs';
import { SmzDialogBuilder } from '../../../../../builders/smz-dialogs/dialog-builder';
import { nameof } from '../../../../../common/models/simple-named-entity';
import { CreateTenant } from '../../../models/create-tenant';
import { SmzTextPattern } from '../../../../smz-forms/models/text-patterns';
import { TenantsActions } from '../../../state/tenants/tenants.actions';
import { GlobalInjector } from '../../../../../common/services/global-injector';

export function CreateTenantDialog(): SmzDialog<CreateTenant> {

  const store = GlobalInjector.instance.get(Store);

  return new SmzDialogBuilder<CreateTenant>()
    .setTitle('Criar Permissão de Acesso')
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
    .build();
}