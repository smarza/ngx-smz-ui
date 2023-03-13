import { SimpleNamedEntity } from '../../../common/models/simple-named-entity';
import { ClaimOverride } from './claim-override';

export interface UserDetails {
  username: string;
  email: string;
  displayName: string;
  lastLogin?: Date;
  metadata: string;
  isConfirmed: boolean;
  claims: SimpleNamedEntity[];
  roles: SimpleNamedEntity[];
  overridedClaims: ClaimOverride[];
  id: string;
  avatar: string;
}