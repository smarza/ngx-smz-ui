import { SimpleNamedEntity } from 'ngx-smz-dialogs';

export interface DemoItem {
  id: string;
  name: string;
  company: string;
  country: SimpleNamedEntity;
}

export interface DemoUpdateData {
  id: string;
  name: string;
  company: string;
  countryId: string;
}

export interface DemoCreationData {
  name: string;
  company: string;
  countryId: string;

}