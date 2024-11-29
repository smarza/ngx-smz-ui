import { EventEmitter } from '@angular/core';
import { SmzFormsResponse } from '../smz-forms/models/smz-forms';

export interface SmzSubmitState {
  statusChanges: EventEmitter<SmzFormsResponse<any>>;
  undoChanges: () => void;
}