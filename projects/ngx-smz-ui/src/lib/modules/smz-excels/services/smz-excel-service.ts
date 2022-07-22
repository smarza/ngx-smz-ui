import { Injectable } from '@angular/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { SmzCreateExcelTable } from '../models/smz-excel-table';
import { take } from 'rxjs/operators';
import { ExcelsUiActions } from '../../../state/ui/excels/excels.actions';
import { SmzExcelMockData } from '../models/smz-excel-mock';

@Injectable({providedIn: 'root'})
export class SmzExcelService {
  constructor(private store: Store, private actions$: Actions) { }

  public generate(data: SmzCreateExcelTable): void {


    this.actions$
      .pipe(ofActionSuccessful(ExcelsUiActions.GenerateTableSuccess), take(1))
      .subscribe((event) => {
      console.log('success', event)
    });

    this.store.dispatch(new ExcelsUiActions.GenerateTable(data));
  }

  public mock(): void {
    console.log('mock');

    this.actions$
      .pipe(ofActionSuccessful(ExcelsUiActions.GenerateTableSuccess), take(1))
      .subscribe((event) => {
      console.log('success', event)
    });

    this.store.dispatch(new ExcelsUiActions.GenerateTable(SmzExcelMockData));
  }

}