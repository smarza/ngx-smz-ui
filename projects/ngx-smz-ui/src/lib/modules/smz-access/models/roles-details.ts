import { SimpleNamedEntity } from '../../../common/models/simple-named-entity';

export interface RolesDetails {
  name: string;
  claims: SimpleNamedEntity[];
  id: string;
}
