import { ClaimAccessType } from './claim-access-type';

export interface AddClaimsOverride {
  username: string;
  claimIds: string[];
  accessType: ClaimAccessType;
}
