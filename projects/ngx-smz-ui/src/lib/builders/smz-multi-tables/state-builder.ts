import { cloneDeep } from 'lodash-es';
import { SmzMultiTablesState, SmzMultiTablesTab } from '../../modules/smz-multi-tables/multi-tables.state';
import { SmzMultiTablesTabBuilder } from './tab-builder';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { UUID } from 'angular2-uuid';

export class SmzMultiTablesBuilder extends SmzBuilderUtilities<SmzMultiTablesBuilder> {
  protected that = this;
  public _state: SmzMultiTablesState = {
    isDebug: false,
    styleClass: '',
    tabs: []
  };

  constructor() {
    super();
  }

  public setTitle(styleClass: string): SmzMultiTablesBuilder {
    this._state.styleClass = styleClass;
    return this.that;
  }


  public tab(label: string): SmzMultiTablesTabBuilder {
    const id = UUID.UUID();
    const newTab: SmzMultiTablesTab = {
      _id: id,
      _originalId: id,
      _isDuplicated: false,
      allowDuplication: false,
      styleClass: '',
      selected: null,
      closable: null,
      header: {
        styleClass: '',
        label: {
          name: 'header',
          styleClass: ''
        },
        icon: {
          isVisible: false,
          name: '',
          styleClass: ''
        }
      },
      table: {
        state: null,
        items$: null
      }
    };

    this._state.tabs.push(newTab);

    return new SmzMultiTablesTabBuilder(this, newTab, label);
  }

  public debugMode(): SmzMultiTablesBuilder {
    this._state.isDebug = true;
    return this.that;
  }

  public build(): SmzMultiTablesState {

    if (this._state.isDebug) {
      console.log(cloneDeep(this._state));
    }

    return this._state;
  }
}