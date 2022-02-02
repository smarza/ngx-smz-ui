import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { AuthenticationActions } from '../../../state/global/authentication/authentication.actions';

@Injectable({providedIn: 'root'})
export class TableHelperService {
  public tables: { [key: string]: any[] } = {};
  constructor(private actions$: Actions, private store: Store) {
    this.actions$.pipe(ofActionSuccessful(AuthenticationActions.RemoteLoginSuccess)).subscribe(() => {
      this.tables = {};
    });

    this.actions$.pipe(ofActionSuccessful(AuthenticationActions.LocalLoginSuccess)).subscribe(() => {
      this.tables = {};
    });
  }

  private add(key: string, tree: any[]): void {
    this.tables[key] = tree;
  }

  public clear(key: string): void {
    delete this.tables[key];
  }

  public sincronize(key: string, result: any[]): any[] {

    if (this.tables[key] == null) {
      this.add(key, result.map(x => ({...x, _isExpanded: false, _isNew: false })));
      return this.tables[key];
    }
    else {
      const resultCloned = cloneDeep(result);

      synchronizeTable(resultCloned, this.tables[key]);

      this.tables[key] = resultCloned;

      return this.tables[key];
    }
  }

}

export function synchronizeTable(destination: any[], source: any[]): void {
  for (const tableRow of destination) {
    const geminiRow = source.find(x => x.id === tableRow.id);
    if (geminiRow != null) {
      tableRow._isNew = false;
      synchronizeRow(tableRow, geminiRow);
    }
    else {
      tableRow._isNew = true;
    }
  }
}

export function synchronizeRow(destinationRow: any, sourceRow: any): void {
  // if (destinationRow._isExpanded === null) {
  //   destinationRow._isNew = true;
  // }

  destinationRow._isExpanded = sourceRow._isExpanded;
}