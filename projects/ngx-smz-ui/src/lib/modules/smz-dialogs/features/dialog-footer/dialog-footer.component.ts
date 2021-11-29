import { ChangeDetectorRef, Component, Directive, ElementRef, HostListener, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SmzDynamicDialogConfig, SmzDialogCustomButton } from '../../models/smz-dialogs';
import { DynamicDialogRef } from '../../dynamicdialog/dynamicdialog-ref';
import { SmzDialogsConfig } from '../../smz-dialogs.config';
import { SmzDialogsVisibilityService } from '../../services/smz-dialogs-visibility.service';
import { Actions, ofActionErrored, ofActionSuccessful, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { FormGroupComponent } from '../../../smz-forms/features/form-group/form-group.component';
import { SmzForm } from '../../../smz-forms/models/smz-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { InjectComponentService } from '../../../../common/modules/inject-content/inject-component.service';
import { ComponentData, ComponentDataBase } from '../../../../common/modules/inject-content/models/injectable.model';
import { DialogsActions } from '../../state/dialogs/dialogs.actions';
import { NgxRbkUtilsConfig } from '../../../rbk-utils/ngx-rbk-utils.config';

@UntilDestroy()
@Component({
    selector: 'smz-dialog-footer',
    templateUrl: './dialog-footer.component.html',
    styleUrls: ['./dialog-footer.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DialogFooterComponent implements OnInit {

    constructor(
        public refService: DynamicDialogRef,
        public dialogConfig: SmzDynamicDialogConfig,
        public presets: SmzDialogsConfig,
        private visibilityService: SmzDialogsVisibilityService,
        private injectComponent: InjectComponentService,
        private cdf: ChangeDetectorRef,
        private actions$: Actions,
        private rbkConfig: NgxRbkUtilsConfig,
        private store: Store) { }

    public ngOnInit(): void {
    }

    public close(): void {
        if (this.dialogConfig.data?.callbacks?.onCancel != null) {
            this.dialogConfig.data.callbacks.onCancel();
        }

        this.refService.close();
    }

    public confirm(): void {

        const config = this.dialogConfig.data;

        const context = this.dialogConfig.data._context;

        if (context.builtInButtons.confirmDependsOnValidation && !this.onSubmit()) return;

        const response = config.behaviors.useAdvancedResponse ? config._context.advancedResponse : config._context.simpleResponse;

        if (this.dialogConfig.data?.callbacks?.onConfirm != null) {
            this.dialogConfig.data.callbacks.onConfirm(response);
        }

        setTimeout(() => {
            this.refService.close();
        }, 0);

    }

    public onSubmit(): boolean {
        if (this.isValid()) {

            if (this.rbkConfig.debugMode) {
                console.log('           onSubmit => ', true);
            }

            return true;
        }
        else {

            if (this.rbkConfig.debugMode) {
                console.log('           Forms... ');
            }

            this.dialogConfig.data.features
                .filter(x => x.type === 'form')
                .forEach(feature => {
                    const formFeature = feature.data as SmzForm<never>;
                    const form = formFeature._context.form;

                    if (this.rbkConfig.debugMode) {
                        console.log('               > formFeature:', formFeature);
                        console.log('               > form:', form);
                        console.log('               > controls:', form.controls);
                    }

                    Object.keys(form.controls).forEach(field => {
                        const control = form.get(field);
                        if (this.rbkConfig.debugMode) {
                            console.log(`               > control for ${field}:`, control);
                        }
                        control.markAsTouched({ onlySelf: true });
                    });
                });

            if (this.rbkConfig.debugMode) {
                console.log('           Components... ');
            }

            this.dialogConfig.data.features
                .filter(x => x.type === 'component')
                .forEach(feature => {
                    const componentFeature = feature.data as ComponentData;
                    // console.log('feature', componentFeature);
                    const injected = this.injectComponent.getComponent(componentFeature.componentId);

                    // console.log('injected', injected);

                    if (injected != null) {
                        const instance = injected.instance as ComponentDataBase;

                        if (instance != null) {

                            if (instance.isValid != null && instance.isValid === false) {
                                if (instance.onValidationError$ != null) {
                                    instance.onValidationError$.next(true);
                                }
                            }
                            else if (instance.isValid != null && instance.isValid === true) {
                                if (instance.onValidationError$ != null) {
                                    instance.onValidationError$.next(false);
                                }
                            }
                        }
                    }
                });

            this.cdf.markForCheck();

            if (this.rbkConfig.debugMode) {
                console.log('           onSubmit => ', false);
            }

            return false;
        }
    }

    public ok(): void {

        const config = this.dialogConfig.data;

        const context = this.dialogConfig.data._context;
        if (context.builtInButtons.okDependsOnValidation && !this.onSubmit()) return;

        const response = config.behaviors.useAdvancedResponse ? config._context.advancedResponse : config._context.simpleResponse;

        if (this.dialogConfig.data?.callbacks?.onOk != null) {
            this.dialogConfig.data.callbacks.onOk(response);
        }

        setTimeout(() => {
            this.refService.close();
        }, 0);
    }

    public save(): void {

        if (this.rbkConfig.debugMode) {
            console.groupCollapsed('Dialog Save Pressed:');
            console.log('     >> context', this.dialogConfig.data._context);
            console.log('     >> onSubmit()', this.onSubmit());
            console.log('     >> data', this.dialogConfig.data);
        }

        const context = this.dialogConfig.data._context;
        if (context.builtInButtons.saveDependsOnValidation && !this.onSubmit()) return;

        this.dialogConfig.data._context.isGlobalDisabled = true;
        this.dialogConfig.data._context.isLoading = true;
        this.dialogConfig.data._context.apiErrors = [];

        this.dialogConfig.data._context.injectables.forEach((injectable) => {
            const instance = injectable.ref.componentRef.instance;

            if (instance?.form != null) {
                const formComponent = instance as FormGroupComponent;

                formComponent.form.disable();
            }
        });

        this.cdf.markForCheck();

        if (this.dialogConfig.data?.callbacks?.onSaveAction != null) {

            const postProcessResponse = this.responsePostProcesses();

            const action = this.dialogConfig.data.callbacks.onSaveAction;

            if (this.rbkConfig.debugMode) {
                console.log('     >> postProcessResponse', postProcessResponse);
            }

            (this.store.dispatch(new action(postProcessResponse)) as Observable<any>)
                .pipe(catchError(err => {

                    if (this.rbkConfig.debugMode) {
                        console.log('     >> dispatch catchError', err);
                    }

                    const errors: string[] = err.error;

                    this.dialogConfig.data._context.apiErrors = errors.map(x => ({ severity: 'warn', summary: '', detail: x }));
                    this.dialogConfig.data._context.isGlobalDisabled = false;
                    this.dialogConfig.data._context.isLoading = false;

                    this.cdf.markForCheck();

                    this.dialogConfig.data._context.injectables.forEach((injectable) => {
                        const instance = injectable.ref.componentRef.instance;

                        if (instance?.form != null) {
                            const formComponent = instance as FormGroupComponent;

                            formComponent.form.enable();
                        }
                    });

                    return err;
                }))
                .subscribe(() => {

                    if (this.rbkConfig.debugMode) {
                        console.log('     >> dispatch subscribe');
                    }

                    this.dialogConfig.data._context.isGlobalDisabled = false;
                    this.dialogConfig.data._context.isLoading = false;
                    this.dialogConfig.data._context.apiErrors = [];

                    this.refService.close();
                });
        }

        if (this.rbkConfig.debugMode) {
            console.groupEnd();
        }

    }

    public customClick(button: SmzDialogCustomButton<any>): void {

        if (button.blockUi != null) {
            this.customClickWithBlockUi(button);
        }
        else {
            if (button.dependsOnValidation && !this.onSubmit()) return;

            const config = this.dialogConfig.data;
            const response = config.behaviors.useAdvancedResponse ? config._context.advancedResponse : config._context.simpleResponse;

            button.onClick(response);

            if (button.closeDialog) {
                this.refService.close();
            }
        }
    }

    public customClickWithBlockUi(button: SmzDialogCustomButton<any>): void {

        if (button.dependsOnValidation && !this.onSubmit()) return;

        this.dialogConfig.data._context.isGlobalDisabled = true;
        this.dialogConfig.data._context.isLoading = true;
        this.dialogConfig.data._context.apiErrors = [];

        this.dialogConfig.data._context.injectables.forEach((injectable) => {
            const instance = injectable.ref.componentRef.instance;

            if (instance?.form != null) {
                const formComponent = instance as FormGroupComponent;

                formComponent.form.disable();
            }
            else if (instance.blockUi != null) {
                instance.blockUi();
            }

        });

        this.cdf.markForCheck();

        this.actions$
            .pipe(ofActionSuccessful(button.blockUi.successAction), untilDestroyed(this), take(1))
            .subscribe(() => {
                this.dialogConfig.data._context.isGlobalDisabled = false;
                this.dialogConfig.data._context.isLoading = false;
                this.dialogConfig.data._context.apiErrors = [];

                this.refService.close();
            });

        if (button.blockUi.erroredAction != null) {

            this.actions$
                .pipe(ofActionErrored(button.blockUi.erroredAction), untilDestroyed(this), take(1))
                .subscribe((err) => {
                    console.log('ofActionErrored', err);

                    const errors: string[] = err.error;

                    this.dialogConfig.data._context.apiErrors = errors.map(x => ({ severity: 'warn', summary: '', detail: x }));
                    this.dialogConfig.data._context.isGlobalDisabled = false;
                    this.dialogConfig.data._context.isLoading = false;

                    this.cdf.markForCheck();

                    this.dialogConfig.data._context.injectables.forEach((injectable) => {
                        const instance = injectable.ref.componentRef.instance;

                        if (instance?.form != null) {
                            const formComponent = instance as FormGroupComponent;

                            formComponent.form.enable();
                        }
                        else if (instance.blockUi != null) {
                            instance.unBlockUi();
                        }

                    });

                });

        }

        const config = this.dialogConfig.data;
        const response = config.behaviors.useAdvancedResponse ? config._context.advancedResponse : config._context.simpleResponse;

        button.onClick(response);

    }

    public isValid(): boolean {
        // const isValid = this.dialogConfig.data._context.injectables.every(x => x.ref?.componentRef?.instance?.isValid);
        // console.log('----------------------- isValid', this.visibilityService);
        // console.log('--- isValid() ');
        // console.log('context', this.dialogConfig.data._context);
        let isValid = true;

        if (this.rbkConfig.debugMode) {
            console.log('           Calling isValid()');
        }

        for (const injectable of this.dialogConfig.data._context.injectables) {

            if (this.rbkConfig.debugMode) console.log('           >> injectable', injectable);

            if (injectable.visibilityDependsOn != null) {

                if (this.rbkConfig.debugMode) console.log('           >> injectable visibilityDependsOn');

                const observer = this.visibilityService.observers[injectable.componentId + injectable.component.name];

                if (this.rbkConfig.debugMode) console.log('           >> injectable observer', observer);

                const isVisible = !injectable.visibilityDependsOn.reversed && observer?.visibility$.value.state || injectable.visibilityDependsOn.reversed && !observer?.visibility$.value.state;

                if (this.rbkConfig.debugMode) console.log('           >> injectable isVisible', isVisible);

                if (this.rbkConfig.debugMode) console.log('           >> injectable componentRef isValid', injectable.ref?.componentRef?.instance?.isValid);

                if (isVisible && !injectable.ref?.componentRef?.instance?.isValid) {
                    isValid = false;
                }
            }
            else {
                // console.log('   instance isValid', injectable.ref?.componentRef?.instance?.isValid);

                if (this.rbkConfig.debugMode) {
                    console.log('           >> injectable componentRef isValid', injectable.ref?.componentRef?.instance?.isValid);
                }

                if (!injectable.ref?.componentRef?.instance?.isValid) {
                    isValid = false;
                }

            }
        }

        if (this.rbkConfig.debugMode) {
            console.log('           isValid() => ', isValid);
        }

        return isValid;
    }

    private responsePostProcesses(): any {
        const config = this.dialogConfig.data;
        const response = config.behaviors.useAdvancedResponse ? config._context.advancedResponse : config._context.simpleResponse;

        if (this.rbkConfig.debugMode) {
            console.log('     >> response', response);
        }

        return config.callbacks?.postProcessResponse != null ? config.callbacks.postProcessResponse(response) : response;
    }

}


@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[confirmOnEnter]'
})
export class ConfirmOnEnterDirective {
    @Input('confirmOnEnter') public confirmOnEnter: boolean = false;
    @Input('clickEvent') public clickEvent: string = 'onClick';
    @Input('delayConfirmation') public delayConfirmation: boolean = true;
    @Input('disabled') public disabled: boolean;
    @Input() public dialogId: string;

    constructor(private el: ElementRef, private store: Store) {
    }

    @HostListener('window:keydown', ['$event'])
    public handleKeyboardEvent(event: KeyboardEvent) {

        if (!this.disabled && event.keyCode === 13) {
            if (this.confirmOnEnter) {

                // console.log(this.dialogsService);
                this.store.dispatch(new DialogsActions.ConfirmOnEnter(this.el, this.dialogId, this.clickEvent, this.delayConfirmation ? 300 : null));
            }

        }


    }

}
