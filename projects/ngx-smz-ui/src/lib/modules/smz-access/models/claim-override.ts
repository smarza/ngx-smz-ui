import { SimpleNamedEntity } from '../../../common/models/simple-named-entity';

export interface ClaimOverride {
  claim: SimpleNamedEntity;
  name: string;
  access: { id: number, name: string };
}
