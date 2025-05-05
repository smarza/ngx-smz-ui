import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiBuilder } from './ui-builder';

export class SmzUiNotificationsBuilder extends SmzBuilderUtilities<SmzUiNotificationsBuilder> {
  protected override that = this;
  constructor(private _builder: SmzUiBuilder) {
    super();

    this._builder._state.rbkUtils.notifications = {
      url: `/api/notifications`,
      updateMethod: 'interval',
      updateRate: 100000,
      httpBehavior: {
          authentication: true,
          compression: true,
          errorHandlingType: 'toast',
          loadingBehavior: 'none',
          needToRefreshToken: true
      },
      emptyMessage: 'Nenhuma notificação encontrada',
      title: 'Notificações',
      rowsPerPage: 5,
      pageOptions: [5, 10, 20],
      showTypeIndicators: true,
      showRefreshButton: true,
      width: '60vw',
      styleClass: '',
      zIndex: 2000,
      date: {
          recentsMethod: 'fromNow',
          recentsDaysCount: 2,
          othersFormat: 'DD/MM/YYYY HH:mm'
      }
    };
  }

  public setApiUrl(url: string): SmzUiNotificationsBuilder {
    this._builder._state.rbkUtils.notifications.url = url;
    return this.that;
  }

  public hideIndicators(): SmzUiNotificationsBuilder {
    this._builder._state.rbkUtils.notifications.showTypeIndicators = false;
    return this.that;
  }

  public hideRefreshButton(): SmzUiNotificationsBuilder {
    this._builder._state.rbkUtils.notifications.showRefreshButton = false;
    return this.that;
  }

  public setWidth(width: string): SmzUiNotificationsBuilder {
    this._builder._state.rbkUtils.notifications.width = width;
    return this.that;
  }

  public customStyles(styleClass: string): SmzUiNotificationsBuilder {
    this._builder._state.rbkUtils.notifications.styleClass = styleClass;
    return this.that;
  }

  public setZIndex(zIndex: number): SmzUiNotificationsBuilder {
    this._builder._state.rbkUtils.notifications.zIndex = zIndex;
    return this.that;
  }

  public setUpdateRate(miliseconds: number): SmzUiNotificationsBuilder {
    this._builder._state.rbkUtils.notifications.updateRate = miliseconds;
    return this.that;
  }

  public setEmptyMessage(message: string): SmzUiNotificationsBuilder {
    this._builder._state.rbkUtils.notifications.emptyMessage = message;
    return this.that;
  }

  public setTitle(title: string): SmzUiNotificationsBuilder {
    this._builder._state.rbkUtils.notifications.title = title;
    return this.that;
  }

  public setItemsPerPage(count: number): SmzUiNotificationsBuilder {
    this._builder._state.rbkUtils.notifications.rowsPerPage = count;
    return this.that;
  }

  public setPagination(settings: number[]): SmzUiNotificationsBuilder {
    this._builder._state.rbkUtils.notifications.pageOptions = settings;
    return this.that;
  }

  public get builder(): SmzUiBuilder {
    return this._builder;
  }
}
