import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { take } from 'rxjs/operators';
import { Confirmable } from '../../../smz-dialogs/decorators/confirmable.decorator';
import { DialogsActions } from '../../../smz-dialogs/state/dialogs/dialogs.actions';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzListControl } from '../../models/control-types';

@Component({
  selector: 'smz-input-list',
  templateUrl: './input-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputListComponent {
  @Input() public input: SmzListControl;
  @Input() public control: any;
  @Input() public behaviors: SmzFormsBehaviorsConfig;
  public current: string = null;
  public isInlineEditingEnabled = false;
  public editForm: UntypedFormGroup = null;
  constructor(private cdf: ChangeDetectorRef, private store: Store, private actions$: Actions, public fb: UntypedFormBuilder) {
  }

  public onClick(event: { option: string, value: string }): void {
      this.isInlineEditingEnabled = false;
      this.editForm = null;

      this.activateActions(event.option);
  }

  @Confirmable('Deseja realmente excluir esse item ?', 'Exclusão')
  public askBeforeRemove(option: string): void {
      this.remove(option);
  }

  public remove(option: string): void {
      // remove element from options
      this.input.options = this.input.options.filter(x => x !== option);

      // update new list to control
      this.updateControl();
  }

  public onSort(): void {
      this.input.options = this.input.options.sort((a, b) => (a > b) ? 1 : -1);

      // update new list to control
      this.updateControl();
  }

  @Confirmable('Deseja realmente excluir todos os itens da lista ?', 'Exclusão')
  public onClear(): void {
      this.input.options = [];

      // update new list to control
      this.updateControl();
  }

  public activateActions(option: string): void {

      if (this.current != null) {
          this.editForm = this.createEditForm(option);
      }
      else {
          this.editForm = null;
      }

      // update interface
      this.cdf.markForCheck();
  }

  public moveUp(option: string): void {
      const currentIndex = this.input.options.findIndex(x => x === option);

      if (currentIndex > 0) {
          // move element one position up
          move(this.input.options, currentIndex, currentIndex - 1);

          // update new list to control
          this.updateControl();
      }
  }

  public moveDown(option: string): void {
      const currentIndex = this.input.options.findIndex(x => x === option);

      if (currentIndex < this.input.options.length) {
          // move element one position up
          move(this.input.options, currentIndex, currentIndex + 1);

          // update new list to control
          this.updateControl();
      }
  }

  public updateControl(): void {
      this.control.setValue(this.input.options);

      // update interface
      this.cdf.markForCheck();
  }

  public onEdit(option: string): void {
      switch (this.input.editMode) {
          case 'dialog':
              this.editWithDialog(option);
              break;

          case 'inline':
              this.isInlineEditingEnabled = true;
              break;

          default:
              break;
      }
  }

  public editWithDialog(option: string): void {

    this.actions$.pipe(ofActionDispatched(DialogsActions.ShowInputListCreationCrudDialogSuccess), take(1)).subscribe((event: { isValid: boolean, option?: string, value?: string }) => {
        if (event.isValid)
        {
            this.confirmEdit(option, event.value);
        }
    });

    this.store.dispatch(new DialogsActions.ShowInputListCreationCrudDialog('Editar', this.input, option));

  }

  public onConfirmInlineEditing(option: string): void {

    const value = this.editForm.get('value').value;

    this.confirmEdit(option, value);
    this.isInlineEditingEnabled = false;
  }

  public confirmEdit(oldName: string, newName: string): void {
      // add new item
      const index = this.input.options.findIndex(x => x === oldName);
      this.input.options[index] = newName;

      this.input.options = [...this.input.options];
      this.current = newName;

      // update new list to control
      this.updateControl();
  }

  public cancelEdit(): void {
      this.isInlineEditingEnabled = false;
  }

  public onAdd(): void {

    this.actions$.pipe(ofActionDispatched(DialogsActions.ShowInputListCreationCrudDialogSuccess), take(1)).subscribe((event: { isValid: boolean, option?: string, value?: string }) => {
        if (event.isValid)
        {
            // add new item
            this.input.options = [event.value, ...this.input.options];
            this.current = event.value;
            // update new list to control
            this.updateControl();
        }
    });

    this.store.dispatch(new DialogsActions.ShowInputListCreationCrudDialog('Criar', this.input, ''));

  }

  public onAddInBatch(): void {

    this.actions$.pipe(ofActionDispatched(DialogsActions.ShowInputListBatchCreationCrudDialogSuccess), take(1)).subscribe((event: { isValid: boolean, values?: string[] }) => {
        if (event.isValid)
        {
            // add new item
            this.input.options = [...event.values, ...this.input.options];
            this.current = event.values[0];
            // update new list to control
            this.updateControl();
        }
    });

    this.store.dispatch(new DialogsActions.ShowInputListBatchCreationCrudDialog('Criar Multiplos', this.input));

  }

  public createEditForm(defaultValue: string): UntypedFormGroup {

    const form: UntypedFormGroup =  new UntypedFormGroup({
        value: new UntypedFormControl(defaultValue, [Validators.required, unique(this.input.options)]),
      });

      return form;
  }

}


function move(input, from, to) {
  let numberOfDeletedElm = 1;

  const elm = input.splice(from, numberOfDeletedElm)[0];

  numberOfDeletedElm = 0;

  input.splice(to, numberOfDeletedElm, elm);
}

function unique(options: string[]): ValidatorFn {
  return (control: UntypedFormControl): { [key: string]: any } => {
      const input = control.value;

      if (options.findIndex(x => x.toLowerCase() === input.toLowerCase()) !== -1) {
          return {
              'unique': true
          };
      }

      return {};
  };
}
