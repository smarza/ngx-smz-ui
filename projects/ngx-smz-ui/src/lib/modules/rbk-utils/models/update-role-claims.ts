import { AuthenticatedUser } from './authenticated-user';

export interface UpdateRoleClaims {
  id: string;
  claimsIds: string[];
  identity: AuthenticatedUser;
  isAuthenticated: boolean;
}
