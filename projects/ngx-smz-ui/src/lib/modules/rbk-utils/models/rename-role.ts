import { AuthenticatedUser } from './authenticated-user';

export interface RenameRole {
  id: string;
  name: string;
  identity: AuthenticatedUser;
  isAuthenticated: boolean;
}
