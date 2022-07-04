import { Store } from '@ngxs/store';
import { GlobalInjector } from '../../modules/smz-dialogs/services/global-injector';
// import { showConfirmation, showDialog, showMessage, showPersistentDialog } from '../../modules/smz-dialogs/utils/dialogs';
import { SmzDialogBuilder } from './dialog-builder';
import { convertFormFeature } from './dialog-input-conversion';
import { SmzBaseUiDefinitionBuilder } from '../common/base-ui-definition-builder';

export class SmzDialogUiDefinitionBuilder<TResponse> extends SmzBaseUiDefinitionBuilder<SmzDialogUiDefinitionBuilder<TResponse>> {
  protected that = this;

  constructor(public _dialogBuilder: SmzDialogBuilder<TResponse>, private entityName: string) {
    super();
  }

  // public showPersistent(callback: any): void {
  //   showPersistentDialog(this.updateEntity, this.entityName, callback, this.uiDefinitionOptions);
  // }

  // public showConfirmation(title: string, message: string, confirmCallback: () => void): void {
  //   showConfirmation(title, message, confirmCallback);
  // }

  // public showMessage(title: string, message: string, confirmCallback: () => void): void {
  //   showMessage(title, message, confirmCallback);
  // }

  // public showDialog(title: string, confirmCallback: (data: TResponse) => void, logResult: boolean = false): void {
  //   showDialog(this.updateEntity, this.entityName, title, confirmCallback, this.uiDefinitionOptions, logResult )
  // }

  public get dialog(): SmzDialogBuilder<TResponse> {

    const store = GlobalInjector.instance.get(Store);

    const inputs = convertFormFeature(this.entityName, store, this.updateEntity, this.uiDefinitionOptions);

    this._dialogBuilder._state.features.push(inputs);

    return this._dialogBuilder;
  }

}

