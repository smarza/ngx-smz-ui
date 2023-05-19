import { SmzTableBuilder } from './state-builder';
import { SmzTableCaptionButton } from '../../modules/smz-tables/models/table-column';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';

export class SmzCaptionButtonsBuilder extends SmzBuilderUtilities<SmzCaptionButtonsBuilder> {
  protected that = this;
  constructor(protected _parent: SmzTableBuilder) {
    super();
  }

  public add(label: string, callback: () => void): SmzCaptionButtonBuilder {
    return new SmzCaptionButtonBuilder(this._parent, this, label, callback);
  }

  public get table(): SmzTableBuilder {
    return this._parent;
  }
}


export class SmzCaptionButtonBuilder {
  private _action: SmzTableCaptionButton;

  constructor(protected _table: SmzTableBuilder, protected _parent: SmzCaptionButtonsBuilder, label: string, callback?: () => void) {
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

  public customAuthorize(claimsWithAccess: string): SmzCaptionButtonBuilder {
    this._action.claimsWithAccess = claimsWithAccess;
    return this;
  }

  public setIcon(icon: string): SmzCaptionButtonBuilder {
    this._action.icon = icon;
    return this;
  }

  public setStyleClass(styleClass: string): SmzCaptionButtonBuilder {
    this._action.styleClass = styleClass;
    return this;
  }

  public setTooltip(tooltip: () => string): SmzCaptionButtonBuilder {
    this._action.tooltip = tooltip;
    return this;
  }

  public setVisibility(condition: () => boolean): SmzCaptionButtonBuilder {
    this._action.visibilityCondition = condition;
    return this;
  }

  public setActivation(condition: () => boolean): SmzCaptionButtonBuilder {
    this._action.activationCondition = condition;
    return this;
  }

  public callback(callback: () => boolean): SmzCaptionButtonBuilder {

    if (this._action.callback != null) {
      throw Error('You already set the callback for this caption button.');
    }

    this._action.callback = callback;
    return this;
  }

  public get buttons(): SmzCaptionButtonsBuilder {
    this._table._state.caption.buttons.push(this._action);
    return this._parent;
  }
}