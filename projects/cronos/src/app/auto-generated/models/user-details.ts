import { SimpleNamedEntity } from '@ngx-smz/core';
import { ClaimOverride } from '@models/claim-override';

export interface UserDetails {
  username: string;
  email: string;
  displayName: string;
  isActive: boolean;
  lastLogin?: Date;
  avatar: string;
  isConfirmed: boolean;
  roles: SimpleNamedEntity[];
  overridedClaims: ClaimOverride[];
  claims: SimpleNamedEntity[];
  metadata: { [key: string]: string };
  allowedTenants: string[];
  id: string;
}
