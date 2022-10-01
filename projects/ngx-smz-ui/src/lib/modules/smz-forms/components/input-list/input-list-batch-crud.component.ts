import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, ValidatorFn } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DialogCrudStateService } from '../../../smz-dialogs/state/dialogs/dialog-crud-state.service';
import { SmzControlType, SmzTextControl } from '../../models/control-types';
import { SmzForm } from '../../models/smz-forms';
import { FormGroupComponent } from '../../features/form-group/form-group.component';

@Component({
  selector: 'smz-input-list-dialog-crud',
  template: `
    <ng-container *ngIf="form != null">
      <div class="grid grid-nogutter items-start justify-start">
        <smz-form-group class="col" #formComponent [config]="form" clickStopPropagation></smz-form-group>
        <div class="w-full grid grid-nogutter items-start justify-end">
          <button pButton (click)="confirm()" type="button" [disabled]="!formComponent.isValid" icon="pi pi-check" label="Confirmar" styleClass="mr-2"></button>
        </div>
      </div>
    </ng-container>
  `,
})

export class InputListBatchCrudComponent implements OnInit {
  @ViewChild('formComponent') public formComponent: FormGroupComponent;
  public form: SmzForm<never> = null;
  constructor(public dialogCrudService: DialogCrudStateService, public config: DynamicDialogConfig) { }

  public ngOnInit(): void
  {
    this.form = this.createEditForm(true, this.config.data.value);
  }

  public createEditForm(hideName: boolean, defaultValue: string): SmzForm<{ names: string }> {
    const input: SmzTextControl = {
        propertyName: 'names', name: 'Nomes', type: SmzControlType.TEXT_AREA, hideName: true,
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
    const event = this.formComponent.getData<{ names: string }>();
    this.dialogCrudService.ref.close({ names: event.data.names.split('\n')});
  }

}

function unique(options: string[]): ValidatorFn {
  return (control: UntypedFormControl): { [key: string]: any } => {
      const input: string[] = control.value.split('\n');
      var hasError = false;

      input.forEach((name: string) => {
          if (options.findIndex(x => x.toLowerCase() === name.toLowerCase()) !== -1) {
            hasError = true;
          }
      });

      return hasError ? { 'unique': true } : {};

  };
}