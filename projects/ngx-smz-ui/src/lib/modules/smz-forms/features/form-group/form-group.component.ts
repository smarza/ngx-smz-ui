import { ViewEncapsulation, Component, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, ValidatorFn, FormControl } from '@angular/forms';
import { debounceTime, takeWhile } from 'rxjs/operators';
import { InjectableDialogComponentInterface } from '../../../../common/modules/inject-content/models/injectable-dialog-component.interface';
import { SmzControlType, SmzFileControl, SmzListControl, SmzTextControl } from '../../models/control-types';
import { SmzFormsResponse, SmzForm } from '../../models/smz-forms';
import { CONTROL_FUNCTIONS } from '../../models/control-type-functions';
import { SmzFormsManagerService } from '../../services/smz-forms-manager.service';
import { SmzDialogsConfig } from '../../../smz-dialogs/smz-dialogs.config';
import { uuidv4 } from '../../../../common/utils/utils';
import { mergeClone } from '../../../../common/utils/deep-merge';
import { Confirmable } from '../../../smz-dialogs/decorators/confirmable.decorator';
import { SmzDialogsService } from '../../../smz-dialogs/services/smz-dialogs.service';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';


@Component({
    selector: 'smz-form-group',
    templateUrl: './form-group.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class FormGroupComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy, InjectableDialogComponentInterface<SmzFormsResponse<any>> {
    public isComponentActive = true;
    public form: FormGroup;
    //** isValid corresponde ao valid do formulário ou customValidator caso aja; Atualizada em toda mudança de status do formulário */
    public isValid = false;
    /** hasChanges ocorre quando os valores do formulário são diferentes do último state salvo. */
    public hasChanges = false;
    @Input() public config: SmzForm<any>;
    @Output() public statusChanges: EventEmitter<SmzFormsResponse<any>> = new EventEmitter<SmzFormsResponse<any>>();
    @Output() public submit: EventEmitter<SmzFormsResponse<any>> = new EventEmitter<SmzFormsResponse<any>>();
    private isFirstUpdate = true;
    private emitChanges = true;
    private originalState: string = '';
    public controlTypes = SmzControlType;
    public isInitialized = false;
    public configHasErrors = false;

    constructor(public fb: FormBuilder, private cdf: ChangeDetectorRef, public manager: SmzFormsManagerService, public configService: SmzDialogsConfig)
    {

    }

    public ngOnInit(): void
    {
        if (this.config != null)
        {
            if (this.hasUndefinedPropertyName() || this.hasDuplicateNames())
            {
                this.configHasErrors = true;
            }
            else
            {
                // PRIMEIRA ALTERAÇÃO
                this.init();
                this.configHasErrors = false;
            }
        }
    }

    public init(): void
    {
        this.isInitialized = true;

        setTimeout(() =>
        {
            if (this.config.formId == null) this.config.formId = uuidv4();
            // console.log(this.config);
            const controlsConfig = {};

            if (this.config._context == null || this.config._context?.applyGlobalStyles)
            {
                this.manager.setupGlobalStyles();
            }

            // SETUP FORM TEMPLATES
            this.config.template = this.manager.setupTemplate(this.config.template, this.configService.forms.formTemplates);

            this.config.behaviors = { ...this.configService.forms.behaviors, ...this.config.behaviors };

            for (const group of this.config.groups)
            {
                // SETUP GROUP TEMPLATES
                group.template = this.manager.setupTemplate(group.template, this.configService.forms.groupTemplates);

                // SETUP INPUT PRESETS
                for (let index = 0; index < group.children.length; index++)
                {
                    const presetControlType = this.configService.forms?.controlTypes[group.children[index].type];

                    if (group.children[index].isVisible != null && presetControlType != null && presetControlType.isVisible != null)
                    {
                        group.children[index].isVisible = group.children[index].isVisible == null ? true : group.children[index].isVisible;
                    }

                    group.children[index].isVisible = group.children[index].isVisible == null ? true : group.children[index].isVisible;

                    if (presetControlType != null)
                    {
                        // console.log(presetControlType, group.children[index]);
                        const child = group.children[index];
                        const inputRef = group.children[index]._inputFormControl;
                        group.children[index] = {
                            ...mergeClone(presetControlType, { ...group.children[index], _inputFormControl: null }),
                            _inputFormControl: inputRef
                        };

                        if (group.children[index]?.advancedSettings?.validators?.length > 0) {
                            group.children[index].advancedSettings.validators = child.advancedSettings.validators;
                        }
                    }
                }

                for (const input of group.children)
                {
                    // SETUP INPUT TEMPLATES
                    input.template = this.manager.setupTemplate(input.template, this.configService.forms.inputTemplates);

                    const validators = this.manager.getValidators(input);
                    const validationMessages = this.manager.getValidatorsMessages(input);

                    if (input.advancedSettings == null) input.advancedSettings = {};
                    input.advancedSettings.validationMessages = validationMessages;

                    CONTROL_FUNCTIONS[input.type].initialize(input, this.configService);
                    controlsConfig[input.propertyName] = ['', validators, input.advancedSettings.asyncValidators];

                    if (input.type === SmzControlType.DROPDOWN)
                    {
                        setTimeout(() =>
                        {
                            this.manager.setupDropdownServices(input as any, this.config);
                        }, 0);
                    }
                    else if (input.type === SmzControlType.LINKED_DROPDOWN)
                    {
                        setTimeout(() =>
                        {
                            this.manager.setupLinkedDropdownServices(input as any, this.config);
                        }, 0);
                    }
                    else if (input.type === SmzControlType.LINKED_MULTISELECT)
                    {
                        setTimeout(() =>
                        {
                            this.manager.setupLinkedDropdownServices(input as any, this.config);
                        }, 0);
                    }

                    this.manager.setupVisibilityServices(input, this.config);
                };
            };

            this.form = this.fb.group(controlsConfig);

            if (this.config._context == null) {
                this.config._context = {
                    applyGlobalStyles: null,
                    form: this.form
                };
            }
            else {
                this.config._context.form = this.form;
            }

            this.linkInputControls();

            setTimeout(() =>
            {
                this.updateFormValues();

                // this.isValid = this.form.valid;

                const runCustomFunctionsOnLoad = this.config.behaviors?.runCustomFunctionsOnLoad ?? false;

                // Esse if garante a execução do custom behaviour na primiera inicialização, já que com o adiamento feito no status changes abaixo,
                // ele não passa mais por la
                if (runCustomFunctionsOnLoad)
                {
                    this.checkCustomFunctions();
                }
                else
                {
                    this.statusChanges.emit(this.getData());
                }

                // Esse timeout garante um adiamento no subscribe de status change do form para não ser executado na primeira inicialização
                setTimeout(() =>
                {

                    this.form.statusChanges
                        .pipe(
                            debounceTime(this.config.behaviors?.debounceTime ?? 400),
                            takeWhile(() => this.isComponentActive),
                        )
                        .subscribe(() =>
                        {
                            this.checkCustomFunctions();
                        });

                    this.fixRadioBug();
                }, 0);

            }, 0);
        }, 0);
    }

    public ngOnChanges(changes: SimpleChanges): void
    {
        // console.log('ngOnChanges', changes);

        // Esse timeout garante que o init não seja chamado ao mesmo tempo do init chamado no ngOnInit
        setTimeout(() =>
        {
            if (changes.config != null && changes.config.currentValue != null && !this.isInitialized)
            {
                if (this.hasUndefinedPropertyName() || this.hasDuplicateNames())
                {
                    this.configHasErrors = true;
                }
                else
                {
                    // PRIMEIRA ALTERAÇÃO
                    this.init();
                    this.configHasErrors = false;
                }
            }
            else if (changes.config != null && changes.config.currentValue != null && this.form != null)
            {
                const config: SmzForm<any> = changes.config.currentValue;

                const runStatusChangesOnConfigUpdate = config.behaviors?.runStatusChangesOnConfigUpdate;

                if (runStatusChangesOnConfigUpdate || this.isFirstUpdate)
                {
                    this.emitChanges = true;
                    this.isFirstUpdate = false;
                }
                else
                {
                    this.emitChanges = false;
                }

                setTimeout(() =>
                {
                    this.init();
                    setTimeout(() => { this.resetState(); }, 0);
                }, 0);
            }
        }, 0);

    }

    public linkInputControls(): void
    {
        for (const group of this.config.groups)
        {
            for (const input of group.children)
            {
                input._inputFormControl = this.form.controls[input.propertyName];
            };
        };
    }

    private hasUndefinedPropertyName(): boolean
    {
        try
        {
            const match = this.config.groups.findIndex(x =>
            {
                const response = x.children.findIndex(c =>
                {
                    return c.propertyName == null || c.propertyName === '';
                });

                return response === -1;
            });

            if (match === -1)
            {
                console.error('Um ou mais Inputs não possuem propertyName', this.config.groups);
                return true;
            }

            return false;

        } catch (error)
        {
            console.error('Um ou mais Inputs não possuem propertyName', this.config.groups);
        }

    }

    private hasDuplicateNames(): boolean
    {
        try
        {
            const inputs = [];

            for (const group of this.config.groups)
            {
                for (const input of group.children)
                {
                    inputs.push(input);
                };
            };

            const valueArr = inputs.map((item) => (item.propertyName));
            const results = valueArr.some((item, idx) => (valueArr.indexOf(item) != idx));

            if (results) console.error('Não é permitido inputs com o mesmo propertyName', valueArr, this.config.groups);

            return results;

        } catch (error)
        {
            console.error('Um ou mais Inputs possuem problemas', this.config.groups);
        }

    }

    /** Limpa todos os valores default */
    public clearFormValues(): void
    {
        for (const group of this.config.groups)
        {
            for (const input of group.children)
            {
                if (input.type === SmzControlType.FILE)
                {
                    const fileInput = input as SmzFileControl;
                    CONTROL_FUNCTIONS[input.type].clear(this.form.controls[input.propertyName], fileInput._clearMethod);
                }
                else
                {
                    CONTROL_FUNCTIONS[input.type].clear(this.form.controls[input.propertyName]);
                }
            };
        };

        this.form.markAsPristine();
    }

    /** Restaura últimos dados salvos */
    public undoChanges(): void
    {
        this.updateFormValues();
        this.resetState();
    }

    /** Atualiza o state do formulário com seus valores atuais */
    public resetState(): void
    {
        const data = this.form.value;
        this.originalState = JSON.stringify(data).replace(/['"]+/g, '');
        this.updateHasChanges();
    }

    /** Atualiza o hasChanges */
    public updateHasChanges(): void
    {
        const data = this.form.value;

        const original = this.originalState;
        const current = JSON.stringify(data).replace(/['"]+/g, '');

        this.hasChanges = original !== current;

        this.cdf.markForCheck();
    }

    /** Atualiza os valores dos inputs com seus dados default */
    public updateFormValues(): void
    {

        for (const group of this.config.groups)
        {
            for (const input of group.children)
            {
                const control = this.form.controls[input.propertyName];

                if (input.isDisabled)
                {
                    control.disable();
                }
                else
                {
                    control.enable();
                }
                CONTROL_FUNCTIONS[input.type].updateValue(control, input);
            };
        };

        this.form.markAsPristine();
        this.cdf.markForCheck();

    }

    public ngAfterViewInit(): void
    {

    }

    private checkCustomFunctions(): void
    {
        const data = this.getData();

        if (this.config.functions?.customValidator != null)
        {
            this.isValid = this.config.functions?.customValidator(data, this.form);
        }
        // else
        // {
        //     this.isValid = this.form.valid;
        // }

        if (this.config.behaviors?.skipFunctionAfterNextEmit)
        {
            this.config.behaviors.skipFunctionAfterNextEmit = false;
        }
        else
        {
            if (this.config.functions?.customBehavior != null)
            {
                this.config.functions?.customBehavior(data, this.config, this.form, {});
            }

            if (this.emitChanges)
            {
                this.statusChanges.emit(data);
            }
            else
            {
                this.emitChanges = true;
            }
        }

        setTimeout(() =>
        {
            this.updateHasChanges();
        }, 0);

    }

    private fixRadioBug(): void
    {

        // https://github.com/primefaces/primeng/pull/9265
        // https://stackblitz.com/edit/primengdemo-rh51xa?file=src%2Fapp%2Fapp.component.ts
        // https://stackoverflow.com/questions/64827771/primeng-radio-button-selecting-multiple-items

        for (const group of this.config.groups)
        {
            for (const input of group.children)
            {
                if (input.type === SmzControlType.RADIO)
                {
                    this.form.get(input.propertyName).valueChanges.subscribe(val => {
                        // console.log('fix');
                        this.form.controls[input.propertyName].setValue(val, { emitEvent: false });
                      });
                }
            };
        };

    }

    /** Retorna o objeto com os valores dos inputs; Esse objeto seguirá a nomemclatura do campo name de cada inputConfig */
    public getData<T>(): SmzFormsResponse<T>
    {
        // console.log('--------------------------');
        // console.log('--------------------------');
        // console.log('--------------------------');
        const data: T = {} as T;
        const response: SmzFormsResponse<T> = { data, isValid: true };
        const formFlattenResponse = this.config.behaviors?.flattenResponse ?? false;

        for (const group of this.config.groups)
        {
            for (const input of group.children)
            {
                if (input.advancedSettings == null || !input.advancedSettings.excludeFromResponse)
                {
                    const value = CONTROL_FUNCTIONS[input.type].getValue(this.form, input, formFlattenResponse);

                    // console.log(input);
                    if (input.visibilityDependsOn == null || input.isVisible)
                    {
                        // console.log(`${input.propertyName}`, input._inputFormControl.valid);
                        if (input.isDisabled)
                        {
                            // Forçando a validação para true porque o campo esta desabilitado
                            response.isValid = response.isValid && true;
                        }
                        else
                        {
                            // Refletindo a validação do angular na resposta
                            response.isValid = response.isValid && input._inputFormControl.valid;
                        }
                        response.data = { ...response.data, ...value };
                    }
                }

            };
        };

        this.isValid = response.isValid;

        return response;

    }

    public onEnter(): void
    {
        if (this.config.behaviors.submitOnEnter && this.isValid) {
            this.submit.emit(this.getData());
        }
    }

    ngOnDestroy(): void
    {
        this.isComponentActive = false;
    }

}


@Component({
    selector: 'smz-input-list',
    templateUrl: '../../components/input-list/input-list.component.html',
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
