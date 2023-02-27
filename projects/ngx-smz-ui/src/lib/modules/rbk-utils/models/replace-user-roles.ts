import { AuthenticatedUser } from './authenticated-user';

export interface ReplaceUserRoles {
  username: string;
  roleIds: string[];
  identity: AuthenticatedUser;
  isAuthenticated: boolean;
}
