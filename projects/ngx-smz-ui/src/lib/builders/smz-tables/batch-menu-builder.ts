import { MenuItem } from 'primeng/api';
import { SmzMenuItem } from '../../modules/smz-menu/models/smz-menu-item';
import { SmzTableBuilder } from './state-builder';

export class SmzBatchMenuBuilder {
  constructor(private _tableBuilder: SmzTableBuilder) {

  }

  public item(label: string, icon: string = null, tooltip: string = null): SmzBatchMenuItemBuilder {
    this._tableBuilder._state.actions.batchActions.isVisible = true;
    const item: SmzMenuItem = { label, icon, tooltip, transforms: [], visible: true, disabled: false };
    this._tableBuilder._state.actions.batchActions.items.push(item);
    return new SmzBatchMenuItemBuilder(this, null, item);
  }

  public separator(): SmzBatchMenuBuilder {
    this._tableBuilder._state.actions.batchActions.items.push({ separator: true });
    return this;
  }

  public get table(): SmzTableBuilder {
    return this._tableBuilder;
  }

}

export class SmzBatchMenuItemBuilder {
  constructor(private _menuBuilder: SmzBatchMenuBuilder, private _parent: SmzBatchMenuItemBuilder, private _item: SmzMenuItem) {

  }

  public addChild(label: string, icon: string = null): SmzBatchMenuItemBuilder {
    if (this._item.items == null) {
      this._item.items = [];
    }
    const item: SmzMenuItem = { label, icon, transforms: [] };
    this._item.items.push(item);

    return new SmzBatchMenuItemBuilder(this._menuBuilder, this, item);
  }

  public setCallback<T>(callback: (item: T) => void): SmzBatchMenuItemBuilder {
    this._item.command = callback;
    return this;
  }

  public setRedirect(paths: string[]): SmzBatchMenuItemBuilder {
    this._item.routerLink = paths;
    return this;
  }

  public setVisibilityRule<T>(callback: (item: T) => boolean): SmzBatchMenuItemBuilder {
    this._item.conditional = { condition: callback, property: 'visible' };
    return this;
  }

  public setActivationRule<T>(callback: (item: T) => boolean): SmzBatchMenuItemBuilder {
    this._item.conditional = { condition: callback, property: 'disabled' };
    return this;
  }

  public hide(): SmzBatchMenuItemBuilder {
    this._item.visible = false;
    return this;
  }

  public disable(): SmzBatchMenuItemBuilder {
    this._item.disabled = true;
    return this;
  }

  public addTransformRule<T>(callback: (item: T) => Partial<MenuItem>): SmzBatchMenuItemBuilder {
    this._item.transforms.push(callback);
    return this;
  }

  public get menu(): SmzBatchMenuBuilder {
    return this._menuBuilder;
  }

  public applyChild(): SmzBatchMenuItemBuilder {
    return this._parent;
  }

}