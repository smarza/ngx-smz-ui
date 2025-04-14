import { SimpleNamedEntity } from '../../../common/models/simple-named-entity';
import { ClaimOverride } from './claim-override';

export interface UserDetails {
  allowedTenants: string[];
  avatar: string;
  claims: SimpleNamedEntity[];
  displayName: string;
  email: string;
  id: string;
  isActive: boolean;
  isConfirmed: boolean;
  lastLogin?: Date;
  metadata: { [key: string]: string };
  overridedClaims: ClaimOverride[];
  roles: SimpleNamedEntity[];
  username: string;

}

export interface CustomUserDetails<TMetadata extends { [key: string]: string }> extends UserDetails {
  metadata: TMetadata;
}