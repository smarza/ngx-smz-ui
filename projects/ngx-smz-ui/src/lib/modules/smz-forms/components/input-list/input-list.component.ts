import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { take } from 'rxjs/operators';
import { Confirmable } from '../../../smz-dialogs/decorators/confirmable.decorator';
import { DialogsActions } from '../../../smz-dialogs/state/dialogs/dialogs.actions';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzListControl } from '../../models/control-types';
import { SimpleEntity } from '../../../../../lib/common/models/simple-named-entity';
import { UUID } from 'angular2-uuid';
import { MustBeUnique } from '../../../../common/utils/custom-validations';

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

  public onClick(event: { option: SimpleEntity<any>, value: string }): void {
      this.isInlineEditingEnabled = false;
      this.editForm = null;

      this.activateActions(event.option);
  }

  public refreshOptions(): void {
    this.input.options = this.input.listBoxOptions.map(x => x.name);
}

  @Confirmable('Deseja realmente excluir esse item ?', 'Exclusão')
  public askBeforeRemove(option: SimpleEntity<any>): void {
      this.remove(option);
  }

  public remove(option: SimpleEntity<any>): void {
      // remove element from options
      this.input.listBoxOptions = this.input.listBoxOptions.filter(x => x !== option);

      // update new list to control
      this.updateControl();
  }

  public onSort(): void {
      this.input.listBoxOptions = this.input.listBoxOptions.sort((a, b) => (a.name > b.name) ? 1 : -1);

      // update new list to control
      this.updateControl();
  }

  @Confirmable('Deseja realmente excluir todos os itens da lista ?', 'Exclusão')
  public onClear(): void {
      this.input.listBoxOptions = [];

      // update new list to control
      this.updateControl();
  }

  public activateActions(option: SimpleEntity<any>): void {

      if (this.current != null) {
          this.editForm = this.createEditForm(option.name);
      }
      else {
          this.editForm = null;
      }

      // update interface
      this.cdf.markForCheck();
  }

  public moveUp(option: SimpleEntity<any>): void {
      const currentIndex = this.input.listBoxOptions.findIndex(x => x.id === option.id);

      if (currentIndex > 0) {
          // move element one position up
          move(this.input.listBoxOptions, currentIndex, currentIndex - 1);

          // update new list to control
          this.updateControl();
      }
  }

  public moveDown(option: SimpleEntity<any>): void {
      const currentIndex = this.input.listBoxOptions.findIndex(x => x.id === option.id);

      if (currentIndex < this.input.listBoxOptions.length) {
          // move element one position up
          move(this.input.listBoxOptions, currentIndex, currentIndex + 1);

          // update new list to control
          this.updateControl();
      }
  }

  public updateControl(): void {
    this.refreshOptions();
    this.control.setValue(this.input.options);

    // update interface
    this.cdf.markForCheck();
  }

  public onEdit(option: SimpleEntity<any>): void {
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

  public editWithDialog(option: SimpleEntity<any>): void {

    this.actions$.pipe(ofActionDispatched(DialogsActions.ShowInputListCreationCrudDialogSuccess), take(1)).subscribe((event: { isValid: boolean, option?: string, value?: string }) => {
        if (event.isValid)
        {
            this.confirmEdit(option, event.value);
        }
    });

    this.store.dispatch(new DialogsActions.ShowInputListCreationCrudDialog('Editar', this.input, option.name));

  }

  public onConfirmInlineEditing(option: SimpleEntity<any>): void {

    const value = this.editForm.get('value').value;

    this.confirmEdit(option, value);
    this.isInlineEditingEnabled = false;
  }

  public confirmEdit(old: SimpleEntity<any>, newName: string): void {
      // add new item
      const index = this.input.listBoxOptions.findIndex(x => x.name === old.name);
      this.input.listBoxOptions[index].name = newName;

      this.input.listBoxOptions = [...this.input.listBoxOptions];
      this.current = newName;

      // update new list to control
      this.updateControl();
  }

  public cancelEdit(): void {
      this.isInlineEditingEnabled = false;
  }

  public onAdd(): void {

    this.actions$.pipe(ofActionDispatched(DialogsActions.ShowInputListCreationCrudDialogSuccess), take(1)).subscribe((event: { isValid: boolean, option?: string, value?: any }) => {
        if (event.isValid)
        {
            // add new item
            if (this.input.crud?.insertAtBeginning) {
                this.input.listBoxOptions = [{ id: UUID.UUID(), name: event.value }, ...this.input.listBoxOptions];
            }
            else {
                this.input.listBoxOptions = [...this.input.listBoxOptions, { id: UUID.UUID(), name: event.value }];
            }

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
            if (this.input.crud?.insertAtBeginning) {
                this.input.listBoxOptions = [...event.values.map(x => ({ id: UUID.UUID(), name: x })), ...this.input.listBoxOptions];
            }
            else {
                this.input.listBoxOptions = [...this.input.listBoxOptions, ...event.values.map(x => ({ id: UUID.UUID(), name: x }))];
            }

            this.current = event.values[0];
            // update new list to control
            this.updateControl();
        }
    });

    this.store.dispatch(new DialogsActions.ShowInputListBatchCreationCrudDialog('Criar Multiplos', this.input));

  }

  public createEditForm(defaultValue: string): UntypedFormGroup {

    const form: UntypedFormGroup =  new UntypedFormGroup({
        value: new UntypedFormControl(defaultValue, [Validators.required, MustBeUnique(this.input.options)]),
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

