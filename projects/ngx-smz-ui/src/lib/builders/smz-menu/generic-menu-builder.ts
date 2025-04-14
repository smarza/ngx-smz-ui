import { MenuItem } from 'primeng/api';
import { SmzMenuItem } from '../../modules/smz-menu/models/smz-menu-item';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';

export class SmzGenericMenuBuilder<TGet> extends SmzBuilderUtilities<SmzGenericMenuBuilder<TGet>> {
  protected override that = this;
  constructor(private _builder: TGet, private _items: SmzMenuItem[] = []) {
    super();
  }

  public item(label: string, icon: string = null, tooltip: string = null): SmzSmzMenuItemItemBuilder<TGet> {
    const item: SmzMenuItem = { label, icon, tooltip, transforms: [], visible: true, disabled: false };
    this._items.push(item);
    return new SmzSmzMenuItemItemBuilder(this, null, item);
  }

  public get back(): TGet {
    return this._builder;
  }

  public build(): SmzMenuItem[] {
    return this._items;
  }

}

export class SmzSmzMenuItemItemBuilder<TGet> {
  constructor(private _menuBuilder: SmzGenericMenuBuilder<TGet>, private _parent: SmzSmzMenuItemItemBuilder<TGet>, private _item: SmzMenuItem) {

  }

  public addChild(label: string, icon: string = null): SmzSmzMenuItemItemBuilder<TGet> {
    if (this._item.items == null) {
      this._item.items = [];
    }
    const item: SmzMenuItem = { label, icon, transforms: [] };
    this._item.items.push(item);

    return new SmzSmzMenuItemItemBuilder(this._menuBuilder, this, item);
  }

  public setCallback<T>(callback: (item: T) => void): SmzSmzMenuItemItemBuilder<TGet> {
    this._item.command = callback;
    return this;
  }

  public setRedirect(paths: string[]): SmzSmzMenuItemItemBuilder<TGet> {
    this._item.routerLink = paths;
    return this;
  }

  public hasClaimAccess(claim: string): SmzSmzMenuItemItemBuilder<TGet> {
    this._item.hasClaimAccess = claim;
    return this;
  }

  public setVisibilityRule<T>(callback: (item: T) => boolean): SmzSmzMenuItemItemBuilder<TGet> {
    this._item.conditional = { condition: callback, property: 'visible' };
    return this;
  }

  public setActivationRule<T>(callback: (item: T) => boolean): SmzSmzMenuItemItemBuilder<TGet> {
    this._item.conditional = { condition: callback, property: 'disabled' };
    return this;
  }

  public hide(): SmzSmzMenuItemItemBuilder<TGet> {
    this._item.visible = false;
    return this;
  }

  public disable(): SmzSmzMenuItemItemBuilder<TGet> {
    this._item.disabled = true;
    return this;
  }

  public addTransformRule<T>(callback: (item: T) => Partial<MenuItem>): SmzSmzMenuItemItemBuilder<TGet> {
    this._item.transforms.push(callback);
    return this;
  }

  public askForConfirmation(title: string, message: string): SmzSmzMenuItemItemBuilder<TGet> {
    this._item.confirmable = {
      title,
      message,
      isCritical: false
    };
    return this;
  }

  public askForCriticalConfirmation(title: string, message: string): SmzSmzMenuItemItemBuilder<TGet> {
    this._item.confirmable = {
      title,
      message,
      isCritical: true
    };
    return this;
  }

  public get menu(): SmzGenericMenuBuilder<TGet> {
    return this._menuBuilder;
  }

  public applyChild(): SmzSmzMenuItemItemBuilder<TGet> {
    return this._parent;
  }

}