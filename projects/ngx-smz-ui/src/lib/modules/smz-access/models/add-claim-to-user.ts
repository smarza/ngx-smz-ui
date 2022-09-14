import { ClaimAccessType } from './claim-access-type';

export interface AddClaimToUser {
  username: string;
  claimId: string;
  accessType: ClaimAccessType;
}
