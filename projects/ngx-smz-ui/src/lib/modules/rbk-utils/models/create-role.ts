import { AuthenticatedUser } from './authenticated-user';

export interface CreateRole {
  name: string;
  identity: AuthenticatedUser;
  isAuthenticated: boolean;
}
