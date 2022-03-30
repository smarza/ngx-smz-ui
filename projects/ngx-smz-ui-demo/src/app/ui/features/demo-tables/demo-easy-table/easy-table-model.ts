import { SimpleNamedEntity } from 'ngx-smz-ui';
export interface EasyTableDemoData {
  id: string;
  number: number;
  details: string;
  status: { id: string, name: string, background: string };
  country: SimpleNamedEntity;
  date: Date;
  total: number;
}