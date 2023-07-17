import { GlobalInjector } from '../../../common/services/global-injector';
import { SmzDialogsService } from '../../smz-dialogs/services/smz-dialogs.service';
import { SmzDialogBuilder } from '../../../builders/smz-dialogs/dialog-builder';
import { NotificationsListComponent } from '../components/list/notifications-list.component';

export function showNotificationsDialog(): void {
  const dialogs = GlobalInjector.instance.get(SmzDialogsService);

  dialogs.open(new SmzDialogBuilder<void>()
    .setTitle('Notificações')
    .setLayout('EXTRA_LARGE', 'col-12')
    .setLayout('LARGE', 'col-12')
    .setLayout('MEDIUM', 'col-12')
    .setLayout('SMALL', 'col-12')
    .setLayout('EXTRA_SMALL', 'col-12')
    .hideFooter()
    .openMaximized()
    .setMinHeight(80)
    .setContainerStyles('px-0 pt-2')
    .component(NotificationsListComponent)
      .dialog
    .build()
  );
}