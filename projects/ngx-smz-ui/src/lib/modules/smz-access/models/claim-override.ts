import { SimpleEntity, SimpleNamedEntity } from '../../../common/models/simple-named-entity';
import { ClaimAccessType } from './claim-access-type';

export interface ClaimOverride {
  claim: SimpleNamedEntity;
  name: string;
  accessType: SimpleEntity<ClaimAccessType>;
}
