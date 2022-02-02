import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { SmzDialogsService, SignalRSelectors, SmzTableBuilder, SmzTableState, SignalRActions, SendSignalRData, SignalRConfig, SignalRConnection } from 'ngx-smz-ui';
import { Observable } from 'rxjs';
import { ChatFile } from '../../models/chat';

@Component({
  selector: 'app-signalr-files',
  templateUrl: `files.component.html`
})
export class FilesComponent
{
  public config: SignalRConfig = { hub: 'chatHub', method: 'SendFile', dataBehavior: 'accumulate', retryDelays: [0, 10000, 30000, 60000, 60000] };
  public connection$: Observable<SignalRConnection<ChatFile[]>>;
  public table: SmzTableState = this.setupTable();

  constructor(private dialogs: SmzDialogsService, private store: Store)
  {
    this.connection$ = this.store.select(SignalRSelectors.connection<ChatFile[]>(this.config));
  }

  public connect(): void {
    this.store.dispatch(new SignalRActions.Connect(this.config));
  }

  public send(): void {

    const data: SendSignalRData<ChatFile> = { ...this.config,
      data: { user: 'From Store', fileName: 'file.txt' }
    };

    this.store.dispatch(new SignalRActions.Send(data));
  }

  public setupTable(): SmzTableState {
    return new SmzTableBuilder()
      .setTitle('Files')
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
        .text('fileName', 'File')
          .columns
        .table
      .build();
  }

}
