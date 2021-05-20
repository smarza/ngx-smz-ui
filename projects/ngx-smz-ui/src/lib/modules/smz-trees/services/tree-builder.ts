import { TreeNode } from 'primeng/api';
import { Tree } from 'primeng/tree';
import { SmzMenuBuilder } from '../../smz-tables/models/table-builder';
import { SmzTreeMenuItem } from '../models/tree-menu-item';
import { SmzTreeState } from '../models/tree-state';
import { SmzTreeToolbarButton } from '../models/tree-toolbar-button';

export class SmzTreeBuilder {
  public _state: SmzTreeState = {
    menu: {
      isVisible: false,
      items: []
    },
    header: {
      isVisible: false,
      title: null,
      toolbar: {
        alignment: 'start',
        buttonType: 'square-filled',
        items: [],
        source: 'state'
      },
    },
    footer: {
      isVisible: false
    },
    emptyFeedback: {
      actionButton: {
        label: 'Criar',
        callback: null
      },
      extraInfo: 'Extra info',
      image: 'assets/images/empty.svg',
      message: 'Mensagem de não existem itens'
    },
    dragAndDrop: {
      draggable: false,
      droppable: false,
      validateDrop: false,
    },
    filter: {
      filterBy: ['label'],
      mode: 'lenient',
      show: false,
      textPlaceholder: 'Filtro...'
    },
    loading: {
      icon: 'fas fa-circle-notch fa-spin',
      isLoading: false,
    },
    styles: {
      inlineStyle: null,
      styleClass: null,
    },
    selection: {
      mode: 'single',
      propagateDown: true,
      propagateUp: true
    }
  };
  constructor() {

  }

  public menu(): SmzTreeMenuBuilder {
    this._state.menu.isVisible = true;

    return new SmzTreeMenuBuilder(this);
  }

  public setTitle(title: string): SmzTreeBuilder {
    this._state.header.isVisible = true;
    this._state.header.title = title;
    return this;
  }

  public toolbar(): SmzTreeToolbarBuilder {
    this._state.header.toolbar.isVisible = true;
    return new SmzTreeToolbarBuilder(this);
  }

  public emptyFeedback(): SmzTreeEmptyFeedbackBuilder {
    return new SmzTreeEmptyFeedbackBuilder(this);
  }

  public dragAndDrop(): SmzTreeDragAndDropBuilder {
    return new SmzTreeDragAndDropBuilder(this);
  }

  public setSelection(mode: 'single' | 'multiple' | 'checkbox', propagateUp: boolean = true, propagateDown: boolean = true): SmzTreeBuilder {
    this._state.selection.mode = mode;
    this._state.selection.propagateUp = propagateUp;
    this._state.selection.propagateDown = propagateDown;
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

  public setInlineStyle(value: string): SmzTreeBuilder {
    this._state.styles.inlineStyle = value;
    return this;
  }

  public setStyleClass(styleClass: string): SmzTreeBuilder {
    this._state.styles.inlineStyle = styleClass;
    return this;
  }

  public build(): SmzTreeState {
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

  public buttons(type: 'rounded-outlined' | 'rounded-filled' | 'rounded-borderless' | 'square-outlined' | 'square-filled' | 'square-borderless'): SmzTreeToolbarButtonCollectionBuilder {
    this._treeBuilder._state.header.toolbar.items = [];
    this._treeBuilder._state.header.toolbar.buttonType = type;

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

  public setCallback(callback: (items: TreeNode[], node: TreeNode) => void): SmzTreeToolbarButtonBuilder {
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
    this._treeBuilder._state.emptyFeedback.extraInfo = message;
    return this;
  }

  public setImage(path: string): SmzTreeEmptyFeedbackBuilder {
    this._treeBuilder._state.emptyFeedback.image = path;
    return this;
  }

  public setButtonLabel(label: string): SmzTreeEmptyFeedbackBuilder {
    this._treeBuilder._state.emptyFeedback.actionButton.label = label;
    return this;
  }

  public setButtonCallback(callback: () => void): SmzTreeEmptyFeedbackBuilder {
    this._treeBuilder._state.emptyFeedback.actionButton.callback = callback;
    return this;
  }

  public get tree(): SmzTreeBuilder {
    return this._treeBuilder;
  }
}

export class SmzTreeDragAndDropBuilder {
  constructor(public _treeBuilder: SmzTreeBuilder) {

  }

  public enableDrag(): SmzTreeDragAndDropBuilder {
    this._treeBuilder._state.dragAndDrop.draggable = true;
    return this;
  }

  public enableDrop(): SmzTreeDragAndDropBuilder {
    this._treeBuilder._state.dragAndDrop.droppable = true;
    return this;
  }

  public validateDrop(): SmzTreeDragAndDropBuilder {
    this._treeBuilder._state.dragAndDrop.validateDrop = true;
    return this;
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