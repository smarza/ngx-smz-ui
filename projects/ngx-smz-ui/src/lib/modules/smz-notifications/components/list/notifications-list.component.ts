import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { NotificationsUiActions } from '../../../../state/ui/notifications/notifications.actions';
import { SmzTableBuilder } from '../../../../builders/smz-tables/state-builder';
import { NotificationData, NotificationFolder, NotificationFolderStatus, NotificationStatus } from '../../../../state/ui/notifications/notifications.model';
import { SmzTableState } from '../../../smz-tables/models/table-state';
import { Confirmable } from '../../../smz-dialogs/decorators/confirmable.decorator';
import { Navigate } from '@ngxs/router-plugin';
import { Observable } from 'rxjs';
import { NotificationsUiSelectors } from '../../../../state/ui/notifications/notifications.selectors';
import { GlobalInjector } from '../../../../common/services/global-injector';

@Component({
  selector: 'smz-notifications-list',
  templateUrl: 'notifications-list.component.html',
  styleUrls: ['notifications-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class NotificationsListComponent {
  @Select(NotificationsUiSelectors.hasRuningRequest) public hasRuningRequest$: Observable<boolean>;
  @Input() public notifications: NotificationData[];
  public tableState: SmzTableState;
  public status = NotificationStatus;
  public selected: NotificationData[] = [];
  public uiConfig = GlobalInjector.config;
  public folders = [
    {
      status: NotificationFolderStatus[NotificationFolder.INBOX],
      icon: 'fa-solid fa-inbox',
      tooltip: 'Caixa de Entrada',
      rebuild: () => this.setupInboxTable(),
      count$: this.store.select(NotificationsUiSelectors.inboxCount)
    },
    {
      status: NotificationFolderStatus[NotificationFolder.ARCHIVED],
      icon: 'fa-solid fa-box-archive',
      tooltip: 'Arquivados',
      rebuild: () => this.setupArchivedTable(),
      count$: this.store.select(NotificationsUiSelectors.archivedCount)
    }
  ]
  public currentFolder = this.folders[0];
  constructor(private store: Store, private cdf: ChangeDetectorRef) {
    this.setupInboxTable();
  }

  public buildBaseTable(): SmzTableBuilder {

    return new SmzTableBuilder()
      .setSize('small')
      .enableGlobalFilter()
      .expandGlobalFilterInput()
      .setEmptyFeedbackMessage(GlobalInjector.config.rbkUtils.notifications.emptyMessage)
      .useTableEmptyMessage()
      .usePagination()
      .setPaginationDefaultRows(GlobalInjector.config.rbkUtils.notifications.rowsPerPage)
      .setPaginationPageOptions(GlobalInjector.config.rbkUtils.notifications.pageOptions)
      .allowDefaultMultiSelection()
      .hideHeader()
      .columns()
        .custom('searchData', '')
          .forceGlobalFilter()
          .addStyles('col')
          .disableFilter()
          .columns
      .table;

  }

  public setupInboxTable(): void {

    this.tableState = this.buildBaseTable()
      .setSize('small')
      .setTitle(`Caixa de Entrada`)
      .setRowClickCallback((event: NotificationData) => {
        if (!this.store.selectSnapshot(NotificationsUiSelectors.hasRuningRequest)) {
          this.store.dispatch(new NotificationsUiActions.MarkAsViewed([event.id]));
        }
      })
      .batchMenu()
        .item('', 'fa-solid fa-box-archive', 'Arquivar Seleção')
          .setCallback((event: NotificationData[]) => this.archive(event))
          .menu
        .item('', 'fa-solid fa-trash', 'Excluir Seleção')
          .setCallback((event: NotificationData[]) => this.batchRemove(event))
          .menu
        .table
      .build();

  }

  public setupArchivedTable(): void {

    this.tableState = this.buildBaseTable()
      .setTitle(`Arquivados`)
      .batchMenu()
        .item('', 'fa-solid fa-inbox', 'Mover Seleção para Caixa de Entrada')
          .setCallback((event: NotificationData[]) => this.moveToInbox(event))
          .menu
        .item('', 'fa-solid fa-trash', 'Excluir Seleção')
          .setCallback((event: NotificationData[]) => this.batchRemove(event))
          .menu
        .table
      .build();

  }
  public onSelect(event: NotificationData[]): void {
    this.selected = event;
  }

  public refresh(): void {
    this.store.dispatch(new NotificationsUiActions.LoadAll({}));
  }

  public archive(event: NotificationData[]): void {
    this.store.dispatch(new NotificationsUiActions.Archive(event.map(x => x.id)));
  }

  public moveToInbox(event: NotificationData[]): void {
    this.store.dispatch(new NotificationsUiActions.MoveToInbox(event.map(x => x.id)));
  }

  @Confirmable('Deseja realmente excluir as notificações selecionadas ?<br>Está operação não poderá ser desfeita.', 'Exclusão', true)
  public batchRemove(event: NotificationData[]): void {
    this.store.dispatch(new NotificationsUiActions.Delete(event.map(x => x.id)));
  }

  @Confirmable('Deseja realmente excluir esta notificação ?<br>Está operação não poderá ser desfeita.', 'Exclusão', true)
  public remove(event: NotificationData): void {
    this.store.dispatch(new NotificationsUiActions.Delete([event.id]));
  }

  public navigate(event: NotificationData): void {
    this.store.dispatch(new Navigate([event.route]));

    if (event.status !== NotificationStatus.ARCHIVED) {
      this.store.dispatch(new NotificationsUiActions.MarkAsViewed([event.id]));
    }
  }

  public openLink(event: NotificationData): void {
    window.open(event.link, '_blank');

    if (event.status !== NotificationStatus.ARCHIVED) {
      this.store.dispatch(new NotificationsUiActions.MarkAsViewed([event.id]));
    }
  }

}