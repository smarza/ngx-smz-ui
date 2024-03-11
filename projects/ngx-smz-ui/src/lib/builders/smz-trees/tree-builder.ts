import { TreeNode } from 'primeng/api';
import { SmzTreeMenuItem } from '../../modules/smz-trees/models/tree-menu-item';
import { SmzTreeState } from '../../modules/smz-trees/models/tree-state';
import { SmzTreeToolbarButton } from '../../modules/smz-trees/models/tree-toolbar-button';
import { SmzDataSourceTreeBuilder } from './data-source-tree-builder';

export class SmzTreeBuilder {
  public _state: SmzTreeState = {
    isDebug: false,
    menu: {
      isVisible: false,
      items: []
    },
    header: {
      isVisible: true,
      title: null,
      toolbar: {
        alignment: 'start',
        buttonType: 'square-filled',
        items: [],
        source: 'state',
        treeExpandButtons: {
          isVisible: false,
          collapseLabel: '',
          expandLabel: ''
        },
        nodeExpandButtons: {
          isVisible: false,
          collapseLabel: '',
          expandLabel: ''
        },
      },
    },
    footer: {
      isVisible: false
    },
    emptyFeedback: {
      actionButton: {},
      extraInfo: null,
      image: null,
      message: 'Lista Vazia',
      isFeatured: true
    },
    dragAndDrop: {
      draggable: false,
      droppable: false,
      validateDrop: false,
      configuration: []
    },
    filter: {
      filterBy: ['label'],
      mode: 'lenient',
      show: false,
      textPlaceholder: 'Filtro...',
      styleClass: 'lg:col-4 md:col-6'
    },
    loading: {
      icon: 'fa-solid fa-circle-notch fa-spin',
      isLoading: false,
    },
    selection: {
      mode: 'single',
      propagateDown: true,
      propagateUp: true,
      expandNodes: true
    },
    content: {
      sincronize: false,
      dataTransform: null
    }
  };
  constructor() {

  }

  public debugMode(): SmzTreeBuilder {
    this._state.isDebug = true;
    return this;
  }

  public menu(): SmzTreeMenuBuilder {
    this._state.menu.isVisible = true;

    return new SmzTreeMenuBuilder(this);
  }

  public hideHeader(): SmzTreeBuilder {
    this._state.header.isVisible = false;
    return this;
  }

  public setTitle(title: string): SmzTreeBuilder {

    if (!this._state.header.isVisible) {
      throw new Error(`You can't call setTitle() because the header is hidden.`);
    }

    this._state.header.title = title;
    return this;
  }

  public toolbar(type: 'rounded-outlined' | 'rounded-filled' | 'rounded-borderless' | 'square-outlined' | 'square-filled' | 'square-borderless'): SmzTreeToolbarBuilder {

    if (!this._state.header.isVisible) {
      throw new Error(`You can't call toolbar() because the header is hidden.`);
    }

    this._state.header.toolbar.buttonType = type;
    return new SmzTreeToolbarBuilder(this);
  }

  public emptyFeedback(): SmzTreeEmptyFeedbackBuilder {
    return new SmzTreeEmptyFeedbackBuilder(this);
  }

  public dragAndDrop(): SmzTreeDragAndDropBuilder {
    this._state.dragAndDrop.draggable = true;
    this._state.dragAndDrop.droppable = true;
    return new SmzTreeDragAndDropBuilder(this);
  }

  public setSelection(mode: 'single' | 'multiple' | 'checkbox', propagateUp: boolean = true, propagateDown: boolean = true): SmzTreeBuilder {

    if (this._state.header.toolbar.nodeExpandButtons.isVisible) {
      throw new Error(`You can't use Multiple or Checkbox selection mode with only nodeExpandButtons enabled.`);
    }

    this._state.selection.mode = mode;
    this._state.selection.propagateUp = propagateUp;
    this._state.selection.propagateDown = propagateDown;
    return this;
  }

  public disableInitialNodeExpansion(): SmzTreeBuilder {

    this._state.selection.expandNodes = false;

    return this;
  }

  public setLoadingIcon(icon: string): SmzTreeBuilder {
    this._state.loading.icon = icon;
    return this;
  }

  public enableFilter(): SmzTreeBuilder {
    this._state.filter.show = true;
    return this;
  }

  public setFilterPlaceholder(text: string): SmzTreeBuilder {
    this._state.filter.textPlaceholder = text;
    return this;
  }

  public setFilterStyleClass(styleClass: string): SmzTreeBuilder {
    this._state.filter.styleClass = styleClass;
    return this;
  }

  public useSincronization(): SmzTreeBuilder {
    this._state.content.sincronize = true;
    return this;
  }

  public dataSource(): SmzDataSourceTreeBuilder<SmzTreeBuilder> {
    return new SmzDataSourceTreeBuilder<SmzTreeBuilder>(this, this._state.content);
  }

  public build(): SmzTreeState {

    if (this._state.isDebug) {
      console.log(this._state);
    }

    return this._state;
  }
}

export class SmzTreeToolbarBuilder {
  constructor(public _treeBuilder: SmzTreeBuilder) {

  }

  public setAlignment(alignment: 'start' | 'end'): SmzTreeToolbarBuilder {
    this._treeBuilder._state.header.toolbar.alignment = alignment;
    return this;
  }

  public useTreeExpandButtons(expandLabel: string = '', collapseLabel: string = ''): SmzTreeToolbarBuilder {
    this._treeBuilder._state.header.toolbar.treeExpandButtons = {
      isVisible: true,
      collapseLabel: collapseLabel,
      expandLabel: expandLabel
    };
    return this;
  }

  // public useNodeExpandButtons(expandLabel: string = '', collapseLabel: string = '',
  //    expandTooltip: string = 'Expandir nó selecionado', collapseTooltip: string = 'Colapsar nó selecionado',
  //    disabledTooltip: string = 'Selecione um nó da árvore'): SmzTreeToolbarBuilder {

  //     if (this._treeBuilder._state.selection.mode !== 'single') {
  //       throw new Error(`You can only useNodeExpandButtons with the single selection mode enabled.`);
  //     }

  //   this._treeBuilder._state.header.toolbar.nodeExpandButtons = {
  //     isVisible: true,
  //     collapseLabel: collapseLabel,
  //     expandLabel: expandLabel,
  //     expandTooltip: expandTooltip,
  //     collapseTooltip: collapseTooltip,
  //     disabledTooltip: disabledTooltip
  //   };
  //   return this;
  // }

  public buttons(): SmzTreeToolbarButtonCollectionBuilder {
    this._treeBuilder._state.header.toolbar.items = [];

    return new SmzTreeToolbarButtonCollectionBuilder(this);
  }

  public get tree(): SmzTreeBuilder {
    return this._treeBuilder;
  }
}

export class SmzTreeToolbarButtonCollectionBuilder {
  constructor(private _toolbarBuilder: SmzTreeToolbarBuilder) {

  }

  public button(label: string, icon: string = null): SmzTreeToolbarButtonBuilder {
    const button: SmzTreeToolbarButton = {
      label: label,
      icon: icon
    };
    this._toolbarBuilder.tree._state.header.toolbar.items.push(button);
    return new SmzTreeToolbarButtonBuilder(this, button);
  }

  public get toolbar(): SmzTreeToolbarBuilder {
    return this._toolbarBuilder;
  }
}

export class SmzTreeToolbarButtonBuilder {
  constructor(private _buttonsCollection: SmzTreeToolbarButtonCollectionBuilder, private _button: SmzTreeToolbarButton) {

  }

  public setCallback(callback: (event: MouseEvent, items: TreeNode[], nodes: TreeNode[]) => void): SmzTreeToolbarButtonBuilder {
    this._button.callback = callback;
    return this;
  }

  public setTooltip(tooltip: string): SmzTreeToolbarButtonBuilder {
    this._button.tooltip = tooltip;
    return this;
  }

  public setColor(color: 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger'): SmzTreeToolbarButtonBuilder {
    this._button.color = color;
    return this;
  }

  public get buttons(): SmzTreeToolbarButtonCollectionBuilder {
    return this._buttonsCollection;
  }
}

export class SmzTreeEmptyFeedbackBuilder {
  constructor(public _treeBuilder: SmzTreeBuilder) {

  }

  public setMessage(message: string): SmzTreeEmptyFeedbackBuilder {
    this._treeBuilder._state.emptyFeedback.message = message;
    return this;
  }

  public setExtraInfo(message: string): SmzTreeEmptyFeedbackBuilder {
    if (!this._treeBuilder._state.emptyFeedback.isFeatured) {
      throw Error('This feature is not compatible with \'useTreeEmptyMessage\'');
    }

    this._treeBuilder._state.emptyFeedback.extraInfo = message;
    return this;
  }

  public setImage(path: string): SmzTreeEmptyFeedbackBuilder {
    if (!this._treeBuilder._state.emptyFeedback.isFeatured) {
      throw Error('This feature is not compatible with \'useTreeEmptyMessage\'');
    }

    this._treeBuilder._state.emptyFeedback.image = path;
    return this;
  }

  public setButtonLabel(label: string): SmzTreeEmptyFeedbackBuilder {
    if (!this._treeBuilder._state.emptyFeedback.isFeatured) {
      throw Error('This feature is not compatible with \'useTreeEmptyMessage\'');
    }

    this._treeBuilder._state.emptyFeedback.actionButton.label = label;
    return this;
  }

  public setButtonCallback(callback: (event?: MouseEvent) => void): SmzTreeEmptyFeedbackBuilder {
    if (!this._treeBuilder._state.emptyFeedback.isFeatured) {
      throw Error('This feature is not compatible with \'useTreeEmptyMessage\'');
    }

    this._treeBuilder._state.emptyFeedback.actionButton.callback = callback;
    return this;
  }

  public useTreeEmptyMessage(): SmzTreeEmptyFeedbackBuilder {
    this._treeBuilder._state.emptyFeedback.isFeatured = false;
    return this;
  }

  public get tree(): SmzTreeBuilder {
    return this._treeBuilder;
  }
}

export class SmzTreeDragAndDropBuilder {
  constructor(public _treeBuilder: SmzTreeBuilder) {

  }

  public canDrag(type: string): SmzTreeDropBuilder {
    this._treeBuilder._state.dragAndDrop.validateDrop = true;

    return new SmzTreeDropBuilder(type, this);
  }

  public get tree(): SmzTreeBuilder {
    return this._treeBuilder;
  }
}

export class SmzTreeMenuBuilder {
  constructor(public _treeBuilder: SmzTreeBuilder) {

  }

  public caption(label: string, icon: string = null): SmzTreeMenuItemBuilder {
    const item: SmzTreeMenuItem = { label, icon, visible: true, disabled: false };
    this._treeBuilder._state.menu.items.push(item);
    return new SmzTreeMenuItemBuilder(this, null, item);
  }

  public separator(): SmzTreeMenuBuilder {
    this._treeBuilder._state.menu.items.push({ separator: true });
    return this;
  }

  public item(label: string, icon: string = null): SmzTreeMenuItemBuilder {
    const item: SmzTreeMenuItem = { label, icon, visible: true, disabled: false };
    this._treeBuilder._state.menu.items.push(item);
    return new SmzTreeMenuItemBuilder(this, null, item);
  }

  public get tree(): SmzTreeBuilder {
    return this._treeBuilder;
  }
}

export class SmzTreeMenuItemBuilder {
  constructor(public _menuBuilder: SmzTreeMenuBuilder, private _parent: SmzTreeMenuItemBuilder, private _item: SmzTreeMenuItem) {

  }

  public setCallback<T>(callback: (item: T) => void): SmzTreeMenuItemBuilder {
    this._item.callback = callback;
    return this;
  }

  public setTooltip(tooltip: string): SmzTreeMenuItemBuilder {
    this._item.tooltip = tooltip;
    return this;
  }

  public hideForTypes(...params: string[]): SmzTreeMenuItemBuilder {
    this._item.unallowedTypes = params;
    return this;
  }

  public showForTypes(...params: string[]): SmzTreeMenuItemBuilder {
    this._item.allowedTypes = params;
    return this;
  }

  public item(label: string, icon: string = null): SmzTreeMenuItemBuilder {
    const item: SmzTreeMenuItem = { label, icon, visible: true, disabled: false };

    if (this._item.items == null) {
      this._item.items = [];
    }
    this._item.items.push(item);
    return new SmzTreeMenuItemBuilder(this._menuBuilder, this, item);
  }

  public get parent(): SmzTreeMenuItemBuilder {
    return this._parent;
  }

  public get menu(): SmzTreeMenuBuilder {
    return this._menuBuilder;
  }
}

export class SmzTreeDropBuilder {
  constructor(private _type: string, private _parentBuilder: SmzTreeDragAndDropBuilder) {

  }

  public into(...types: string[]): SmzTreeDragAndDropBuilder {
    this._parentBuilder._treeBuilder._state.dragAndDrop.validateDrop = true;
    types.forEach(x => {
      if (this._parentBuilder._treeBuilder._state.dragAndDrop.configuration == null) {
        this._parentBuilder._treeBuilder._state.dragAndDrop.configuration = [];
      }
      this._parentBuilder._treeBuilder._state.dragAndDrop.configuration.push({ dragType: this._type, dropType: x});
    });
    return this._parentBuilder;
  }
}