import { AuthenticatedUser } from './authenticated-user';

export interface RemoveClaimOverride {
  username: string;
  claimId: string;
  identity: AuthenticatedUser;
  isAuthenticated: boolean;
}
