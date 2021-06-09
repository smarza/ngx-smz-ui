import { Store } from '@ngxs/store';
import { convertFormFeature, UiDefinitionsDbSelectors } from 'ngx-rbk-utils';
import { flatten, SmzControlTypes, SmzForm } from 'ngx-smz-dialogs';
import { GlobalInjector } from '../../../../../lib/common/services/global-injector';
import { defaultMapResults, EditableChangeTrack } from '../../models/editable-model';
import { SmzTableState } from '../../models/table-state';
import { StateBuilderFunctions } from './state-builder-functions';

export class SmzTableWithUiDefinitionsBuilder {
  public _state: SmzTableState = {
    columns: [],
    actions: {
      customActions: {
        columnWidth: 0,
        isVisible: false,
      },
      menu: {
        isVisible: false,
        items: []
      },
      rowBehavior: {
        clickCallback: null,
        hoverable: true,
        isClickable: false,
        highlights: { ids: [] }
      }
    },
    editable: {
      isEditable: false,
      update: {
        isButtonVisible: false
      },
      creation: {
        isButtonVisible: false,
        buttonLabel: 'Criar'
      },
      remove: {
        isButtonVisible: false
      },
      actions:
      {
        update: null,
        creation: null,
        remove: null,
      },
      mapResults: (data, change: EditableChangeTrack<any>) => defaultMapResults(data, change)
    },
    caption: {
      rowSelection: {
        isButtonVisible: false,
        isEnabled: false,
        callback: null,
        columnWidth: '3em',
        label: ''
      },
      clearFilters: {
        callback: null,
        isButtonVisible: false,
        label: '',
      },
      columnVisibility: {
        showButton: false,
      },
      globalFilter: {
        isVisible: true,
      },
      isVisible: false,
      title: null,
      toolbarAlignment: 'start'
    },
    emptyFeedback: {
      actionButton: null,
      extraInfo: null,
      image: 'assets/images/tables/empty.svg',
      message: 'Lista vazia'
    },
    initialState: {
      skeleton: {
        isEnabled: true,
        rows: 10,
      },
    },
    pagination: {
      isVisible: false,
      pageReport: {
        isVisible: false,
        template: ''
      },
      rows: 10,
      rowsPerPageOptions: [5, 10, 25, 50]
    },
    sort: {
      field: null,
      mode: 'single',
      multiSortMeta: null,
      order: 1
    },
    styles: {
      striped: false,
    }
  };

  constructor(uiDefinitionName: string) {

    const store = GlobalInjector.instance.get(Store);

    const create = store.selectSnapshot(UiDefinitionsDbSelectors.single(uiDefinitionName, 'create'));

    if (create == null) {
      throw Error('You need to supply a valid ui-definitions.');
    }

    if (create[0] == null) {
      throw Error('There are no elements in ui-definitions create index 0.');
    }

    console.log('uiDefinitions create', create[0]);

    const formFeature: SmzForm<any> = convertFormFeature(uiDefinitionName, store, null).data as SmzForm<any>;
    console.log('convertFormFeature', formFeature);

    const children: SmzControlTypes[] = flatten(formFeature.groups.map(g => flatten(g.children)));

    StateBuilderFunctions.createColumnsFromInputControls(this._state, create[0].controls, children);

  }

  public setUpdateDispatch(action: any): SmzTableWithUiDefinitionsBuilder {
    this._state.editable.actions.update = action;
    this._state.editable.isEditable = true;


    return this;
  }

  public setCreationDispatch(action: any): SmzTableWithUiDefinitionsBuilder {
    this._state.editable.actions.creation = action;


    return this;
  }

  public setDeleteDispatch(action: any): SmzTableWithUiDefinitionsBuilder {
    this._state.editable.actions.remove = action;
    this._state.editable.remove.isButtonVisible = true;
    this._state.editable.isEditable = true;

    return this;
  }

  public build(): SmzTableState {
    return this._state;
  }
}