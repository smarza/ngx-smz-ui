import { MenuItem } from 'primeng/api';
import { SmzMenuItem } from '../../modules/smz-menu/models/smz-menu-item';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzTableBuilder } from './state-builder';

export class SmzMenuTableBuilder extends SmzBuilderUtilities<SmzMenuTableBuilder> {
  protected that = this;
  constructor(private _tableBuilder: SmzTableBuilder) {
    super();
  }

  public item(label: string = null, icon: string = null, tooltip: string = null): SmzMenuItemTableBuilder<SmzMenuTableBuilder> {
    this._tableBuilder._state.actions.menu.isVisible = true;
    const item: SmzMenuItem = { label, icon, tooltip, transforms: [], visible: true, disabled: false };
    this._tableBuilder._state.actions.menu.items.push(item);
    return new SmzMenuItemTableBuilder(this, null, item);
  }

  public separator(): SmzMenuTableBuilder {
    this._tableBuilder._state.actions.menu.items.push({ separator: true });
    return this;
  }

  public useInline(minWidth: string = 'auto'): SmzMenuTableBuilder {
    this._tableBuilder._state.actions.menu.behavior = 'inline';
    this._tableBuilder._state.actions.menu.minWidth = minWidth;
    return this;
  }

  public get table(): SmzTableBuilder {
    return this._tableBuilder;
  }

}

export class SmzMenuItemTableBuilder<TBuilder> {
  constructor(private _builder: TBuilder, private _parent: SmzMenuItemTableBuilder<TBuilder>, private _item: SmzMenuItem) {

  }

  public addChild(label: string, icon: string = null): SmzMenuItemTableBuilder<TBuilder> {
    if (this._item.items == null) {
      this._item.items = [];
    }
    const item: SmzMenuItem = { label, icon, transforms: [] };
    this._item.items.push(item);

    return new SmzMenuItemTableBuilder(this._builder, this, item);
  }

  public setCallback<T>(callback: (item: T) => void): SmzMenuItemTableBuilder<TBuilder> {
    this._item.command = callback;
    return this;
  }

  public setRedirect(paths: string[]): SmzMenuItemTableBuilder<TBuilder> {
    this._item.routerLink = paths;
    return this;
  }

  public setVisibilityRule<T>(callback: (item: T) => boolean): SmzMenuItemTableBuilder<TBuilder> {
    if (this._item.conditional != null) {
      throw Error('You can\'t call \'setVisibilityRule\' in conjunction with setActivationRule');
    }
    this._item.conditional = { condition: callback, property: 'visible' };
    return this;
  }

  public setActivationRule<T>(callback: (item: T) => boolean): SmzMenuItemTableBuilder<TBuilder> {
    if (this._item.conditional != null) {
      throw Error('You can\'t call \'setActivationRule\' in conjunction with setVisibilityRule');
    }
    this._item.conditional = { condition: callback, property: 'disabled' };
    return this;
  }

  public hide(): SmzMenuItemTableBuilder<TBuilder> {
    this._item.visible = false;
    return this;
  }

  public disable(): SmzMenuItemTableBuilder<TBuilder> {
    this._item.disabled = true;
    return this;
  }

  public addTransformRule<T>(callback: (item: T) => Partial<MenuItem>): SmzMenuItemTableBuilder<TBuilder> {
    this._item.transforms.push(callback);
    return this;
  }

  public askForConfirmation(title: string, message: string): SmzMenuItemTableBuilder<TBuilder> {
    this._item.confirmable = {
      title,
      message,
      isCritical: false
    };
    return this;
  }

  public askForCriticalConfirmation(title: string, message: string): SmzMenuItemTableBuilder<TBuilder> {
    this._item.confirmable = {
      title,
      message,
      isCritical: true
    };
    return this;
  }

  public setIcon(icon: string): SmzMenuItemTableBuilder<TBuilder> {
    this._item.icon = icon;
    return this;
  }

  public setStyles(styleClass: string): SmzMenuItemTableBuilder<TBuilder> {
    this._item.styleClass = styleClass;
    return this;
  }

  public get menu(): TBuilder {
    return this._builder;
  }

  public applyChild(): SmzMenuItemTableBuilder<TBuilder> {
    return this._parent;
  }

}