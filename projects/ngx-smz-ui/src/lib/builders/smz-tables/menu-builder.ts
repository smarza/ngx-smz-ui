import { MenuItem } from 'primeng/api';
import { SmzMenuItem } from '../../modules/smz-menu/models/smz-menu-item';
import { SmzTableBuilder } from './state-builder';

export class SmzMenuTableBuilder {
  constructor(private _tableBuilder: SmzTableBuilder) {

  }

  public item(label: string, icon: string = null, tooltip: string = null): SmzMenuItemTableBuilder {
    if (!this._tableBuilder._state.actions.menu.isVisible) this._tableBuilder._state.actions.customActions.columnWidth += 80;
    this._tableBuilder._state.actions.menu.isVisible = true;
    const item: SmzMenuItem = { label, icon, tooltip, transforms: [], visible: true, disabled: false };
    this._tableBuilder._state.actions.menu.items.push(item);
    return new SmzMenuItemTableBuilder(this, null, item);
  }

  public separator(): SmzMenuTableBuilder {
    this._tableBuilder._state.actions.menu.items.push({ separator: true });
    return this;
  }

  public get table(): SmzTableBuilder {
    return this._tableBuilder;
  }

}

export class SmzMenuItemTableBuilder {
  constructor(private _menuBuilder: SmzMenuTableBuilder, private _parent: SmzMenuItemTableBuilder, private _item: SmzMenuItem) {

  }

  public addChild(label: string, icon: string = null): SmzMenuItemTableBuilder {
    if (this._item.items == null) {
      this._item.items = [];
    }
    const item: SmzMenuItem = { label, icon, transforms: [] };
    this._item.items.push(item);

    return new SmzMenuItemTableBuilder(this._menuBuilder, this, item);
  }

  public setCallback<T>(callback: (item: T) => void): SmzMenuItemTableBuilder {
    this._item.command = callback;
    return this;
  }

  public setRedirect(paths: string[]): SmzMenuItemTableBuilder {
    this._item.routerLink = paths;
    return this;
  }

  public setVisibilityRule<T>(callback: (item: T) => boolean): SmzMenuItemTableBuilder {
    this._item.conditional = { condition: callback, property: 'visible' };
    return this;
  }

  public setActivationRule<T>(callback: (item: T) => boolean): SmzMenuItemTableBuilder {
    this._item.conditional = { condition: callback, property: 'disabled' };
    return this;
  }

  public hide(): SmzMenuItemTableBuilder {
    this._item.visible = false;
    return this;
  }

  public disable(): SmzMenuItemTableBuilder {
    this._item.disabled = true;
    return this;
  }

  public addTransformRule<T>(callback: (item: T) => Partial<MenuItem>): SmzMenuItemTableBuilder {
    this._item.transforms.push(callback);
    return this;
  }

  public get menu(): SmzMenuTableBuilder {
    return this._menuBuilder;
  }

  public applyChild(): SmzMenuItemTableBuilder {
    return this._parent;
  }

}