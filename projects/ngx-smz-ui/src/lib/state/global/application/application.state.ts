import { Injectable } from '@angular/core';
import { State, Action, StateContext, Store } from '@ngxs/store';
import { AuthenticationActions } from '../authentication/authentication.actions';
import { ApplicationActions } from './application.actions';
import { ToastActions } from './application.actions.toast';
import { Navigate } from '@ngxs/router-plugin';
import { HttpErrorHandler } from '../../../modules/rbk-utils/error-handler/error.handler';
import { DialogsActions } from '../../../modules/smz-dialogs/state/dialogs/dialogs.actions';
import { ToastService } from '../../../modules/rbk-utils/misc/toast.service';
import { GlobalInjector } from '../../../common/services/global-injector';

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
    constructor(private toastService: ToastService, private store: Store) { }

    @Action(ApplicationActions.HandleHttpErrorWithDialog)
    public async handleErrorWithDialog$(ctx: StateContext<ApplicationStateModel>, action: ApplicationActions.HandleHttpErrorWithDialog): Promise<void> {

        const error = await HttpErrorHandler.handle(action.error);

        if (action.error.status >= 400 && action.error.status < 500) {
            ctx.dispatch(new DialogsActions.Message(GlobalInjector.config.rbkUtils.dialogsConfig.warningDialogTitle, error.messages));
        }
        else {
            ctx.dispatch(new DialogsActions.Message(GlobalInjector.config.rbkUtils.dialogsConfig.errorDialogTitle, error.messages));
        }

        if (error.redirectTo != null) {
            ctx.dispatch(new Navigate([error.redirectTo]));
        }

        if (GlobalInjector.config.rbkUtils.errorsConfig.callback != null) {
            GlobalInjector.config.rbkUtils.errorsConfig.callback(error, this.store);
        }
    }

    @Action(ApplicationActions.HandleHttpErrorWithToast)
    public async handleErrorWithToast$(ctx: StateContext<ApplicationStateModel>, action: ApplicationActions.HandleHttpErrorWithToast): Promise<void> {

        const error = await HttpErrorHandler.handle(action.error);

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

        if (GlobalInjector.config.rbkUtils.errorsConfig.callback != null) {
            GlobalInjector.config.rbkUtils.errorsConfig.callback(error, this.store);
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
            ...GlobalInjector.config.rbkUtils.toastConfig,
            ...action.message
        };

        this.toastService.add(message);
    }

    @Action(ToastActions.Success)
    public showToastSuccessMessage(ctx: StateContext<ApplicationStateModel>, action: ToastActions.Success): void {
        const message = {
            ...GlobalInjector.config.rbkUtils.toastConfig,
            severity: 'success',
            summary: action.title ?? GlobalInjector.config.rbkUtils.toastConfig.successTitle,
            detail: action.message
        };

        this.toastService.add(message);
    }

    @Action(ToastActions.Error)
    public showToastErrorMessage(ctx: StateContext<ApplicationStateModel>, action: ToastActions.Error): void {
        const message = {
            ...GlobalInjector.config.rbkUtils.toastConfig,
            severity: 'error',
            summary: action.title ?? GlobalInjector.config.rbkUtils.toastConfig.errorTitle,
            detail: action.message
        };

        this.toastService.add(message);
    }

    @Action(ToastActions.Info)
    public showToastInfoMessage(ctx: StateContext<ApplicationStateModel>, action: ToastActions.Info): void {
        const message = {
            ...GlobalInjector.config.rbkUtils.toastConfig,
            severity: 'info',
            summary: action.title ?? GlobalInjector.config.rbkUtils.toastConfig.infoTitle,
            detail: action.message
        };

        this.toastService.add(message);
    }

    @Action(ToastActions.Warning)
    public showToastWarningMessage(ctx: StateContext<ApplicationStateModel>, action: ToastActions.Warning): void {
        const message = {
            ...GlobalInjector.config.rbkUtils.toastConfig,
            severity: 'warn',
            summary: action.title ?? GlobalInjector.config.rbkUtils.toastConfig.warningTitle,
            detail: action.message
        };

        this.toastService.add(message);
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
