import { Injectable } from '@angular/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { SmzCreateExcelTable, SmzExcelsDetails } from '../models/smz-excel-table';
import { take } from 'rxjs/operators';
import { ExcelsUiActions } from '../../../state/ui/excels/excels.actions';
import { SmzExcelMockData } from '../models/smz-excel-mock';
import { ExcelsService } from '../../../state/ui/excels/excels.service';

@Injectable({providedIn: 'root'})
export class SmzExcelService {
  constructor(private store: Store, private actions$: Actions, private excelsService: ExcelsService) { }

  public generate(data: SmzCreateExcelTable): void {
    this.store.dispatch(new ExcelsUiActions.GenerateTable(data, true));
  }

  public mock(): void {
    this.store.dispatch(new ExcelsUiActions.GenerateTable(SmzExcelMockData, true));
  }

}