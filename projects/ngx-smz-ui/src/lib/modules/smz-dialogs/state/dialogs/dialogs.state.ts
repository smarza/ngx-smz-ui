import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';

import { DialogsActions } from './dialogs.actions';
import { SmzDialogsService } from '../../services/smz-dialogs.service';
import { SmzDialog } from '../../models/smz-dialogs';
import { SmzPresets } from '../../models/smz-presets';
import { DialogService } from 'primeng/dynamicdialog';
import { SmzFormsResponse } from '../../../smz-forms/models/smz-forms';
import { InputListDialogCrudComponent } from '../../../smz-forms/components/input-list/input-list-dialog-crud.component';
import { DialogCrudStateService } from './dialog-crud-state.service';

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
  constructor(private dialogs: SmzDialogsService, public dialogService: DialogService, public dialogCrudService: DialogCrudStateService) { }


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

  @Action(DialogsActions.ConfirmOnEnter)
  public onConfirmOnEnter(ctx: StateContext<DialogsStateModel>, action: DialogsActions.ConfirmOnEnter): void {

    const topDialogId = this.dialogs.dialogRefs[this.dialogs.dialogRefs.length - 1].id;

    if (topDialogId === action.dialogId) {
        // console.log('me', this.dialogId);

        if (action.delayConfirmationRate != null) {
            setTimeout(() => {
              action.element.nativeElement.dispatchEvent(new Event(action.targetEventClick));
            }, action.delayConfirmationRate);
        }
        else {
            action.element.nativeElement.dispatchEvent(new Event(action.targetEventClick));
        }
    }

  }

  @Action(DialogsActions.ShowInputListCreationCrudDialog)
  public onShowInputListCreationCrudDialog(ctx: StateContext<DialogsStateModel>, action: DialogsActions.ShowInputListCreationCrudDialog): void {

    const ref = this.dialogService.open(InputListDialogCrudComponent, {
      header: action.title,
      width: '50%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000,
      data: { input: action.input, value: action.value }
    })

    this.dialogCrudService.ref = ref;

    ref.onClose.subscribe((event: SmzFormsResponse<{ name: string }>) =>{

      if (event) {
          ctx.dispatch(new DialogsActions.ShowInputListCreationCrudDialogSuccess(true, action.value, event.data.name));
      }
      else {
        ctx.dispatch(new DialogsActions.ShowInputListCreationCrudDialogSuccess(false));
      }
    });

  }

}


