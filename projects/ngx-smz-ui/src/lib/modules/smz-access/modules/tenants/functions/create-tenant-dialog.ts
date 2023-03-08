import { Store } from '@ngxs/store';
import { SmzDialogBuilder } from '../../../../../builders/smz-dialogs/dialog-builder';
import { nameof, namesof } from '../../../../../common/models/simple-named-entity';
import { CreateTenant } from '../../../models/create-tenant';
import { SmzTextPattern } from '../../../../smz-forms/models/text-patterns';
import { TenantsActions } from '../../../state/tenants/tenants.actions';
import { GlobalInjector } from '../../../../../common/services/global-injector';
import { SmzDialogsService } from '../../../../smz-dialogs/services/smz-dialogs.service';
import { CreateTenantAdminUser } from '../../../models/create-tenant-admin-user';

export function showCreateTenantDialog(): void {

  const displayName = GlobalInjector.config.locale.authorization.tenant.displayName;

  const store = GlobalInjector.instance.get(Store);
  const dialogs = GlobalInjector.instance.get(SmzDialogsService);

  dialogs.open(new SmzDialogBuilder<CreateTenant>()
    .setTitle(`Criar ${displayName}`)
    .setLayout('EXTRA_SMALL', 'col-12')
    .setLayout('SMALL', 'col-12')
    .setLayout('MEDIUM', 'col-12')
    .setLayout('LARGE', 'col-8')
    .setLayout('EXTRA_LARGE', 'col-6')
    .form()
      .group(`${displayName}`)
        .text(nameof<CreateTenant>('alias'), 'Identificador')
          .setLayout('EXTRA_SMALL', 'col-12')
          .setLayout('SMALL', 'col-12')
          .setLayout('MEDIUM', 'col-12')
          .setLayout('LARGE', 'col-6')
          .setLayout('EXTRA_LARGE', 'col-6')
          .setSaveFormat(SmzTextPattern.CLAIM_PATTERN)
          .validators().required()
          .group
        .text(nameof<CreateTenant>('name'), 'Nome')
          .setLayout('EXTRA_SMALL', 'col-12')
          .setLayout('SMALL', 'col-12')
          .setLayout('MEDIUM', 'col-12')
          .setLayout('LARGE', 'col-6')
          .setLayout('EXTRA_LARGE', 'col-6')
          .validators().required()
          .group
        .textArea(nameof<CreateTenant>('metadata'), 'Metadado')
          .setRows(3)
          .group
        .form
      .group('Usuário Admin')
        .text(namesof<CreateTenant, CreateTenantAdminUser>('adminInfo', 'username'), 'Usuário')
          .setLayout('EXTRA_SMALL', 'col-12')
          .setLayout('SMALL', 'col-12')
          .setLayout('MEDIUM', 'col-12')
          .setLayout('LARGE', 'col-6')
          .setLayout('EXTRA_LARGE', 'col-4')
          .validators().required()
          .group
        .text(namesof<CreateTenant, CreateTenantAdminUser>('adminInfo', 'displayName'), 'Nome')
          .setLayout('EXTRA_SMALL', 'col-12')
          .setLayout('SMALL', 'col-12')
          .setLayout('MEDIUM', 'col-12')
          .setLayout('LARGE', 'col-6')
          .setLayout('EXTRA_LARGE', 'col-4')
          .validators().required()
          .group
        .text(namesof<CreateTenant, CreateTenantAdminUser>('adminInfo', 'email'), 'Email')
          .setLayout('EXTRA_SMALL', 'col-12')
          .setLayout('SMALL', 'col-12')
          .setLayout('MEDIUM', 'col-12')
          .setLayout('LARGE', 'col-6')
          .setLayout('EXTRA_LARGE', 'col-4')
          .validators().email().required()
          .group
        .password(namesof<CreateTenant, CreateTenantAdminUser>('adminInfo', 'password'), 'Senha')
          .setLayout('EXTRA_SMALL', 'col-12')
          .setLayout('SMALL', 'col-12')
          .setLayout('MEDIUM', 'col-12')
          .setLayout('LARGE', 'col-6')
          .setLayout('EXTRA_LARGE', 'col-6')
          .validators().required()
          .group
        .addPasswordConfirmation(namesof<CreateTenant, CreateTenantAdminUser>('adminInfo', 'password'), 'Confirmação')
          .setLayout('EXTRA_SMALL', 'col-12')
          .setLayout('SMALL', 'col-12')
          .setLayout('MEDIUM', 'col-12')
          .setLayout('LARGE', 'col-6')
          .setLayout('EXTRA_LARGE', 'col-6')
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