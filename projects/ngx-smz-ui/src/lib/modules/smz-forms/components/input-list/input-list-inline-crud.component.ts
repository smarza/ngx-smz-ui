import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SmzControlType, SmzListControl, SmzTextControl } from '../../models/control-types';
import { SmzForm } from '../../models/smz-forms';
import { MustBeUnique } from '../../../../../lib/common/utils/custom-validations';

@Component({
    selector: 'smz-input-list-inline-crud',
    template: `
    <ng-container *ngIf="form != null">
      <smz-form-group #formComponent [config]="form" clickStopPropagation></smz-form-group>
      <button pButton (click)="confirm()" type="button" [disabled]="!formComponent.isValid" icon="pi pi-check" label="Confirmar" styleClass="mr-2"></button>
    </ng-container>
  `,
    standalone: false
})

export class InputListInlineCrudComponent implements OnInit {
  @ViewChild('formComponent') public formComponent: any;
  @Input() public input: SmzListControl;
  @Input() public defaultValue: any;
  public form: SmzForm<any> = null;
  constructor() { }

  public ngOnInit(): void
  {
    this.form = this.createEditForm();
  }

  public createEditForm(): SmzForm<{ name: string }> {
    const textInput: SmzTextControl = {
      propertyName: 'name', name: 'nome', type: SmzControlType.TEXT, hideName: true,
      validatorsPreset: { isRequired: true },
      advancedSettings: { validators: [MustBeUnique(this.input.options)], validationMessages: [{ type: 'unique', message: 'Já existe um item com esse dado.' }] },
      template: { large: { row: 'col-12' } },
      defaultValue: this.defaultValue,
    };

    const input = this.input.crud?.inputData != null ? {
      ...this.input.crud?.inputData,
      defaultValue: this.defaultValue,
      validatorsPreset: { isRequired: true },
      advancedSettings: this.input.crud.validateForUniqueValues ?
        { validators: [MustBeUnique(this.input.options)], validationMessages: [{ type: 'unique', message: 'Já existe um item com esse dado.' }] } :
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

  }

}