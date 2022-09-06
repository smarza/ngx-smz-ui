import { SmzTreeWithDetailsState } from '../../modules/smz-tree-with-details/models/tree-with-details-state';
import { SmzTreeState } from '../../modules/smz-trees/models/tree-state';
import { TreeNode } from 'primeng/api';

export class SmzTreeWithDetailsBuilder {
  public _state: SmzTreeWithDetailsState = {
    isDebug: false,
    items$: null,
    tree: {
      state: null,
      styleClass: '',
      selectableTypes: [],
      allowAllNodesToBeClicked: false
    },
    context: {
      selectedNode: null
    },
    behavior: {
      emitDetailsAfterCycle: true
    },
    styleClass: {
      content: 'gap-3 p-6 overflow-y-auto'
    },
    locale: null,
  };

  constructor() {
    this.setLocale('pt-BR');
  }

  public setTitle(): SmzTreeWithDetailsBuilder {
    return this;
  }

  public setTree(treeState: SmzTreeState): SmzTreeWithDetailsBuilder {
    this._state.tree.state = treeState;
    return this;
  }

  public addSelectableTypes(type: string): SmzTreeWithDetailsBuilder {
    this._state.tree.selectableTypes.push(type);
    return this;
  }

  public allowAllNodesToBeClicked(): SmzTreeWithDetailsBuilder {
    this._state.tree.allowAllNodesToBeClicked = true;
    return this;
  }

  public setSelectedNode(node: TreeNode): SmzTreeWithDetailsBuilder {
    this._state.context.selectedNode = node;
    return this;
  }

  public overrideTreeContainerStyles(styleClass: string): SmzTreeWithDetailsBuilder {
    this._state.tree.styleClass = styleClass;
    return this;
  }

  public overridePageContainerStyles(styleClass: string): SmzTreeWithDetailsBuilder {
    this._state.styleClass.content = styleClass;
    return this;
  }

  public setLocale(language: 'pt-BR' | 'en-US'): SmzTreeWithDetailsBuilder {

    switch (language) {
      case 'pt-BR':
        this._state.locale = {
          code: language,
        };

        break;

      case 'en-US':

        this._state.locale = {
          code: language,
        };

        break;

      default:
        break;
    }

    return this;
  }


  public debugMode(): SmzTreeWithDetailsBuilder {
    this._state.isDebug = true;
    return this;
  }

  public build(): SmzTreeWithDetailsState {

    if (this._state.tree == null) {
      throw Error(`[Smz Tree With Details Builer] No tree state configured on SmzTreeWithDetailsState.`);
    }

    if (this._state.isDebug) {
      console.log(this._state);
    }

    return this._state;
  }
}