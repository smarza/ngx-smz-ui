import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';

import { DialogsActions } from './dialogs.actions';
import { SmzDialogsService } from '../../services/smz-dialogs.service';
import { SmzDialog } from '../../models/smz-dialogs';
import { SmzPresets } from '../../models/smz-presets';

export interface DialogsStateModel {

}

export const getInitialState = (): DialogsStateModel => ({

});

// @dynamic
@State<DialogsStateModel>({
  name: 'dialogs',
  defaults: getInitialState()
})

@Injectable()
export class DialogsState {
  constructor(private dialogs: SmzDialogsService) { }


  @Action(DialogsActions.Message)
  public onMessage(ctx: StateContext<DialogsStateModel>, action: DialogsActions.Message): void {


    const dialog: SmzDialog<any> = {
      title: action.title,
      features: [
          { type: 'message', data: action.messages },
      ],
      behaviors: {
          showCancelButton: false,
          useAdvancedResponse: false,
          showConfirmButton: false,
          closeOnEscape: true,
          showCloseButton: false,
          showFooter: true,
          showHeader: true,
          showOkButton: true,
      },
      builtInButtons: {
          confirmDependsOnValidation: false,
          okName: 'OK'
      },
  };

  this.dialogs.open(dialog);

  }

  @Action(DialogsActions.Confirmation)
  public onConfirmation(ctx: StateContext<DialogsStateModel>, action: DialogsActions.Confirmation): void {


    const dialog: SmzDialog<any> = {
      title: action.title,
      features: [
          { type: 'message', data: action.messages },
      ],
      behaviors: {
          showCancelButton: false,
          useAdvancedResponse: false,
          showConfirmButton: false,
          closeOnEscape: true,
          showCloseButton: false,
          showFooter: true,
          showHeader: true,
          showOkButton: true,
      },
      builtInButtons: {
          confirmDependsOnValidation: false,
          okName: 'OK'
      },
      callbacks: {
        onConfirm: () =>
        {
          ctx.dispatch(new DialogsActions.ConfirmationSuccess());
        },
        onCancel: () =>
        {
          ctx.dispatch(new DialogsActions.ConfirmationFailure());
        },
        onClose: () =>
        {
          ctx.dispatch(new DialogsActions.ConfirmationFailure());
        }
      },
      presetId: action.isCritical ? SmzPresets.CriticalConfirmation : SmzPresets.Confirmation,
  };

  this.dialogs.open(dialog);

  }


}