import { MenuItem } from 'primeng/api';
import { SmzMenuItem } from '../models/conditional-menu-item';
import { SmzTableBuilder } from './state-builder';

export class SmzMenuBuilder {
  constructor(private _tableBuilder: SmzTableBuilder) {

  }

  public item(label: string, icon: string = null): SmzMenuItemBuilder {
    if (!this._tableBuilder._state.actions.menu.isVisible) this._tableBuilder._state.actions.customActions.columnWidth += 80;
    this._tableBuilder._state.actions.menu.isVisible = true;
    const item: SmzMenuItem = { label, icon, transforms: [], visible: true, disabled: false };
    this._tableBuilder._state.actions.menu.items.push(item);
    return new SmzMenuItemBuilder(this, null, item);
  }

  public separator(): SmzMenuBuilder {
    this._tableBuilder._state.actions.menu.items.push({ separator: true });
    return this;
  }

  public get table(): SmzTableBuilder {
    return this._tableBuilder;
  }

}

export class SmzMenuItemBuilder {
  constructor(private _menuBuilder: SmzMenuBuilder, private _parent: SmzMenuItemBuilder, private _item: SmzMenuItem) {

  }

  public addChild(label: string, icon: string = null): SmzMenuItemBuilder {
    if (this._item.items == null) {
      this._item.items = [];
    }
    const item: SmzMenuItem = { label, icon, transforms: [] };
    this._item.items.push(item);

    return new SmzMenuItemBuilder(this._menuBuilder, this, item);
  }

  public setCallback<T>(callback: (item: T) => void): SmzMenuItemBuilder {
    this._item.command = callback;
    return this;
  }

  public setRedirect(paths: string[]): SmzMenuItemBuilder {
    this._item.routerLink = paths;
    return this;
  }

  public setVisibilityRule<T>(callback: (item: T) => boolean): SmzMenuItemBuilder {
    this._item.conditional = { condition: callback, property: 'visible' };
    return this;
  }

  public setActivationRule<T>(callback: (item: T) => boolean): SmzMenuItemBuilder {
    this._item.conditional = { condition: callback, property: 'disabled' };
    return this;
  }

  public hide(): SmzMenuItemBuilder {
    this._item.visible = false;
    return this;
  }

  public disable(): SmzMenuItemBuilder {
    this._item.disabled = true;
    return this;
  }

  public addTransformRule<T>(callback: (item: T) => Partial<MenuItem>): SmzMenuItemBuilder {
    this._item.transforms.push(callback);
    return this;
  }

  public get menu(): SmzMenuBuilder {
    return this._menuBuilder;
  }

  public applyChild(): SmzMenuItemBuilder {
    return this._parent;
  }

}