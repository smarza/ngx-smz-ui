import { MenuCreation } from '../../modules/smz-layouts/core/models/menu-creation';
import { SmzMenuItem } from '../../modules/smz-menu/models/smz-menu-item';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';

export class SmzMenuCreationBuilder<TGet> extends SmzBuilderUtilities<SmzMenuCreationBuilder<TGet>> {
  protected that = this;
  constructor(private _builder: TGet, private _items: MenuCreation[] = []) {
    super();
  }

  public item(label: string, icon: string = null, tooltip: string = null): SmzMenuCreationItemBuilder<TGet> {
    const item: SmzMenuItem = { label, icon, tooltip, transforms: [], visible: true, disabled: false };
    this._items.push(item);
    return new SmzMenuCreationItemBuilder(this, null, item);
  }

  public get back(): TGet {
    return this._builder;
  }

  public build(): SmzMenuItem[] {
    return this._items;
  }

}

export class SmzMenuCreationItemBuilder<TGet> {
  constructor(private _menuBuilder: SmzMenuCreationBuilder<TGet>, private _parent: SmzMenuCreationItemBuilder<TGet>, private _item: MenuCreation) {

  }

  public addChild(label: string, icon: string = null): SmzMenuCreationItemBuilder<TGet> {
    if (this._item.items == null) {
      this._item.items = [];
    }
    // const item: MenuCreation = { label, icon, transforms: [] };
    const item: MenuCreation = { label, icon, claims: [] };
    this._item.items.push(item);

    return new SmzMenuCreationItemBuilder(this._menuBuilder, this, item);
  }

  public setCallback<T>(callback: (item: T) => void): SmzMenuCreationItemBuilder<TGet> {
    this._item.command = callback;
    return this;
  }

  public setRedirect(paths: string[]): SmzMenuCreationItemBuilder<TGet> {
    this._item.routerLink = paths;
    return this;
  }

  public hasClaimAccess(claim: string): SmzMenuCreationItemBuilder<TGet> {
    this._item.claims.push(claim);
    return this;
  }

  // public setVisibilityRule<T>(callback: (item: T) => boolean): SmzMenuCreationItemBuilder {
  //   this._item.conditional = { condition: callback, property: 'visible' };
  //   return this;
  // }

  // public setActivationRule<T>(callback: (item: T) => boolean): SmzMenuCreationItemBuilder {
  //   this._item.conditional = { condition: callback, property: 'disabled' };
  //   return this;
  // }

  public hide(): SmzMenuCreationItemBuilder<TGet> {
    this._item.visible = false;
    return this;
  }

  public disable(): SmzMenuCreationItemBuilder<TGet> {
    this._item.disabled = true;
    return this;
  }

  // public addTransformRule<T>(callback: (item: T) => Partial<MenuItem>): SmzMenuCreationItemBuilder {
  //   this._item.transforms.push(callback);
  //   return this;
  // }

  // public askForConfirmation(title: string, message: string): SmzMenuCreationItemBuilder {
  //   this._item.confirmable = {
  //     title,
  //     message,
  //     isCritical: false
  //   };
  //   return this;
  // }

  // public askForCriticalConfirmation(title: string, message: string): SmzMenuCreationItemBuilder {
  //   this._item.confirmable = {
  //     title,
  //     message,
  //     isCritical: true
  //   };
  //   return this;
  // }

  public get menu(): SmzMenuCreationBuilder<TGet> {
    return this._menuBuilder;
  }

  public applyChild(): SmzMenuCreationItemBuilder<TGet> {
    return this._parent;
  }

}