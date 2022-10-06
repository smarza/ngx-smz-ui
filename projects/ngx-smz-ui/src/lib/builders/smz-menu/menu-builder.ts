import { MenuItem } from 'primeng/api';
import { SmzMenuItem } from '../../modules/smz-menu/models/smz-menu-item';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';

export class SmzMenuBuilder extends SmzBuilderUtilities<SmzMenuBuilder> {
  protected that = this;
  private _items: SmzMenuItem[] = [];
  constructor() {
    super();
  }

  public item(label: string, icon: string = null, tooltip: string = null): SmzMenuItemBuilder {
    const item: SmzMenuItem = { label, icon, tooltip, transforms: [], visible: true, disabled: false };
    this._items.push(item);
    return new SmzMenuItemBuilder(this, null, item);
  }

  public separator(): SmzMenuBuilder {
    this._items.push({ separator: true });
    return this;
  }

  public build(): SmzMenuItem[] {
    return this._items;
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

  public askForConfirmation(title: string, message: string): SmzMenuItemBuilder {
    this._item.confirmable = {
      title,
      message,
      isCritical: false
    };
    return this;
  }

  public askForCriticalConfirmation(title: string, message: string): SmzMenuItemBuilder {
    this._item.confirmable = {
      title,
      message,
      isCritical: true
    };
    return this;
  }

  public get menu(): SmzMenuBuilder {
    return this._menuBuilder;
  }

  public applyChild(): SmzMenuItemBuilder {
    return this._parent;
  }

}