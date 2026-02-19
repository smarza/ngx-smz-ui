import { SimpleNamedEntity } from '@ngx-smz/core';

export interface AnnualPlanningHistory {
  creationDate: Date;
  description: string;
  username: string;
  planning: SimpleNamedEntity;
  id: string;
}
