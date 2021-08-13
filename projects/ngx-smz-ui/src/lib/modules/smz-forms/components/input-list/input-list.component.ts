import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { SmzControlType, SmzListControl, SmzTextControl } from '../../models/control-types';
import { SmzDialogsService } from '../../../smz-dialogs/services/smz-dialogs.service';
import { Confirmable } from '../../../smz-dialogs/decorators/confirmable.decorator';
import { SmzForm } from '../../models/smz-forms';
import { FormGroupComponent } from '../../features/form-group/form-group.component';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';

@Component({
    selector: 'smz-input-list',
    templateUrl: './input-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputListComponent {
    @ViewChild(FormGroupComponent) public formComponent: FormGroupComponent;
    @Input() public input: SmzListControl;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    public current: string = null;
    public isInlineEditingEnabled = false;
    public editForm: SmzForm<never> = null;
    constructor(private dialogs: SmzDialogsService, private cdf: ChangeDetectorRef) {
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
            this.editForm = this.createEditForm(true, option);
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

        this.dialogs.open({
            title: 'Edição',
            features: [
                {
                    type: 'form',
                    data: this.createEditForm(false, option)
                }
            ],
            dialogTemplate: { large: { row: 'col-4' }, medium: { row: 'col-6' }, extraSmall: { row: 'col-12' } },
            behaviors: { useAdvancedResponse: false, confirmOnEnter: true },
            callbacks: {
                onConfirm: (response: { name: string }) => {
                    this.confirmEdit(option, response.name);
                }
            }
        });
    }

    public onConfirmInlineEditing(option: string, response: { name: string }): void {
        this.confirmEdit(option, response.name);
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

        this.dialogs.open({
            title: 'Novo item',
            features: [
                {
                    type: 'form',
                    data: this.createEditForm(false, '')
                }
            ],
            dialogTemplate: { large: { row: 'col-4' }, medium: { row: 'col-6' }, extraSmall: { row: 'col-12' } },
            behaviors: { useAdvancedResponse: false, confirmOnEnter: true },
            callbacks: {
                onConfirm: (response: { name: string }) => {
                    // add new item
                    this.input.options = [response.name, ...this.input.options];
                    this.current = response.name;
                    // update new list to control
                    this.updateControl();
                }
            }
        });
    }

    public createEditForm(hideName: boolean, defaultValue: string): SmzForm<{ name: string }> {
        const input: SmzTextControl = {
            propertyName: 'name', name: 'Nome', type: SmzControlType.TEXT, hideName: true,
            validatorsPreset: { isRequired: true },
            advancedSettings: { validators: [unique(this.input.options)], validationMessages: [{ type: 'unique', message: 'Já existe um item com esse nome.' }] },
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

}


function move(input, from, to) {
    let numberOfDeletedElm = 1;

    const elm = input.splice(from, numberOfDeletedElm)[0];

    numberOfDeletedElm = 0;

    input.splice(to, numberOfDeletedElm, elm);
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