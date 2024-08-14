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
import { GlobalInjector } from '../../../../common/services/global-injector';
import { CustomError, RbkApiErrorMessageTypes } from '../../../rbk-utils/error-handler/error.handler';

@UntilDestroy()
@Component({
    selector: 'smz-dialog-footer',
    templateUrl: './dialog-footer.component.html',
    styleUrls: ['./dialog-footer.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DialogFooterComponent implements OnInit {
    public isAnyButtonExecutionInProgress = false;

    constructor(
        public refService: DynamicDialogRef,
        public dialogConfig: SmzDynamicDialogConfig,
        private visibilityService: SmzDialogsVisibilityService,
        private injectComponent: InjectComponentService,
        private cdf: ChangeDetectorRef,
        private actions$: Actions,
        private store: Store) { }

    public ngOnInit(): void {
    }

    public close(): void {
        if (this.isAnyButtonExecutionInProgress) {
            return;
        }

        this.isAnyButtonExecutionInProgress = true;

        if (this.dialogConfig.data?.callbacks?.onCancel != null) {
            this.dialogConfig.data.callbacks.onCancel();
        }

        this.isAnyButtonExecutionInProgress = false;

        this.refService.close();
    }

    public confirm(): void {

        if (this.isAnyButtonExecutionInProgress) {
            return;
        }

        this.isAnyButtonExecutionInProgress = true;

        const context = this.dialogConfig.data._context;

        if (context.builtInButtons.confirmDependsOnValidation && !this.onSubmit()) {
            this.isAnyButtonExecutionInProgress = false;
            return;
        }

        const response =  this.responsePostProcesses();

        if (this.dialogConfig.data?.callbacks?.onConfirm != null) {
            this.dialogConfig.data.callbacks.onConfirm(response);
        }

        setTimeout(() => {
            this.isAnyButtonExecutionInProgress = false;
            this.refService.close();
        }, 0);

    }

    public onSubmit(): boolean {
        if (this.isValid()) {

            if (GlobalInjector.config.debugMode) {
                console.log('           onSubmit => ', true);
            }

            return true;
        }
        else {

            if (GlobalInjector.config.debugMode) {
                console.log('           Forms... ');
            }

            this.dialogConfig.data.features
                .filter(x => x.type === 'form')
                .forEach(feature => {
                    const formFeature = feature.data as SmzForm<never>;
                    const form = formFeature.context.form;

                    if (GlobalInjector.config.debugMode) {
                        console.log('               > formFeature:', formFeature);
                        console.log('               > form:', form);
                        console.log('               > controls:', form.controls);
                    }

                    Object.keys(form.controls).forEach(field => {
                        const control = form.get(field);
                        if (GlobalInjector.config.debugMode) {
                            console.log(`               > control for ${field}:`, control);
                        }
                        control.markAsTouched({ onlySelf: true });

                        formFeature.context.cdf.markForCheck();
                    });
                });

            if (GlobalInjector.config.debugMode) {
                console.log('           Components... ');
            }

            this.dialogConfig.data.features
                .filter(x => x.type === 'component' || x.type === 'table')
                .forEach(feature => {
                    const componentFeature = feature.data as ComponentData;
                    const injected = this.injectComponent.getComponent(componentFeature.componentId);

                    if (GlobalInjector.config.debugMode) {
                        console.log('feature', componentFeature);
                        console.log('injected', injected);
                        console.log('instance', injected.instance);
                    }

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

            if (GlobalInjector.config.debugMode) {
                console.log('           onSubmit => ', false);
            }

            return false;
        }
    }

    public ok(): void {
        if (this.isAnyButtonExecutionInProgress) {
            return;
        }

        this.isAnyButtonExecutionInProgress = true;

        const context = this.dialogConfig.data._context;
        if (context.builtInButtons.okDependsOnValidation && !this.onSubmit()) {
            this.isAnyButtonExecutionInProgress = false;
            return;
        }

        const response =  this.responsePostProcesses();

        if (this.dialogConfig.data?.callbacks?.onOk != null) {
            this.dialogConfig.data.callbacks.onOk(response);
        }

        setTimeout(() => {
            this.isAnyButtonExecutionInProgress = false;
            this.refService.close();
        }, 0);
    }

    public save(): void {

        if (this.isAnyButtonExecutionInProgress) {
            return;
        }

        this.isAnyButtonExecutionInProgress = true;

        if (GlobalInjector.config.debugMode) {
            console.groupCollapsed('Dialog Save Pressed:');
            console.log('     >> context', this.dialogConfig.data._context);
            console.log('     >> onSubmit()', this.onSubmit());
            console.log('     >> data', this.dialogConfig.data);
        }

        const context = this.dialogConfig.data._context;
        if (context.builtInButtons.saveDependsOnValidation && !this.onSubmit()) {
            this.isAnyButtonExecutionInProgress = false;
            return;
        }

        this.dialogConfig.data._context.isGlobalDisabled = true;
        this.dialogConfig.data._context.isLoading = true;
        this.dialogConfig.data._context.apiErrors = [];

        this.dialogConfig.data._context.injectables.forEach((injectable) => {
            const instance = injectable.ref.componentRef.instance;

            if (instance?.form != null) {
                const formComponent = instance as FormGroupComponent;

                formComponent.viewdata.form.disable();
            }
        });

        this.cdf.markForCheck();

        if (this.dialogConfig.data?.callbacks?.onSaveAction != null) {

            const postProcessResponse = this.responsePostProcesses();

            const action = this.dialogConfig.data.callbacks.onSaveAction;

            if (GlobalInjector.config.debugMode) {
                console.log('     >> postProcessResponse', postProcessResponse);
            }

            (this.store.dispatch(new action(postProcessResponse)) as Observable<any>)
                .pipe(catchError((err) => {

                    if (GlobalInjector.config.debugMode) {
                        console.log('     >> dispatch catchError', err);
                    }

                    const errors: string[] = CustomError.getErrorMessages(err.error);

                    if (GlobalInjector.config.debugMode) {
                        console.log('errors', err);
                    }

                    this.dialogConfig.data._context.apiErrors = errors.map(x => ({ severity: 'warn', summary: '', detail: x }));
                    this.dialogConfig.data._context.isGlobalDisabled = false;
                    this.dialogConfig.data._context.isLoading = false;

                    this.cdf.markForCheck();

                    this.dialogConfig.data._context.injectables.forEach((injectable) => {
                        const instance = injectable.ref.componentRef.instance;

                        if (instance?.form != null) {
                            const formComponent = instance as FormGroupComponent;

                            formComponent.viewdata.form.enable();
                        }
                    });

                    this.isAnyButtonExecutionInProgress = false;

                    return err;
                }))
                .subscribe(() => {

                    if (GlobalInjector.config.debugMode) {
                        console.log('     >> dispatch subscribe');
                    }

                    this.dialogConfig.data._context.isGlobalDisabled = false;
                    this.dialogConfig.data._context.isLoading = false;
                    this.dialogConfig.data._context.apiErrors = [];

                    this.isAnyButtonExecutionInProgress = false;
                    this.refService.close();
                });
        }

        if (GlobalInjector.config.debugMode) {
            console.groupEnd();
        }

    }

    public customClick(button: SmzDialogCustomButton<any>): void {

        if (this.isAnyButtonExecutionInProgress) {
            return;
        }

        this.isAnyButtonExecutionInProgress = true;

        if (button.blockUi != null) {
            this.customClickWithBlockUi(button);
        }
        else {
            if (button.dependsOnValidation && !this.onSubmit()) {
                this.isAnyButtonExecutionInProgress = false;
                return;
            }

            const response =  this.responsePostProcesses();

            button.onClick(response, this.dialogConfig.data.features);

            this.isAnyButtonExecutionInProgress = false;

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

                formComponent.viewdata.form.disable();
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

                    if (GlobalInjector.config.debugMode) {
                        console.log('ofActionErrored', err);
                    }

                    const errors: string[] = CustomError.getErrorMessages(err.error);

                    if (GlobalInjector.config.debugMode) {
                        console.log('errors', err);
                    }

                    this.dialogConfig.data._context.apiErrors = errors.map(x => ({ severity: 'warn', summary: '', detail: x }));
                    this.dialogConfig.data._context.isGlobalDisabled = false;
                    this.dialogConfig.data._context.isLoading = false;

                    this.cdf.markForCheck();

                    this.dialogConfig.data._context.injectables.forEach((injectable) => {
                        const instance = injectable.ref.componentRef.instance;

                        if (instance?.form != null) {
                            const formComponent = instance as FormGroupComponent;

                            formComponent.viewdata.form.enable();
                        }
                        else if (instance.blockUi != null) {
                            instance.unBlockUi();
                        }

                    });

                });

        }

        const response =  this.responsePostProcesses();

        button.onClick(response, this.dialogConfig.data.features);

    }

    public isValid(): boolean {
        // const isValid = this.dialogConfig.data._context.injectables.every(x => x.ref?.componentRef?.instance?.isValid);
        // console.log('----------------------- isValid', this.visibilityService);
        // console.log('--- isValid() ');
        // console.log('context', this.dialogConfig.data._context);
        let isValid = true;

        if (GlobalInjector.config.debugMode) {
            console.log('           Calling isValid()');
        }

        for (const injectable of this.dialogConfig.data._context.injectables) {

            if (GlobalInjector.config.debugMode) console.log('           >> injectable', injectable);

            if (injectable.visibilityDependsOn != null) {

                if (GlobalInjector.config.debugMode) console.log('           >> injectable visibilityDependsOn');

                const observer = this.visibilityService.observers[injectable.componentId + injectable.component.name];

                if (GlobalInjector.config.debugMode) console.log('           >> injectable observer', observer);

                const isVisible = !injectable.visibilityDependsOn.reversed && observer?.visibility$.value.state || injectable.visibilityDependsOn.reversed && !observer?.visibility$.value.state;

                if (GlobalInjector.config.debugMode) console.log('           >> injectable isVisible', isVisible);

                if (GlobalInjector.config.debugMode) console.log('           >> injectable componentRef isValid', injectable.ref?.componentRef?.instance?.isValid);

                if (isVisible && !injectable.ref?.componentRef?.instance?.isValid) {
                    isValid = false;
                }
            }
            else {

                if (GlobalInjector.config.debugMode) {
                    console.log('           >> instance', injectable.ref?.componentRef?.instance);
                    console.log('           >> injectable componentRef isValid', injectable.ref?.componentRef?.instance?.isValid);
                }

                if (!injectable.ref?.componentRef?.instance?.isValid) {
                    isValid = false;
                }

            }
        }

        if (GlobalInjector.config.debugMode) {
            console.log('           isValid() => ', isValid);
        }

        return isValid;
    }

    private responsePostProcesses(): any {
        const config = this.dialogConfig.data;
        const response = config.behaviors.useAdvancedResponse ?
            this.proccessAdvancedResponse(config._context.advancedResponse) :
            this.proccessSimpleResponse(config._context.simpleResponse);

        if (GlobalInjector.config.debugMode) {
            console.log('     >> response', response);
        }

        return config.callbacks?.postProcessResponse != null ? config.callbacks.postProcessResponse(response, config) : response;
    }

    private proccessAdvancedResponse(response: any): any {
        // console.log('proccessAdvancedResponse', response);
        return response;
    }

    private proccessSimpleResponse(response: any): any {
        // console.log('proccessSimpleResponse', response);
        return response;
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
