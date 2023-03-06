import { SimpleNamedEntity } from '../../../common/models/simple-named-entity';

export interface RolesDetails {
  name: string;
  claims: SimpleNamedEntity[];
  source: SimpleNamedEntity; // Global ou Local
  mode: SimpleNamedEntity; // Normal ou Sobscrita
  id: string;
}