import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzTableBuilder } from './state-builder';
import { SmzTableViewportState, SmzTableViewportStateData } from '../../modules/smz-tables/models/table-state';
import { GlobalInjector } from '../../common/services/global-injector';
import { Store } from '@ngxs/store';
import { AuthenticationSelectors } from '../../state/global/authentication/authentication.selectors';

export class SmzTableViewportBuilder<TData> extends SmzBuilderUtilities<SmzTableViewportBuilder<TData>> {
  protected override that = this;
  constructor(private _tableBuilder: SmzTableBuilder<TData>) {
    super();

    this._tableBuilder._state.viewport.state.isEnabled = true;
  }


  public usePersistenceGlobally(key: string): SmzTableViewportBuilder<TData> {

    if (this._tableBuilder._state.viewport.state.persistance == 'manual') {
      throw Error(`You cannot call 'usePersistenceGlobally' while using 'useManualPersistence' in the Table Builder`);
    }

    if (this._tableBuilder._state.viewport.state.persistance == 'auto') {
      throw Error(`You cannot call 'usePersistenceGlobally' while using 'usePersistenceByUser' in the Table Builder`);
    }

    this._tableBuilder._state.viewport.state.persistance = 'auto';
    this._tableBuilder._state.viewport.state.auto.key = key;

    const viewportStorageData = localStorage.getItem(this._tableBuilder._state.viewport.state.auto.key);

    if (viewportStorageData != null) {
      const viewport = JSON.parse(viewportStorageData) as SmzTableViewportStateData;
      this._tableBuilder._state.viewport.state.data = viewport;
    }

    return this.that;
  }

  public usePersistenceByUser(key: string): SmzTableViewportBuilder<TData> {

    if (this._tableBuilder._state.viewport.state.persistance == 'manual') {
      throw Error(`You cannot call 'usePersistenceByUser' while using 'useManualPersistence' in the Table Builder`);
    }

    if (this._tableBuilder._state.viewport.state.persistance == 'auto') {
      throw Error(`You cannot call 'usePersistenceByUser' while using 'usePersistenceGlobally' in the Table Builder`);
    }

    const store = GlobalInjector.instance.get(Store);
    const username: string = store.selectSnapshot(AuthenticationSelectors.username);

    this._tableBuilder._state.viewport.state.persistance = 'auto';
    this._tableBuilder._state.viewport.state.auto.key = `${username}_${key}`;

    const viewportStorageData = localStorage.getItem(this._tableBuilder._state.viewport.state.auto.key);

    if (viewportStorageData != null) {
      const viewport = JSON.parse(viewportStorageData) as SmzTableViewportStateData;
      this._tableBuilder._state.viewport.state.data = viewport;
    }

    return this.that;
  }

  public useManualPersistence(load: () => SmzTableViewportStateData, save: (state: SmzTableViewportStateData) => void): SmzTableViewportBuilder<TData> {

    if (this._tableBuilder._state.viewport.state.persistance == 'auto') {
      throw Error(`You cannot call 'useManualPersistence' while using 'useAutoPersistence' in the Table Builder`);
    }

    this._tableBuilder._state.viewport.state.persistance = 'manual';
    this._tableBuilder._state.viewport.state.manual.loadCallback = load;
    this._tableBuilder._state.viewport.state.manual.saveCallback = save;

    const viewportStorageData = load();

    if (viewportStorageData != null) {
      this._tableBuilder._state.viewport.state.data = viewportStorageData;
    }

    return this.that;
  }

  public saveTriggerOnChange(): SmzTableViewportBuilder<TData> {
    this._tableBuilder._state.viewport.state.saveTrigger = 'onChange';
    return this.that;
  }

  public hookChanges(callback: (state: SmzTableViewportStateData) => void): SmzTableViewportBuilder<TData> {
    this._tableBuilder._state.viewport.state.onChangeCallback = callback;
    return this.that;
  }

  public applyData(state: SmzTableViewportStateData): SmzTableViewportBuilder<TData> {

    if (state.visibility == null) {
      throw Error('You need to provide an Array for Viewport visibility state.');
    }

    if (state.sort == null) {
      throw Error('You need to provide an Array for Viewport sort state.');
    }

    if (this._tableBuilder._state.sort?.mode === 'multiple') {
      throw Error('Multisort is not supported in Viewport State.');
    }

    return this.that;
  }

  public get table(): SmzTableBuilder<TData> {
    return this._tableBuilder;
  }
}