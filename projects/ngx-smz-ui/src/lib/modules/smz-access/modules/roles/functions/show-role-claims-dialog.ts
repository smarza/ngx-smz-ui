import { SmzDialogBuilder } from '../../../../../builders/smz-dialogs/dialog-builder';
import { CreateRole } from '../../../models/create-role';
import { GlobalInjector } from '../../../../../common/services/global-injector';
import { RolesDetails } from '../../../models/roles-details';
import { SmzDialogsService } from '../../../../smz-dialogs/services/smz-dialogs.service';

export function showRoleClaimsDialog(role: RolesDetails): void {

  const dialogs = GlobalInjector.instance.get(SmzDialogsService);

  const claims = role.claims.map(x => (`<li>${x.name}</li>`));
  const html = `
  <div class="py-3 px-6">
    <ul class="list-disc">
      ${claims.join('')}
    </ul>
  </div>
  `;

  dialogs.open(new SmzDialogBuilder<CreateRole>()
    .setTitle('Permissões')
    .setLayout('LARGE', 'col-4')
    .setLayout('MEDIUM', 'col-6')
    .setLayout('SMALL', 'col-12')
    .confirmOnEnter()
    .closeOnEscape()
    .message(html)
    .buttons()
      .confirm().hide().buttons
      .ok().hide().buttons
      .dialog
    .build()
  );
}