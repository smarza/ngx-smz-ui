import { UserDetails, SimpleNamedEntity } from 'ngx-smz-ui';

export interface PetrobrasUserDetails extends UserDetails {
  username: string;
  name: string;
  email: string;
  sector: string;
  identifier: string;
  isContracted: boolean;
  // claims: UserDTOClaim[];
  roles: SimpleNamedEntity[];
  // finalClaims: string[];
  // picture: string;
  id: string;
}
