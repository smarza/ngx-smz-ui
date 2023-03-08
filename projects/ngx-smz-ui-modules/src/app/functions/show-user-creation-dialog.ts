import { Store } from '@ngxs/store';
import { GlobalInjector } from 'ngx-smz-ui';
import { showCreateUserWithMultipleRoleDialog } from './create-user-with-multiple-role-dialog';
import { showCreateUserWithSingleRoleDialog } from './create-user-with-single-role-dialog';

export function showUserCreationDialog(): void {

  if (GlobalInjector.config.rbkUtils.authorization.allowMultipleRolesPerUser) {
    showCreateUserWithMultipleRoleDialog();
  }
  else {
    showCreateUserWithSingleRoleDialog();
  }

}

