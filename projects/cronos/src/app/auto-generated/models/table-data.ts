import { SimpleNamedEntity } from '@ngx-smz/core';

export interface TableData {
  headers: SimpleNamedEntity[];
  data: { [key: string]: string }[];
}
