import { SimpleNamedEntity } from 'ngx-smz-ui';

export interface ClaimOverride {
  claim: SimpleNamedEntity;
  access: { id: number, name: string };
}
