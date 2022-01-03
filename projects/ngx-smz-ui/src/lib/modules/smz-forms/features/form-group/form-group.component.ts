import { ViewEncapsulation, Component, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControlOptions } from '@angular/forms';
import { debounceTime, takeWhile } from 'rxjs/operators';
import { InjectableDialogComponentInterface } from '../../../../common/modules/inject-content/models/injectable-dialog-component.interface';
import { SmzControlType, SmzFileControl } from '../../models/control-types';
import { SmzFormsResponse, SmzForm } from '../../models/smz-forms';
import { CONTROL_FUNCTIONS } from '../../models/control-type-functions';
import { SmzFormsManagerService } from '../../services/smz-forms-manager.service';
import { SmzDialogsConfig } from '../../../smz-dialogs/smz-dialogs.config';
import { uuidv4 } from '../../../../common/utils/utils';
import { mergeClone } from '../../../../common/utils/deep-merge';
import { NgxRbkUtilsConfig } from '../../../rbk-utils/ngx-rbk-utils.config';
import { SmzFormViewdata } from '../../models/form-viewdata';

@Component({
    selector: 'smz-form-group',
    templateUrl: './form-group.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormGroupComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy, InjectableDialogComponentInterface<SmzFormsResponse<any>> {
    public isComponentActive = true;
    public viewdata: SmzFormViewdata;
    public get isValid() { return this.viewdata?.isValid; };
    public getData<T>(): SmzFormsResponse<T> { return this.viewdata?.getData(); };
    @Input() public config: SmzForm<any>;
    @Output() public statusChanges: EventEmitter<SmzFormsResponse<any>> = new EventEmitter<SmzFormsResponse<any>>();
    @Output() public changed: EventEmitter<SmzFormsResponse<any>> = new EventEmitter<SmzFormsResponse<any>>();
    @Output() public submit: EventEmitter<SmzFormsResponse<any>> = new EventEmitter<SmzFormsResponse<any>>();
    private isFirstUpdate = true;
    private emitChanges = true;
    private originalState: string = '';
    public controlTypes = SmzControlType;
    public isInitialized = false;
    public configHasErrors = false;

    constructor(public fb: FormBuilder, private cdf: ChangeDetectorRef, public manager: SmzFormsManagerService, public configService: SmzDialogsConfig, public rbkConfig: NgxRbkUtilsConfig)
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

            const options: AbstractControlOptions = { updateOn: this.config?.behaviors?.updateOn ?? 'change' };
            this.viewdata = new SmzFormViewdata(this.config, this.fb.group(controlsConfig, options), this.manager, this.cdf);

            if (this.config._context == null) {
                this.config._context = {
                    applyGlobalStyles: null,
                    form: this.viewdata.form
                };
            }
            else {
                this.config._context.form = this.viewdata.form;
            }

            this.linkInputControls();

            setTimeout(() =>
            {
                this.viewdata.updateFormValues();

                // this.viewdata.isValid = this.viewdata.form.valid;

                const runCustomFunctionsOnLoad = this.config.behaviors?.runCustomFunctionsOnLoad ?? false;

                // Esse if garante a execução do custom behaviour na primiera inicialização, já que com o adiamento feito no status changes abaixo,
                // ele não passa mais por la
                if (runCustomFunctionsOnLoad)
                {
                    this.checkCustomFunctions();
                }
                else
                {
                    if (!this.config.behaviors?.skipEmitChangesOnLoad)
                    {
                        this.statusChanges.emit(this.getData());
                    }
                }

                // Esse timeout garante um adiamento no subscribe de status change do form para não ser executado na primeira inicialização
                setTimeout(() =>
                {

                    this.viewdata.form.statusChanges
                        .pipe(
                            debounceTime(this.config.behaviors?.debounceTime ?? 400),
                            takeWhile(() => this.isComponentActive),
                        )
                        .subscribe(() =>
                        {
                            // console.log('form statusChanges');
                            this.checkCustomFunctions();
                        });

                    this.fixRadioBug();

                    this.resetState();
                }, 0);

            }, 0);
        }, 0);
    }

    public ngOnChanges(changes: SimpleChanges): void
    {
        // console.log('ngOnChanges', changes);

        // Esse timeout garante que o init não seja chamado ao mesmo tempo do init chamado no ngOnInit
        const config = changes.config;

        setTimeout(() =>
        {
            if (config != null && config.currentValue != null && !this.isInitialized)
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
            else if (config != null && config.currentValue != null && this.viewdata?.form != null)
            {
                const newConfig: SmzForm<any> = config.currentValue;

                const runStatusChangesOnConfigUpdate = newConfig.behaviors?.runStatusChangesOnConfigUpdate;

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
                    // setTimeout(() => { this.resetState(); }, 0);
                }, 0);
            }
            else if (config != null && config.currentValue == null && config.previousValue != null)
            {
                this.viewdata.isValid = false;
                this.viewdata.hasChanges = false;
                this.cdf.markForCheck();
            }

        }, 0);

    }

    public linkInputControls(): void
    {
        for (const group of this.config.groups)
        {
            for (const input of group.children)
            {
                input._inputFormControl = this.viewdata.form.controls[input.propertyName];
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

            return null;
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

            return null;
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
                    CONTROL_FUNCTIONS[input.type].clear(this.viewdata.form.controls[input.propertyName], fileInput._clearMethod);
                }
                else
                {
                    CONTROL_FUNCTIONS[input.type].clear(this.viewdata.form.controls[input.propertyName]);
                }
            };
        };

        this.viewdata.form.markAsPristine();
    }

    /** Restaura últimos dados salvos */
    public undoChanges(): void
    {
        this.viewdata.updateFormValues();
        this.resetState();
    }

    /** Atualiza o state do formulário com seus valores atuais */
    public resetState(): void
    {
        const data = this.getData().data;
        this.originalState = JSON.stringify(data).replace(/['"]+/g, '');

        this.updateHasChanges();
    }

    /** Atualiza o hasChanges */
    public updateHasChanges(): void
    {

        const response = this.getData();

        const original = this.originalState;

        const current = JSON.stringify(response.data).replace(/['"]+/g, '');

        if (this.viewdata.hasChanges === false && original !== current) {
            this.changed.emit(response);
        }

        if (this.rbkConfig.debugMode) {
            console.group('UpdateHasChanges');
            console.log('original', original);
            console.log('current', current);
            console.log('hasChanges', original !== current);
            console.groupEnd();
        }

        this.viewdata.hasChanges = original !== current;

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
            this.viewdata.isValid = this.config.functions?.customValidator(data, this.viewdata.form);
        }
        // else
        // {
        //     this.viewdata.isValid = this.viewdata.form.valid;
        // }

        if (this.config.behaviors?.skipFunctionAfterNextEmit)
        {
            this.config.behaviors.skipFunctionAfterNextEmit = false;
        }
        else
        {
            if (this.config.functions?.customBehavior != null)
            {
                this.config.functions?.customBehavior(data, this.config, this.viewdata.form, {});
            }
        }

        if (this.emitChanges)
        {
            setTimeout(() =>
            {
                this.updateHasChanges();
                this.statusChanges.emit(this.getData());
            }, 0);
        }
        else
        {
            setTimeout(() =>
            {
                this.updateHasChanges();
            }, 0);
            this.emitChanges = true;
        }

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
                    this.viewdata.form.get(input.propertyName).valueChanges.subscribe(val => {
                        // console.log('fix');
                        this.viewdata.form.controls[input.propertyName].setValue(val, { emitEvent: false });
                      });
                }
            };
        };

    }

    public onEnter(): void
    {
        if (this.config.behaviors.submitOnEnter && this.viewdata.isValid) {
            this.submit.emit(this.getData());
        }
    }

    ngOnDestroy(): void
    {
        this.isComponentActive = false;
    }

}
