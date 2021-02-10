import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Assistance } from '../../models/assistance';
import { LayoutConfig, LayoutState } from '../../models/layout';
import { SmzSidebarState } from '../../models/sidebar-states';
import { UiActions } from './ui.actions';
import { cloneDeep } from 'lodash-es';
import { SmzLayoutsConfig } from '../../../globals/smz-layouts.config';
import { SmzContentThemes } from '../../models/themes';
import { LogoResource } from '../../models/logo';

export interface UiStateModel {
  assistance: Assistance;
  config: LayoutConfig;
  state: LayoutState;
  appLogo: LogoResource;
}

export const getInitialState = (): UiStateModel => ({
  assistance: null,
  config: null,
  state: {
    wrapperClass: '',
    isOverlayVisible: false,
    topbarTitle: '',
    appName: '',
    footerText: '',
    themeTone: 'light'
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
        config: this.config.layout,
        appLogo: this.config.appLogo,
        state: {
          ...state,
          appName: this.config.appName,
          footerText: this.config.footerText
        }
      });

    ctx.dispatch(new UiActions.SetSidebarWidth(this.config.layout.sidebarWidth));
    ctx.dispatch(new UiActions.SetSidebarSlimWidth(this.config.layout.sidebarSlimWidth));
    ctx.dispatch(new UiActions.SetLayoutTheme(this.config.layout.layoutTheme));
    ctx.dispatch(new UiActions.SetContentTheme(this.config.layout.contentTheme));

  }


  @Action(UiActions.SetSidebarWidth)
  public onSetSidebarWidth(ctx: StateContext<UiStateModel>, action: UiActions.SetSidebarWidth): void {
    const config = ctx.getState().config;

    ctx.patchState({ config: { ...config, sidebarWidth: action.regular } });

    document.documentElement.style.setProperty('--sidebar-width', action.regular);
  }

  @Action(UiActions.SetSidebarSlimWidth)
  public onSetSidebarSlimWidth(ctx: StateContext<UiStateModel>, action: UiActions.SetSidebarSlimWidth): void {
    const config = ctx.getState().config;

    ctx.patchState({ config: { ...config, sidebarSlimWidth: action.slim } });

    document.documentElement.style.setProperty('--sidebar-slim-width', action.slim);
  }


  @Action(UiActions.SetTopbarTitle)
  public onSetTopbarTitle(ctx: StateContext<UiStateModel>, action: UiActions.SetTopbarTitle): void {
    const state = ctx.getState().state;
    ctx.patchState({ state: { ...state, topbarTitle: action.data } });
  }

  @Action(UiActions.SetMenuType)
  public onSetMenuType(ctx: StateContext<UiStateModel>, action: UiActions.SetMenuType): void {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, menuType: action.data } });
  }

  @Action(UiActions.SetLayoutTheme)
  public onSetTheme(ctx: StateContext<UiStateModel>, action: UiActions.SetLayoutTheme): void {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, layoutTheme: action.data } });
  }

  @Action(UiActions.SetContentTheme)
  public onSetContentTheme(ctx: StateContext<UiStateModel>, action: UiActions.SetContentTheme): void {
    const config = ctx.getState().config;
    const state = ctx.getState().state;
    const contentTheme = SmzContentThemes.find(x => x.id === action.data);

    ctx.patchState({ config: { ...config, contentTheme: action.data }, state: { ...state, themeTone: contentTheme.tone } });
  }

  @Action(UiActions.SetGlobalLoader)
  public onSetGlobalLoader(ctx: StateContext<UiStateModel>, action: UiActions.SetGlobalLoader): void {
    const config = ctx.getState().config;
    const loader = ctx.getState().config.loader;
    ctx.patchState({ config: { ...config, loader: { ...loader, type: action.data } } });
  }

  @Action(UiActions.ShowSidebar)
  public onShowSidebar(ctx: StateContext<UiStateModel>): void {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, sidebarState: SmzSidebarState.ACTIVE } });
  }


  @Action(UiActions.HideSidebar)
  public onHideSidebar(ctx: StateContext<UiStateModel>): void {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, sidebarState: SmzSidebarState.INACTIVE } });
  }

  @Action(UiActions.ToggleSidebar)
  public onToggleSidebar(ctx: StateContext<UiStateModel>): void {
    const config = ctx.getState().config;
    ctx.patchState({
      config: {
        ...config,
        sidebarState: config.sidebarState === SmzSidebarState.ACTIVE ? SmzSidebarState.INACTIVE : SmzSidebarState.ACTIVE
      }
    });
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

}