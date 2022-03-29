import { SimpleNamedEntity } from 'ngx-smz-ui';
export interface EasyTableDemoData {
  id: string;
  number: number;
  details: string;
  status: SimpleNamedEntity;
  country: SimpleNamedEntity;
  date: Date;
  total: number;
}