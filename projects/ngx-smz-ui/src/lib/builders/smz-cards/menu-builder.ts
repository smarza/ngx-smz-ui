import { MenuItem } from 'primeng/api';
import { SmzMenuItem } from '../../modules/smz-menu/models/smz-menu-item';
import { SmzCardsBuilder } from './state-builder';

export class SmzCardsMenuBuilder {
  public items: SmzMenuItem[] = [];
  constructor(private _cardsBuilder: SmzCardsBuilder<any>, items: SmzMenuItem[] = []) {
    this.items = items;
    _cardsBuilder._state.menu.callback = null;
  }

  public useDynamic(callback: (row: any) => SmzMenuItem[]): SmzCardsMenuBuilder {
    this._cardsBuilder._state.menu.callback = callback;
    return this;
  }

  public item(label: string, icon: string = null, tooltip: string = null): SmzMenuItemCardsBuilder {

    const item: SmzMenuItem = { label, icon, tooltip, transforms: [], visible: true, disabled: false };
    this.items.push(item);

    return new SmzMenuItemCardsBuilder(this, null, item);
  }

  public separator(): SmzCardsMenuBuilder {
    this.items.push({ separator: true });

    return this;
  }

  public get cards(): SmzCardsBuilder<any> {

    if (this._cardsBuilder._state.menu.callback == null) {
      this._cardsBuilder._state.menu.callback = () => this.items;
    }

    return this._cardsBuilder;
  }

}

export class SmzMenuItemCardsBuilder {
  constructor(private _menuBuilder: SmzCardsMenuBuilder, private _parent: SmzMenuItemCardsBuilder, private _item: SmzMenuItem) {

  }

  public addChild(label: string, icon: string = null): SmzMenuItemCardsBuilder {
    if (this._item.items == null) {
      this._item.items = [];
    }
    const item: SmzMenuItem = { label, icon, transforms: [] };
    this._item.items.push(item);

    return new SmzMenuItemCardsBuilder(this._menuBuilder, this, item);
  }

  public setCallback<T>(callback: (item: T) => void): SmzMenuItemCardsBuilder {
    this._item.command = callback;
    return this;
  }

  public setRedirect(paths: string[]): SmzMenuItemCardsBuilder {
    this._item.routerLink = paths;
    return this;
  }

  public setVisibilityRule<T>(callback: (item: T) => boolean): SmzMenuItemCardsBuilder {
    this._item.conditional = { condition: callback, property: 'visible' };
    return this;
  }

  public setActivationRule<T>(callback: (item: T) => boolean): SmzMenuItemCardsBuilder {
    this._item.conditional = { condition: callback, property: 'disabled' };
    return this;
  }

  public hide(): SmzMenuItemCardsBuilder {
    this._item.visible = false;
    return this;
  }

  public disable(): SmzMenuItemCardsBuilder {
    this._item.disabled = true;
    return this;
  }

  public addTransformRule<T>(callback: (item: T) => Partial<MenuItem>): SmzMenuItemCardsBuilder {
    this._item.transforms.push(callback);
    return this;
  }

  public get menu(): SmzCardsMenuBuilder {
    return this._menuBuilder;
  }

  public applyChild(): SmzMenuItemCardsBuilder {
    return this._parent;
  }

}