import { SimpleNamedEntity } from '../../../common/models/simple-named-entity';

export interface RolesDetails {
  name: string;
  claims: SimpleNamedEntity[];
  isApplicationWide: boolean;
  id: string;
}