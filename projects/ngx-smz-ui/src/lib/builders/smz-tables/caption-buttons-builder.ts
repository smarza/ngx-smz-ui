import { SmzTableBuilder } from './state-builder';
import { SmzTableCaptionButton } from '../../modules/smz-tables/models/table-column';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';

export class SmzCaptionButtonsBuilder<TData> extends SmzBuilderUtilities<SmzCaptionButtonsBuilder<TData>> {
  protected override that = this;
  constructor(protected _parent: SmzTableBuilder<TData>) {
    super();
  }

  public add(label: string, callback: () => void): SmzCaptionButtonBuilder<TData> {
    return new SmzCaptionButtonBuilder(this._parent, this, label, callback);
  }

  public get table(): SmzTableBuilder<TData> {
    return this._parent;
  }
}


export class SmzCaptionButtonBuilder<TData> {
  private _action: SmzTableCaptionButton;

  constructor(protected _table: SmzTableBuilder<TData>, protected _parent: SmzCaptionButtonsBuilder<TData>, label: string, callback?: () => void) {
    this._action = {
      icon: null,
      label,
      tooltip: null,
      visibilityCondition: () => true,
      activationCondition: () => true,
      callback,
      styleClass: '',
      claimsWithAccess: null
    };
  }

  public customAuthorize(claimsWithAccess: string): SmzCaptionButtonBuilder<TData> {
    this._action.claimsWithAccess = claimsWithAccess;
    return this;
  }

  public setIcon(icon: string): SmzCaptionButtonBuilder<TData> {
    this._action.icon = icon;
    return this;
  }

  public setStyleClass(styleClass: string): SmzCaptionButtonBuilder<TData> {
    this._action.styleClass = styleClass;
    return this;
  }

  public setTooltip(tooltip: () => string): SmzCaptionButtonBuilder<TData> {
    this._action.tooltip = tooltip;
    return this;
  }

  public setVisibility(condition: () => boolean): SmzCaptionButtonBuilder<TData> {
    this._action.visibilityCondition = condition;
    return this;
  }

  public setActivation(condition: () => boolean): SmzCaptionButtonBuilder<TData> {
    this._action.activationCondition = condition;
    return this;
  }

  public callback(callback: () => boolean): SmzCaptionButtonBuilder<TData> {

    if (this._action.callback != null) {
      throw Error('You already set the callback for this caption button.');
    }

    this._action.callback = callback;
    return this;
  }

  public get buttons(): SmzCaptionButtonsBuilder<TData> {
    this._table._state.caption.buttons.push(this._action);
    return this._parent;
  }
}