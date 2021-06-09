import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { UUID } from 'angular2-uuid';
import { take } from 'rxjs/operators';
import { SmzTransaction } from '../models/editable-transaction';

// SERVIÇO SINGLETON
@Injectable({ providedIn: 'root' })
export class SmzTransactionsService {
  private transactions: { [k: string]: SmzTransaction } = {};
  private concludedTransactions: { [k: string]: SmzTransaction } = {};
  private isDebug = false;
  constructor(private store: Store) { }

  public add(dispatchAction: any, success: () => void, failure: (errors: string[]) => void): string {

    const transactionId = UUID.UUID();

    const transaction: SmzTransaction = {
      transactionId,
      dispatchAction,
      success,
      failure,
      status: 'created'
    };

    this.transactions[transactionId] = transaction;

    this.dispatch(transactionId);

    return transactionId;
  }

  private dispatch(transactionId: string): void {

    const transaction = this.transactions[transactionId];
    transaction.status = 'dispatched';

    if (!this.isDebug) {

      this.store
        .dispatch(transaction.dispatchAction)
        .subscribe(
          () => {
            this.dismissWithSuccess(transactionId);
          },
          (data) => {
            this.dismissWithFailure(transactionId, data.error);
          });

    }
    else {

      setTimeout(() => {
        const isSuccess = (Math.random() > 0.5) ? 1 : 0;

        if (isSuccess) {
          this.dismissWithSuccess(transactionId);
        }
        else {
          this.dismissWithFailure(transactionId, ['Erro qualquer 1', 'Erro qualquer 2']);
        }
      }, 3000);

    }
  }

  private dismissWithSuccess(transactionId: string): void {

    const transaction = this.transactions[transactionId];
    transaction.status = 'success';

    if (!this.isDebug) {
      // todo: fazer lógica para disparar success ou failure.
      transaction.success();
    }
    else {
      transaction.success();
    }

    this.conclude(transactionId);

  }

  private dismissWithFailure(transactionId: string, errors: string[]): void {

    const transaction = this.transactions[transactionId];
    transaction.status = 'failure';

    if (!this.isDebug) {
      // todo: fazer lógica para disparar success ou failure.
      transaction.failure(errors);
    }
    else {
      transaction.failure(errors);
    }

    this.conclude(transactionId);

  }

  private conclude(transactionId: string): void {
    const transaction = this.transactions[transactionId];

    this.concludedTransactions[transactionId] = transaction;

    delete this.transactions[transactionId];
  }

  public getConcluded(): SmzTransaction[] {

    const results: SmzTransaction[] = [];

    for (let key of Object.keys(this.concludedTransactions)) {
      results.push(this.concludedTransactions[key]);
    }

    return results;

  }

  public getTransactions(): SmzTransaction[] {

    const results: SmzTransaction[] = [];

    for (let key of Object.keys(this.transactions)) {
      results.push(this.transactions[key]);
    }

    return results;

  }

}