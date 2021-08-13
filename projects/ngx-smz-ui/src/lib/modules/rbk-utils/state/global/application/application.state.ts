import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { AuthenticationActions } from '../authentication/authentication.actions';
import { ApplicationActions } from './application.actions';
import { MessageService } from 'primeng/api';
import { NgxRbkUtilsConfig } from '../../../ngx-rbk-utils.config';
import { ToastActions } from './application.actions.toast';
import { Navigate } from '@ngxs/router-plugin';
import { HttpErrorHandler } from '../../../error-handler/error.handler';
import { SmzDialog, SmzDialogsService } from 'ngx-smz-dialogs';

export interface ApplicationStateModel {
    globalIsLoading: boolean;
    localIsLoading: string[];
    isNgRxInitializedOnClient: boolean;
    logInfo: LogInfo;
}

export interface LogInfo {
    applicationArea: string;
    applicationLayer: string;
    applicationVersion: string;
    extraData: string;
}

// Initial application state, to be used ONLY when the application is starting
export const getInitialApplicationState = (): ApplicationStateModel => ({
    globalIsLoading: false,
    isNgRxInitializedOnClient: false,
    localIsLoading: [],
    logInfo: {
        applicationArea: '',
        applicationLayer: '',
        applicationVersion: '',
        extraData: ''
    }
});

// Application state for when the user cleared the state while the application is running,
// NGXS will be already initialized, and all non initialized stores will be reset.
export const getCleanApplicationState = (): ApplicationStateModel => ({
    globalIsLoading: false,
    isNgRxInitializedOnClient: true,
    localIsLoading: [],
    logInfo: {
        applicationArea: '',
        applicationLayer: '',
        applicationVersion: '',
        extraData: ''
    }
});

// Do not remove the @dynamic flag, it's not a comment, it an Angular flag!
// @dynamic
@State<ApplicationStateModel>({
    name: 'application',
    defaults: getInitialApplicationState()
})
@Injectable()
export class ApplicationState {
    constructor(private messageService: MessageService, private rbkConfig: NgxRbkUtilsConfig, private dialogs: SmzDialogsService) { }

    @Action(ApplicationActions.HandleHttpErrorWithDialog)
    public async handleErrorWithDialog$(ctx: StateContext<ApplicationStateModel>, action: ApplicationActions.HandleHttpErrorWithDialog): Promise<void> {
        // ctx.dispatch(new ApplicationActions.StopGlobalLoading());
        const error = await HttpErrorHandler.handle(action.error, this.rbkConfig);

        const confirm = {
            validationRequired: false,
            closeDialogAfterClicked: true,
            confirmOnEnter: true,
            isOverlayAction: false,
            icon: '',
            iconPos: '',
            label: 'FECHAR',
            onClick: () => { },
            style: 'primary',
            styleClass: '',
            visible: true
        };


        if (action.error.status >= 400 && action.error.status < 500) {
            const dialog: SmzDialog<any> = {
                title: this.rbkConfig.dialogsConfig.warningDialogTitle,
                features: [
                    { type: 'message', data: error.messages },
                ],
                behaviors: {
                    showCancelButton: false,
                    useAdvancedResponse: false,
                    showConfirmButton: false,
                    closeOnEscape: true,
                    showCloseButton: false,
                    showFooter: true,
                    showHeader: true,
                    showOkButton: true,
                },
                builtInButtons: {
                    confirmDependsOnValidation: false,
                    okName: 'OK'
                },
            };

            this.dialogs.open(dialog);
        }
        else {
            const dialog: SmzDialog<any> = {
                title: this.rbkConfig.dialogsConfig.errorDialogTitle,
                features: [
                    { type: 'message', data: error.messages },
                ],
                behaviors: {
                    showCancelButton: false,
                    showConfirmButton: false,
                    useAdvancedResponse: false,
                    closeOnEscape: true,
                    showCloseButton: false,
                    showFooter: true,
                    showHeader: true,
                    showOkButton: true,
                },
                builtInButtons: {
                    confirmDependsOnValidation: false,
                    okName: 'OK'
                },
            };

            this.dialogs.open(dialog);
        }

        if (error.redirectTo != null) {
            ctx.dispatch(new Navigate([error.redirectTo]));
        }
    }

    @Action(ApplicationActions.HandleHttpErrorWithToast)
    public async handleErrorWithToast$(ctx: StateContext<ApplicationStateModel>, action: ApplicationActions.HandleHttpErrorWithToast): Promise<void> {
        // ctx.dispatch(new ApplicationActions.StopGlobalLoading());

        const error = await HttpErrorHandler.handle(action.error, this.rbkConfig);

        for (const message of error.messages) {
            if (action.error.status >= 400 && action.error.status < 500) {
                ctx.dispatch(new ToastActions.Warning(message));
            }
            else {
                ctx.dispatch(new ToastActions.Error(message));
            }
        }

        if (error.redirectTo != null) {
            ctx.dispatch(new Navigate([error.redirectTo]));
        }
    }

    @Action(ApplicationActions.StartGlobalLoading)
    public startLoading$(ctx: StateContext<ApplicationStateModel>, action: ApplicationActions.StartGlobalLoading): void {
        ctx.patchState({ globalIsLoading: true });
    }

    @Action(ApplicationActions.StopGlobalLoading)
    public stopLoading$(ctx: StateContext<ApplicationStateModel>, action: ApplicationActions.StopGlobalLoading): void {
        ctx.patchState({ globalIsLoading: false });
    }

    @Action(ApplicationActions.PushLocalLoading)
    public pushLocalLoading$(ctx: StateContext<ApplicationStateModel>, action: ApplicationActions.PushLocalLoading): void {
        if (ctx.getState().localIsLoading.findIndex(x => x.toLowerCase() !== action.tag.toLowerCase()) === -1) {
            ctx.patchState({ localIsLoading: [action.tag, ...ctx.getState().localIsLoading] });
        }
        else {
            // TODO: throw error if the user tries to push the same tag again?
        }
    }

    @Action(ApplicationActions.PopLocalLoading)
    public popLocalLoading$(ctx: StateContext<ApplicationStateModel>, action: ApplicationActions.PopLocalLoading): void {
        ctx.patchState({ localIsLoading: ctx.getState().localIsLoading.filter(x => x.toLowerCase() !== action.tag.toLowerCase()) });
    }

    @Action(AuthenticationActions.Logout)
    public logout(ctx: StateContext<ApplicationStateModel>): void {
        ctx.patchState({
            ...getCleanApplicationState()
        });
    }

    @Action(ToastActions.Custom)
    public showToastMessage(ctx: StateContext<ApplicationStateModel>, action: ToastActions.Custom): void {
        const message = {
            ...this.rbkConfig.toastConfig,
            ...action.message
        };

        this.messageService.add(message);
    }

    @Action(ToastActions.Success)
    public showToastSuccessMessage(ctx: StateContext<ApplicationStateModel>, action: ToastActions.Success): void {
        const message = {
            ...this.rbkConfig.toastConfig,
            severity: 'success',
            summary: action.title ?? this.rbkConfig.toastConfig.successTitle,
            detail: action.message
        };

        this.messageService.add(message);
    }

    @Action(ToastActions.Error)
    public showToastErrorMessage(ctx: StateContext<ApplicationStateModel>, action: ToastActions.Error): void {
        const message = {
            ...this.rbkConfig.toastConfig,
            severity: 'error',
            summary: action.title ?? this.rbkConfig.toastConfig.errorTitle,
            detail: action.message
        };

        this.messageService.add(message);
    }

    @Action(ToastActions.Info)
    public showToastInfoMessage(ctx: StateContext<ApplicationStateModel>, action: ToastActions.Info): void {
        const message = {
            ...this.rbkConfig.toastConfig,
            severity: 'info',
            summary: action.title ?? this.rbkConfig.toastConfig.infoTitle,
            detail: action.message
        };

        this.messageService.add(message);
    }

    @Action(ToastActions.Warning)
    public showToastWarningMessage(ctx: StateContext<ApplicationStateModel>, action: ToastActions.Warning): void {
        const message = {
            ...this.rbkConfig.toastConfig,
            severity: 'warn',
            summary: action.title ?? this.rbkConfig.toastConfig.warningTitle,
            detail: action.message
        };

        this.messageService.add(message);
    }

    @Action(ApplicationActions.NgRxInitialized)
    public setRequiredDatabaseActions(ctx: StateContext<ApplicationStateModel>): void {
        ctx.patchState({
            isNgRxInitializedOnClient: true
        });
    }

    @Action(ApplicationActions.SetLogInfo)
    public setLogInfo(ctx: StateContext<ApplicationStateModel>, action: ApplicationActions.SetLogInfo): void {
        ctx.patchState({
            logInfo: action.info
        });
    }

    @Action(ApplicationActions.SetLogApplicatinArea)
    public setArea(ctx: StateContext<ApplicationStateModel>, action: ApplicationActions.SetLogApplicatinArea): void {
        ctx.patchState({
            logInfo: { ...ctx.getState().logInfo, applicationArea: action.area }
        });
    }

    @Action(ApplicationActions.SetLogExtraData)
    public setExtraData(ctx: StateContext<ApplicationStateModel>, action: ApplicationActions.SetLogExtraData): void {
        ctx.patchState({
          logInfo: { ...ctx.getState().logInfo, applicationArea: action.data }
        });
    }

    @Action(ApplicationActions.SetLogApplicationAreaAndExtraData)
    public setApplicationAreaAndExtraData(ctx: StateContext<ApplicationStateModel>, action: ApplicationActions.SetLogApplicationAreaAndExtraData): void {
        ctx.patchState({
          logInfo: { ...ctx.getState().logInfo, applicationArea: action.area, extraData: action.data }
        });
    }
}
