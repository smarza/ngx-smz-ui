import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Assistance } from '../../models/assistance';
import { LayoutState, LoaderData } from '../../models/layout';
import { UiActions } from './ui.actions';
import { cloneDeep } from 'lodash-es';
import { SmzLayoutsConfig } from '../../globals/smz-layouts.config';
import { SmzContentTheme, SmzContentThemes } from '../../models/themes';
import { LogoResource } from '../../models/logo';
import { SmzToastData } from '../../models/toasts';
import { ColorSchemaDefinition, SmzColorSchemas } from '../../models/color-schemas';

export interface UiStateModel {
  assistance: Assistance;
  themes: {
    content: SmzContentTheme;
    schema: ColorSchemaDefinition;
  };
  toast: SmzToastData;
  loader: LoaderData;
  state: LayoutState;
  appLogo: LogoResource;
}

export const getInitialState = (): UiStateModel => ({
  assistance: null,
  themes: {
    content: null,
    schema: null,
  },
  toast: {
    position: null,
  },
  loader: {
    type: null,
    title: '',
    message: '',
  },
  state: {
    wrapperClass: '',
    isOverlayVisible: false,
    topbarTitle: '',
    appName: '',
    footerText: '',
    contentTone: null,
    layoutTone: null,
    schemaTone: null
  },
  appLogo: null
});

// @dynamic
@State<UiStateModel>({
  name: 'ui',
  defaults: getInitialState()
})

@Injectable()
export class UiState {
  constructor(public readonly config: SmzLayoutsConfig) { }


  @Action(UiActions.Initialize)
  public onInitialize(ctx: StateContext<UiStateModel>): void {
    const state = ctx.getState().state;

    ctx.patchState(
      {
        assistance: this.config.assistance,
        themes: {
          content: this.config.themes.content,
          schema: this.config.themes.schema,
        },
        appLogo: this.config.appLogo,
        state: {
          ...state,
          appName: this.config.appName,
          footerText: this.config.footerText
        },
        toast: this.config.toast,
        loader: this.config.loader,
      });

    ctx.dispatch(new UiActions.SetContentTheme(this.config.themes.content));
    ctx.dispatch(new UiActions.SetColorSchema(this.config.themes.schema));
  }

  @Action(UiActions.SetTopbarTitle)
  public onSetTopbarTitle(ctx: StateContext<UiStateModel>, action: UiActions.SetTopbarTitle): void {
    const state = ctx.getState().state;
    ctx.patchState({ state: { ...state, topbarTitle: action.data } });
  }

  @Action(UiActions.SetContentTheme)
  public onSetContentTheme(ctx: StateContext<UiStateModel>, action: UiActions.SetContentTheme): void {
    const themes = ctx.getState().themes;
    const state = ctx.getState().state;
    const contentTheme = SmzContentThemes.find(x => x.id === action.data);

    ctx.patchState({ themes: { ...themes, content: action.data }, state: { ...state, contentTone: contentTheme.tone } });
  }

  @Action(UiActions.SetColorSchema)
  public onSetColorSchema(ctx: StateContext<UiStateModel>, action: UiActions.SetColorSchema): void {
    const themes = ctx.getState().themes;
    const state = ctx.getState().state;
    const schema = SmzColorSchemas.find(x => x.id === action.data);

    schema.schemas.forEach(x => {
      document.documentElement.style.setProperty(x.id, x.name);
    });

    ctx.patchState({ themes: { ...themes, schema: action.data }, state: { ...state, schemaTone: schema.tone } });
  }

  @Action(UiActions.SetGlobalLoader)
  public onSetGlobalLoader(ctx: StateContext<UiStateModel>, action: UiActions.SetGlobalLoader): void {
    const loader = ctx.getState().loader;

    ctx.patchState({ loader: { ...loader, type: action.data } });
  }

  @Action(UiActions.ShowConfigAssistance)
  public onShowConfigAssistance(ctx: StateContext<UiStateModel>): void {
    const assistance = cloneDeep(ctx.getState().assistance);
    ctx.patchState({ assistance: { ...assistance, isVisible: true } });
  }

  @Action(UiActions.HideConfigAssistance)
  public onHideConfigassistance(ctx: StateContext<UiStateModel>): void {
    const assistance = ctx.getState().assistance;
    ctx.patchState({ assistance: { ...assistance, isVisible: false } });
  }

  @Action(UiActions.SetAssistancePosition)
  public onSetAssistancePosition(ctx: StateContext<UiStateModel>, action: UiActions.SetAssistancePosition): void {
    const assistance = ctx.getState().assistance;
    ctx.patchState({ assistance: { ...assistance, sidebarData: { ...assistance.sidebarData, position: action.data } } });
  }

  @Action(UiActions.SetAssistanceButtonPosition)
  public onSetAssistanceButtonPosition(ctx: StateContext<UiStateModel>, action: UiActions.SetAssistanceButtonPosition): void {
    const assistance = ctx.getState().assistance;
    ctx.patchState({ assistance: { ...assistance, buttonPosition: action.data } });
  }

  @Action(UiActions.SetToastPosition)
  public onSetToastPosition(ctx: StateContext<UiStateModel>, action: UiActions.SetToastPosition): void {
    const toast = ctx.getState().toast;
    ctx.patchState({ toast: { ...toast, position: action.data } });
  }

}