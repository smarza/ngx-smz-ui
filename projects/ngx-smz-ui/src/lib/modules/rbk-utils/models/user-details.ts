import { SimpleNamedEntity } from '../../../common/models/simple-named-entity';

export interface UserDetails {
  username: string;
  email: string;
  displayName: string;
  lastLogin?: Date;
  metadata: string;
  isConfirmed: boolean;
  roles: SimpleNamedEntity[];
  id: string;
}