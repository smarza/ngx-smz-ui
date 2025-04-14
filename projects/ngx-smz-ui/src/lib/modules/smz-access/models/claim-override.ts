import { SimpleNamedEntity } from '../../../common/models/simple-named-entity';

export interface ClaimOverride {
  claim: SimpleNamedEntity;
  access: { id: number, name: string };
}