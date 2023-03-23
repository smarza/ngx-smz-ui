import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SmzControlType, SmzListControl, SmzTextControl } from '../../models/control-types';
import { SmzForm } from '../../models/smz-forms';
import { DialogCrudStateService } from '../../../smz-dialogs/state/dialogs/dialog-crud-state.service';
import { MustBeUnique } from '../../../../../lib/common/utils/custom-validations';

@Component({
  selector: 'smz-input-list-inline-crud',
  template: `
    <ng-container *ngIf="form != null">
      <smz-form-group #formComponent [config]="form" clickStopPropagation></smz-form-group>
      <button pButton (click)="confirm()" type="button" [disabled]="!formComponent.isValid" icon="pi pi-check" label="Confirmar" styleClass="mr-2"></button>
    </ng-container>
  `,
})

export class InputListInlineCrudComponent implements OnInit {
  @ViewChild('formComponent') public formComponent: any;
  public form: SmzForm<any> = null;
  constructor(public dialogCrudService: DialogCrudStateService, public config: DynamicDialogConfig) { }

  public ngOnInit(): void
  {
    this.form = this.createEditForm(this.config.data.input, this.config.data.value);
  }

  public createEditForm(inputList: SmzListControl, defaultValue: any): SmzForm<{ name: string }> {
    const textInput: SmzTextControl = {
      propertyName: 'name', name: 'nome', type: SmzControlType.TEXT, hideName: true,
      validatorsPreset: { isRequired: true },
      advancedSettings: { validators: [MustBeUnique(this.config.data.input.options)], validationMessages: [{ type: 'unique', message: 'Já existe um item com esse dado.' }] },
      template: { large: { row: 'col-12' } },
      defaultValue: defaultValue,
    };

    const input = inputList.crud?.inputData != null ? {
      ...inputList.crud?.inputData,
      defaultValue: defaultValue,
      validatorsPreset: { isRequired: true },
      advancedSettings: inputList.crud.validateForUniqueValues ?
        { validators: [MustBeUnique(this.config.data.input.options)], validationMessages: [{ type: 'unique', message: 'Já existe um item com esse dado.' }] } :
        { validators: [], validationMessages: [] }
    } : null;

    const form: SmzForm<never> = {
        formId: 'add-list-item-form',
        behaviors: { flattenResponse: false, avoidFocusOnLoad: false },
        groups: [
            {
                name: '', showName: false,
                children: [input ?? textInput],
                template: { large: { row: 'col-12' } }
            }
        ],
    };

    return form;
  }

  public confirm(): void
  {
    this.dialogCrudService.ref.close(this.formComponent.getData());
  }

}