import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SmzControlType, SmzTextControl } from '../../models/control-types';
import { SmzForm } from '../../models/smz-forms';
import { DialogCrudStateService } from '../../../smz-dialogs/state/dialogs/dialog-crud-state.service';

@Component({
  selector: 'smz-input-list-inline-crud',
  template: `
    <ng-container *ngIf="form != null">
      <smz-form-group #formComponent [config]="form" furyClickStopPropagation></smz-form-group>
      <button pButton (click)="confirm()" type="button" [disabled]="!formComponent.isValid" icon="pi pi-check" label="Confirmar" styleClass="p-mr-2"></button>
    </ng-container>
  `,
})

export class InputListInlineCrudComponent implements OnInit {
  @ViewChild('formComponent') public formComponent: any;
  public form: SmzForm<never> = null;
  constructor(public dialogCrudService: DialogCrudStateService, public config: DynamicDialogConfig) { }

  public ngOnInit(): void
  {
    this.form = this.createEditForm(true, this.config.data.value);
  }

  public createEditForm(hideName: boolean, defaultValue: string): SmzForm<{ name: string }> {
    const input: SmzTextControl = {
        propertyName: 'name', name: 'Nome', type: SmzControlType.TEXT, hideName: true,
        validatorsPreset: { isRequired: true },
        advancedSettings: { validators: [unique(this.config.data.input.options)], validationMessages: [{ type: 'unique', message: 'Já existe um item com esse nome.' }] },
        template: { large: { row: 'col-12' } },
        defaultValue: defaultValue,
    };

    const form: SmzForm<never> = {
        formId: 'add-list-item-form',
        behaviors: { flattenResponse: false, avoidFocusOnLoad: false },
        groups: [
            {
                name: '', showName: false,
                children: [input],
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

function unique(options: string[]): ValidatorFn {
  return (control: FormControl): { [key: string]: any } => {
      const input = control.value;

      if (options.findIndex(x => x.toLowerCase() === input.toLowerCase()) !== -1) {
          return {
              'unique': true
          };
      }

      return {};
  };
}