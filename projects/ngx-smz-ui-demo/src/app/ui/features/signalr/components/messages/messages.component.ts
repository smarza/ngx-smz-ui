import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { SmzDialogsService, SmzTableBuilder, SmzTableState, SignalRSelectors, SendSignalRData, SignalRConfig, SignalRConnection, SignalRActions  } from 'ngx-smz-ui';
import { Observable } from 'rxjs';
import { ChatMessage } from '../../models/chat';

@Component({
  selector: 'app-signalr-messages',
  templateUrl: `messages.component.html`
})
export class MessagesComponent
{
  public config: SignalRConfig = { hub: 'chatHub', method: 'SendMessage', dataBehavior: 'accumulate' };
  public connection$: Observable<SignalRConnection<ChatMessage[]>>;
  public table: SmzTableState = this.setupTable();

  constructor(private dialogs: SmzDialogsService, private store: Store)
  {
    this.connection$ = this.store.select(SignalRSelectors.connection<ChatMessage[]>(this.config));
  }

  public connect(): void {
    this.store.dispatch(new SignalRActions.Connect(this.config));
  }

  public send(): void {

    const data: SendSignalRData<ChatMessage> = { ...this.config,
      data: { user: 'From Store', message: 'Mensagem Teste' }
    };

    this.store.dispatch(new SignalRActions.Send(data));
  }

  public setupTable(): SmzTableState {
    return new SmzTableBuilder()
      .setTitle('Messages')
      .enableClearFilters()
      .enableColumnVisibility()
      .enableGlobalFilter()
      .usePagination()
      .setPaginationDefaultRows(10)
      .useStrippedStyle()
      .useAutoWidth()
      .useTableEmptyMessage()
      .setSize('small')
      .columns()
        .text('user', 'Usuário')
          .columns
        .text('message', 'Mensagem')
          .columns
        .table
      .build();
  }

}
