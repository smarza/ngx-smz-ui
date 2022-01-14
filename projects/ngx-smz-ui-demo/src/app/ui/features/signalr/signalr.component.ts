import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SmzDialogsService, SmzTableBuilder, SmzTableState } from 'ngx-smz-ui';
import { SignalRSelectors } from '../../../state/signalr/signalr.selectors';
import { Observable } from 'rxjs';
import { SignalRConfig, SignalRConnection } from '@states/signalr/signalr';
import { SignalRActions } from '@states/signalr/signalr.actions';

export interface Chat {
  user: string;
  message: string;
}

@Component({
  selector: 'app-home',
  templateUrl: `signalr.component.html`
})
export class SignalRComponent
{
  @Select(SignalRSelectors.connections) public connections$: Observable<SignalRConfig[]>;
  public messagesConfig: SignalRConfig = { hub: 'chatHub', method: 'SendMessage', dataBehavior: 'accumulate' };
  public filesConfig: SignalRConfig = { hub: 'chatHub', method: 'SendFile', dataBehavior: 'accumulate' };
  public messagesConnection$: Observable<SignalRConnection<unknown>>;
  public filesConnection$: Observable<SignalRConnection<unknown>>;
  public table: SmzTableState = this.setupTable();

  constructor(private dialogs: SmzDialogsService, private store: Store)
  {
    this.messagesConnection$ = this.store.select(SignalRSelectors.connection(this.messagesConfig));
    this.filesConnection$ = this.store.select(SignalRSelectors.connection(this.filesConfig));
  }

  public connectToMessages(): void {
    this.store.dispatch(new SignalRActions.Connect(this.messagesConfig));
  }

  public connectToFiles(): void {
    this.store.dispatch(new SignalRActions.Connect(this.filesConfig));
  }

  public closeConnection(connection: SignalRConfig): void {
    this.store.dispatch(new SignalRActions.CloseHubConnection(connection));
  }

  public closeHub(): void {
    this.store.dispatch(new SignalRActions.CloseHub('chatHub'));
  }

  public setupTable(): SmzTableState {
    return new SmzTableBuilder()
      .setTitle('Connections')
      .enableClearFilters()
      .enableColumnVisibility()
      .enableGlobalFilter()
      .usePagination()
      .setPaginationDefaultRows(10)
      .useStrippedStyle()
      .useAutoWidth()
      .useTableEmptyMessage()
      .setSize('small')
      .menu()
        .item('Disconnect')
          .setCallback((connection: SignalRConfig) => this.closeConnection(connection))
          .menu
        .table
      .columns()
        .text('hub', 'Hub')
          .columns
        .text('method', 'Method')
          .columns
        .text('dataBehavior', 'Behavior')
          .columns
        .table
      .build();
  }

}
