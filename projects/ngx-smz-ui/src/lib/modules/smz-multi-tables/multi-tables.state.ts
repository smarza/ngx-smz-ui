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
  // TODO: PrimeNg v19 changed the way to handle the selected tab
  // The selected tab is now handled by a signal
  selected: boolean;
  // TODO: Closeable tab is not supported in PrimeNG v19
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