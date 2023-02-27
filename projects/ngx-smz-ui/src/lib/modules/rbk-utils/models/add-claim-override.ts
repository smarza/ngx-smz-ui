import { ClaimAccessType } from './claim-access-type';
import { AuthenticatedUser } from './authenticated-user';

export interface AddClaimOverride {
  username: string;
  claimId: string;
  accessType: ClaimAccessType;
  identity: AuthenticatedUser;
  isAuthenticated: boolean;
}
