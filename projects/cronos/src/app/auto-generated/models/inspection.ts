import { SimpleNamedEntity } from '@ngx-smz/core';

export interface Inspection {
  name: string;
  plant: SimpleNamedEntity;
  year: number;
  id: string;
}
