import { MenuItem } from 'primeng/api';
import { SmzMenuItem } from '../../modules/smz-menu/models/smz-menu-item';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzTableBuilder } from './state-builder';

export class SmzMenuTableBuilder<TData, TMappedData> extends SmzBuilderUtilities<SmzMenuTableBuilder<TData, TMappedData>> {
  protected that = this;
  constructor(private _tableBuilder: SmzTableBuilder<TData>) {
    super();
  }

  public item(label: string = null, icon: string = null, tooltip: string = null): SmzMenuItemTableBuilder<SmzMenuTableBuilder<TData, TMappedData>, TData, TMappedData> {
    this._tableBuilder._state.actions.menu.isVisible = true;
    const item: SmzMenuItem = { label, icon, tooltip, transforms: [], visible: true, disabled: false };
    this._tableBuilder._state.actions.menu.items.push(item);
    return new SmzMenuItemTableBuilder<SmzMenuTableBuilder<TData, TMappedData>, TData, TMappedData>(this, null, item);
  }

  public separator(): SmzMenuTableBuilder<TData, TMappedData> {
    this._tableBuilder._state.actions.menu.items.push({ separator: true });
    return this;
  }

  public useInline(minWidth: string = 'auto'): SmzMenuTableBuilder<TData, TMappedData> {
    this._tableBuilder._state.actions.menu.behavior = 'inline';
    this._tableBuilder._state.actions.menu.minWidth = minWidth;
    return this;
  }

  public get table(): SmzTableBuilder<TData> {
    return this._tableBuilder;
  }

}

export class SmzMenuItemTableBuilder<TBuilder, TData, TMappedData = TData> extends SmzBuilderUtilities<SmzMenuItemTableBuilder<TBuilder, TData, TMappedData>> {
  protected that = this;
  constructor(private _builder: TBuilder, private _parent: SmzMenuItemTableBuilder<TBuilder, TData, TMappedData>, private _item: SmzMenuItem) {
    super();
  }

  public addChild(label: string, icon: string = null): SmzMenuItemTableBuilder<TBuilder, TData, TMappedData> {
    if (this._item.items == null) {
      this._item.items = [];
    }
    const item: SmzMenuItem = { label, icon, transforms: [] };
    this._item.items.push(item);

    return new SmzMenuItemTableBuilder(this._builder, this, item);
  }

  public setCallback(callback: (item: TMappedData) => void): SmzMenuItemTableBuilder<TBuilder, TData, TMappedData> {
    this._item.command = callback;
    return this.that;
  }

  public setRedirect(paths: string[]): SmzMenuItemTableBuilder<TBuilder, TData, TMappedData> {
    this._item.routerLink = paths;
    return this.that;
  }

  public setVisibilityRule(callback: (item: TMappedData) => boolean): SmzMenuItemTableBuilder<TBuilder, TData, TMappedData> {
    if (this._item.conditional != null) {
      throw Error('You can\'t call \'setVisibilityRule\' in conjunction with setActivationRule');
    }
    this._item.conditional = { condition: callback, property: 'visible' };
    return this.that;
  }

  public setActivationRule(callback: (item: TMappedData) => boolean): SmzMenuItemTableBuilder<TBuilder, TData, TMappedData> {
    if (this._item.conditional != null) {
      throw Error('You can\'t call \'setActivationRule\' in conjunction with setVisibilityRule');
    }
    this._item.conditional = { condition: callback, property: 'disabled' };
    return this.that;
  }

  public hide(): SmzMenuItemTableBuilder<TBuilder, TData, TMappedData> {
    this._item.visible = false;
    return this.that;
  }

  public disable(): SmzMenuItemTableBuilder<TBuilder, TData, TMappedData> {
    this._item.disabled = true;
    return this.that;
  }

  public addTransformRule<T>(callback: (item: T) => Partial<MenuItem>): SmzMenuItemTableBuilder<TBuilder, TData, TMappedData> {
    this._item.transforms.push(callback);
    return this.that;
  }

  public setDataMapping(callback: (item: TData) => TMappedData): SmzMenuItemTableBuilder<TBuilder, TData, TMappedData> {
    this._item.dataMap = callback;
    return this.that;
  }

  public askForConfirmation(title: string, message: string): SmzMenuItemTableBuilder<TBuilder, TData, TMappedData> {
    this._item.confirmable = {
      title,
      message,
      isCritical: false
    };
    return this.that;
  }

  public askForCriticalConfirmation(title: string, message: string): SmzMenuItemTableBuilder<TBuilder, TData, TMappedData> {
    this._item.confirmable = {
      title,
      message,
      isCritical: true
    };
    return this.that;
  }

  public setIcon(icon: string): SmzMenuItemTableBuilder<TBuilder, TData, TMappedData> {
    this._item.icon = icon;
    return this.that;
  }

  public setStyles(styleClass: string): SmzMenuItemTableBuilder<TBuilder, TData, TMappedData> {
    this._item.styleClass = styleClass;
    return this.that;
  }

  public setTooltip(message: string): SmzMenuItemTableBuilder<TBuilder, TData, TMappedData> {
    this._item.tooltip = message;
    return this.that;
  }

  public get menu(): TBuilder {
    return this._builder;
  }

  public applyChild(): SmzMenuItemTableBuilder<TBuilder, TData, TMappedData> {
    return this._parent;
  }

}