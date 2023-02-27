import { SimpleNamedEntity } from '../../../common/models/simple-named-entity';

export interface ClaimOverride {
  claim: SimpleNamedEntity;
  identification: string;
  access: { id: number, name: string };
  isProtected: boolean;
}