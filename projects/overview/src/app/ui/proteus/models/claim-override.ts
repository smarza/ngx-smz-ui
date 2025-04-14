import { SimpleNamedEntity } from '@ngx-smz/core';

export interface ClaimOverride {
  claim: SimpleNamedEntity;
  access: { id: number, name: string };
}
