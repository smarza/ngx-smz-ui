import { SmzTableState } from '../smz-tables/models/table-state';
import { Observable } from 'rxjs';

export interface SmzMultiTablesState {
  isDebug: boolean;
  styleClass: string;
  tabs: SmzMultiTablesTab[];
}

export interface SmzMultiTablesTab {
  _id: string;
  _originalId: string;
  _isDuplicated: boolean;
  allowDuplication: boolean;
  styleClass: string;
  selected: boolean;
  closable: boolean;
  header: {
    styleClass: string;
    label: {
      name: string;
      styleClass: string;
    }
    icon: {
      isVisible: boolean;
      name: string;
      styleClass: string;
    }
  }
  table: {
    state: SmzTableState;
    items$: Observable<any[]>
  };
}