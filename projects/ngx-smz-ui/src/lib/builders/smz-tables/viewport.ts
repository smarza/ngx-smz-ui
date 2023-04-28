import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzTableBuilder } from './state-builder';
import { SmzTableViewportState, SmzTableViewportStateData } from '../../modules/smz-tables/models/table-state';

export class SmzTableViewportBuilder extends SmzBuilderUtilities<SmzTableViewportBuilder> {
  protected that = this;
  constructor(private _tableBuilder: SmzTableBuilder) {
    super();

    this._tableBuilder._state.viewport.state.isEnabled = true;
  }


  public useAutoPersistence(key: string): SmzTableViewportBuilder {

    if (this._tableBuilder._state.viewport.state.persistance == 'manual') {
      throw Error(`You cannot call 'useAutoPersistence' while using 'useManualPersistence' in the Table Builder`);
    }

    this._tableBuilder._state.viewport.state.persistance = 'auto';
    this._tableBuilder._state.viewport.state.auto.key = key;
    return this.that;
  }

  public useManualPersistence(load: () => SmzTableViewportStateData, save: (state: SmzTableViewportStateData) => void): SmzTableViewportBuilder {

    if (this._tableBuilder._state.viewport.state.persistance == 'auto') {
      throw Error(`You cannot call 'useManualPersistence' while using 'useAutoPersistence' in the Table Builder`);
    }

    this._tableBuilder._state.viewport.state.persistance = 'manual';
    this._tableBuilder._state.viewport.state.manual.loadCallback = load;
    this._tableBuilder._state.viewport.state.manual.saveCallback = save;
    return this.that;
  }

  public saveTriggerOnChange(): SmzTableViewportBuilder {
    this._tableBuilder._state.viewport.state.saveTrigger = 'onChange';
    return this.that;
  }

  public hookChanges(callback: (state: SmzTableViewportStateData) => void): SmzTableViewportBuilder {
    this._tableBuilder._state.viewport.state.onChangeCallback = callback;
    return this.that;
  }

  public applyData(state: SmzTableViewportStateData): SmzTableViewportBuilder {

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

  public get table(): SmzTableBuilder {
    return this._tableBuilder;
  }
}