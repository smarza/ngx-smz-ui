import { SmzDialogCustomButton, SmzDialogTopbarButton } from '../../modules/smz-dialogs/models/smz-dialogs';
import { SmzDialogBuilder } from './dialog-builder';

export class SmzDialogButtonsBuilder<TResponse> {
  constructor(public _dialogBuilder: SmzDialogBuilder<TResponse>) {
  }

  public custom(name: string): SmzDialogCustomButtonBuilder<TResponse> {
    const button: SmzDialogCustomButton<TResponse> = { name, dependsOnValidation: false, closeDialog: false, tooltip: '', onClick: () => {} };
    this._dialogBuilder._state.customButtons.push(button);
    return new SmzDialogCustomButtonBuilder(this, button);
  }

  public showCustomFirst(): SmzDialogButtonsBuilder<TResponse> {
    this._dialogBuilder._state.customButtonsOrder = 'first';
    return this;
  }

  public confirm(name: string = null): SmzDialogConfirmButtonBuilder<TResponse> {
    if(name != null) {
      this._dialogBuilder._state.builtInButtons.confirmName = name;
    }
    return new SmzDialogConfirmButtonBuilder(this);
  }

  public cancel(name: string = null): SmzDialogCancelButtonBuilder<TResponse> {
    if(name != null) {
      this._dialogBuilder._state.builtInButtons.cancelName = name;
    }
    return new SmzDialogCancelButtonBuilder(this);
  }

  public ok(name: string = null): SmzDialogOkButtonBuilder<TResponse> {
    if(name != null) {
      this._dialogBuilder._state.builtInButtons.okName = name;
    }
    return new SmzDialogOkButtonBuilder(this);
  }

  public close(): SmzDialogCloseButtonBuilder<TResponse> {
    return new SmzDialogCloseButtonBuilder(this);
  }

  public save(name: string = null): SmzDialogSaveButtonBuilder<TResponse> {
    if(name != null) {
      this._dialogBuilder._state.builtInButtons.saveName = name;
    }
    return new SmzDialogSaveButtonBuilder(this);
  }

  public topbar(): SmzDialogTopbarButtonBuilder<TResponse> {
    return new SmzDialogTopbarButtonBuilder(this);
  }

  public get dialog(): SmzDialogBuilder<TResponse> {
    return this._dialogBuilder;
  }
}

export class SmzDialogCustomButtonBuilder<TResponse> {
  constructor(public _dialogButtonsBuilder: SmzDialogButtonsBuilder<TResponse>, private button: SmzDialogCustomButton<TResponse>) {
  }

  public dependsOnValidation(): SmzDialogCustomButtonBuilder<TResponse> {
    this.button.dependsOnValidation = true;
    return this;
  }

  public closeDialog(): SmzDialogCustomButtonBuilder<TResponse> {
    this.button.closeDialog = true;
    return this;
  }

  public hide(): SmzDialogCustomButtonBuilder<TResponse> {
    this.button.visible = false;
    return this;
  }

  public setTooltip(tooltip: string): SmzDialogCustomButtonBuilder<TResponse> {
    this.button.tooltip = tooltip;
    return this;
  }

  public disable(): SmzDialogCustomButtonBuilder<TResponse> {
    this.button.disabled = true;
    return this
  }

  public setClass(className: string): SmzDialogCustomButtonBuilder<TResponse> {
    this.button.class = className;
    return this;
  }

  public callback(callback: (data: TResponse) => void): SmzDialogCustomButtonBuilder<TResponse> {
    this.button.onClick = callback;
    return this;
  }

  public blockUi(successAction: any, erroredAction: any): SmzDialogCustomButtonBuilder<TResponse> {
    this.button.blockUi = { successAction, erroredAction };
    return this;
  }

  public get buttons(): SmzDialogButtonsBuilder<TResponse> {
    return this._dialogButtonsBuilder;
  }
}

export class SmzDialogConfirmButtonBuilder<TResponse> {
  constructor(public _dialogButtonsBuilder: SmzDialogButtonsBuilder<TResponse>) {
      this._dialogButtonsBuilder._dialogBuilder._state.behaviors.showConfirmButton = true;
  }

  public hide(): SmzDialogConfirmButtonBuilder<TResponse> {
    this._dialogButtonsBuilder._dialogBuilder._state.behaviors.showConfirmButton = false;
    return this;
  }

  public dependsOnValidation(): SmzDialogConfirmButtonBuilder<TResponse> {
    this._dialogButtonsBuilder._dialogBuilder._state.builtInButtons.confirmDependsOnValidation = true;
    return this;
  }

  public setClass(className: string): SmzDialogConfirmButtonBuilder<TResponse> {
    this._dialogButtonsBuilder._dialogBuilder._state.builtInButtons.confirmClass = className;
    return this;
  }

  public callback(callback: (data: TResponse) => void): SmzDialogConfirmButtonBuilder<TResponse> {
    this._dialogButtonsBuilder._dialogBuilder._state.callbacks.onConfirm = callback;
    return this;
  }

  public get buttons(): SmzDialogButtonsBuilder<TResponse> {
    return this._dialogButtonsBuilder;
  }
}

export class SmzDialogCancelButtonBuilder<TResponse> {
  constructor(public _dialogButtonsBuilder: SmzDialogButtonsBuilder<TResponse>) {
    this._dialogButtonsBuilder._dialogBuilder._state.behaviors.showCancelButton = true;
  }

  public hide(): SmzDialogCancelButtonBuilder<TResponse> {
    this._dialogButtonsBuilder._dialogBuilder._state.behaviors.showCancelButton = false;
    return this;
  }

  public setClass(className: string): SmzDialogCancelButtonBuilder<TResponse> {
    this._dialogButtonsBuilder._dialogBuilder._state.builtInButtons.cancelClass = className;
    return this;
  }

  public callback(callback: () => void): SmzDialogCancelButtonBuilder<TResponse> {
    this._dialogButtonsBuilder._dialogBuilder._state.callbacks.onCancel = callback;
    return this;
  }

  public get buttons(): SmzDialogButtonsBuilder<TResponse> {
    return this._dialogButtonsBuilder;
  }
}

export class SmzDialogOkButtonBuilder<TResponse> {
  constructor(public _dialogButtonsBuilder: SmzDialogButtonsBuilder<TResponse>) {
    this._dialogButtonsBuilder._dialogBuilder._state.behaviors.showOkButton = true;
  }

  public hide(): SmzDialogOkButtonBuilder<TResponse> {
    this._dialogButtonsBuilder._dialogBuilder._state.behaviors.showOkButton = false;
    return this;
  }

  public setClass(className: string): SmzDialogOkButtonBuilder<TResponse> {
    this._dialogButtonsBuilder._dialogBuilder._state.builtInButtons.okClass = className;
    return this;
  }

  public dependsOnValidation(): SmzDialogOkButtonBuilder<TResponse> {
    this._dialogButtonsBuilder._dialogBuilder._state.builtInButtons.okDependsOnValidation = true;
    return this;
  }

  public callback(callback: (data: TResponse) => void): SmzDialogOkButtonBuilder<TResponse> {
    this._dialogButtonsBuilder._dialogBuilder._state.callbacks.onOk = callback;
    return this;
  }

  public get buttons(): SmzDialogButtonsBuilder<TResponse> {
    return this._dialogButtonsBuilder;
  }
}

export class SmzDialogCloseButtonBuilder<TResponse> {
  constructor(public _dialogButtonsBuilder: SmzDialogButtonsBuilder<TResponse>) {
    this._dialogButtonsBuilder._dialogBuilder._state.behaviors.showCloseButton = true;
  }

  public hide(): SmzDialogCloseButtonBuilder<TResponse> {
    this._dialogButtonsBuilder._dialogBuilder._state.behaviors.showCloseButton = false;
    return this;
  }

  public callback(callback: () => void): SmzDialogCloseButtonBuilder<TResponse> {
    this._dialogButtonsBuilder._dialogBuilder._state.callbacks.onClose = callback;
    return this;
  }

  public get buttons(): SmzDialogButtonsBuilder<TResponse> {
    return this._dialogButtonsBuilder;
  }
}

export class SmzDialogSaveButtonBuilder<TResponse> {
  constructor(public _dialogButtonsBuilder: SmzDialogButtonsBuilder<TResponse>) {
    this._dialogButtonsBuilder._dialogBuilder._state.behaviors.showSaveButton = true;
  }

  public setClass(className: string): SmzDialogSaveButtonBuilder<TResponse> {
    this._dialogButtonsBuilder._dialogBuilder._state.builtInButtons.saveClass = className;
    return this;
  }

  public dependsOnValidation(): SmzDialogSaveButtonBuilder<TResponse> {
    this._dialogButtonsBuilder._dialogBuilder._state.builtInButtons.saveDependsOnValidation = true;
    return this;
  }

  public get buttons(): SmzDialogButtonsBuilder<TResponse> {
    return this._dialogButtonsBuilder;
  }
}

export class SmzDialogTopbarButtonBuilder<TResponse> {
  private _button: SmzDialogTopbarButton = {
    class: '',
    onClick: () => {},
    visible: true,
    tooltip: null
  };
  constructor(public _dialogButtonsBuilder: SmzDialogButtonsBuilder<TResponse>) {

  }

  public hide(): SmzDialogTopbarButtonBuilder<TResponse> {
    this._button.visible = false;
    return this;
  }

  public setCallback(callback: () => void): SmzDialogTopbarButtonBuilder<TResponse> {
    this._button.onClick = callback;
    return this;
  }

  public setIcon(icon: string): SmzDialogTopbarButtonBuilder<TResponse> {
    this._button.class = `${icon} ${this._button.class}`;
    return this;
  }

  public setClass(styleClass: string): SmzDialogTopbarButtonBuilder<TResponse> {
    this._button.class = `${styleClass} ${this._button.class}`;
    return this;
  }

  public setTooltip(tooltip: string): SmzDialogTopbarButtonBuilder<TResponse> {
    this._button.tooltip = tooltip;
    return this;
  }

  public get buttons(): SmzDialogButtonsBuilder<TResponse> {
    this._dialogButtonsBuilder.dialog._state.topbarButtons.push(this._button);
    return this._dialogButtonsBuilder;
  }
}

