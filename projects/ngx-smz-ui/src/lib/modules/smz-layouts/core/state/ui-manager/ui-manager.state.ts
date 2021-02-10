import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Assistance } from '../../models/assistance';
import { LayoutConfig, LayoutState } from '../../models/layout';
import { SmzSidebarState } from '../../models/sidebar-states';
import { UiManagerActions } from './ui-manager.actions';
import cloneDeep from 'lodash-es/cloneDeep';
import { SmzLayoutsConfig } from '../../../globals/smz-layouts.config';
import { SmzContentThemes } from '../../models/themes';
import { LogoResource } from '../../models/logo';

export interface UiManagerStateModel {
  assistance: Assistance;
  config: LayoutConfig;
  state: LayoutState;
  appLogo: LogoResource;
}

export const getInitialState = (): UiManagerStateModel => ({
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
@State<UiManagerStateModel>({
  name: 'uiManager',
  defaults: getInitialState()
})

@Injectable()
export class UiManagerState {
  constructor(public readonly config: SmzLayoutsConfig) { }


  @Action(UiManagerActions.Initialize)
  public onInitialize(ctx: StateContext<UiManagerStateModel>): void {
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

    ctx.dispatch(new UiManagerActions.SetSidebarWidth(this.config.layout.sidebarWidth));
    ctx.dispatch(new UiManagerActions.SetSidebarSlimWidth(this.config.layout.sidebarSlimWidth));
    ctx.dispatch(new UiManagerActions.SetLayoutTheme(this.config.layout.layoutTheme));
    ctx.dispatch(new UiManagerActions.SetContentTheme(this.config.layout.contentTheme));

  }


  @Action(UiManagerActions.SetSidebarWidth)
  public onSetSidebarWidth(ctx: StateContext<UiManagerStateModel>, action: UiManagerActions.SetSidebarWidth): void {
    const config = ctx.getState().config;

    ctx.patchState({ config: { ...config, sidebarWidth: action.regular } });

    document.documentElement.style.setProperty('--sidebar-width', action.regular);
  }

  @Action(UiManagerActions.SetSidebarSlimWidth)
  public onSetSidebarSlimWidth(ctx: StateContext<UiManagerStateModel>, action: UiManagerActions.SetSidebarSlimWidth): void {
    const config = ctx.getState().config;

    ctx.patchState({ config: { ...config, sidebarSlimWidth: action.slim } });

    document.documentElement.style.setProperty('--sidebar-slim-width', action.slim);
  }


  @Action(UiManagerActions.SetTopbarTitle)
  public onSetTopbarTitle(ctx: StateContext<UiManagerStateModel>, action: UiManagerActions.SetTopbarTitle): void {
    const state = ctx.getState().state;
    ctx.patchState({ state: { ...state, topbarTitle: action.data } });
  }

  @Action(UiManagerActions.SetMenuType)
  public onSetMenuType(ctx: StateContext<UiManagerStateModel>, action: UiManagerActions.SetMenuType): void {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, menuType: action.data } });
  }

  @Action(UiManagerActions.SetLayoutTheme)
  public onSetTheme(ctx: StateContext<UiManagerStateModel>, action: UiManagerActions.SetLayoutTheme): void {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, layoutTheme: action.data } });
  }

  @Action(UiManagerActions.SetContentTheme)
  public onSetContentTheme(ctx: StateContext<UiManagerStateModel>, action: UiManagerActions.SetContentTheme): void {
    const config = ctx.getState().config;
    const state = ctx.getState().state;
    const contentTheme = SmzContentThemes.find(x => x.id === action.data);

    ctx.patchState({ config: { ...config, contentTheme: action.data }, state: { ...state, themeTone: contentTheme.tone } });
  }

  @Action(UiManagerActions.SetGlobalLoader)
  public onSetGlobalLoader(ctx: StateContext<UiManagerStateModel>, action: UiManagerActions.SetGlobalLoader): void {
    const config = ctx.getState().config;
    const loader = ctx.getState().config.loader;
    ctx.patchState({ config: { ...config, loader: { ...loader, type: action.data } } });
  }

  @Action(UiManagerActions.ShowSidebar)
  public onShowSidebar(ctx: StateContext<UiManagerStateModel>): void {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, sidebarState: SmzSidebarState.ACTIVE } });
  }


  @Action(UiManagerActions.HideSidebar)
  public onHideSidebar(ctx: StateContext<UiManagerStateModel>): void {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, sidebarState: SmzSidebarState.INACTIVE } });
  }

  @Action(UiManagerActions.ToggleSidebar)
  public onToggleSidebar(ctx: StateContext<UiManagerStateModel>): void {
    const config = ctx.getState().config;
    ctx.patchState({
      config: {
        ...config,
        sidebarState: config.sidebarState === SmzSidebarState.ACTIVE ? SmzSidebarState.INACTIVE : SmzSidebarState.ACTIVE
      }
    });
  }

  @Action(UiManagerActions.ShowConfigAssistance)
  public onShowConfigAssistance(ctx: StateContext<UiManagerStateModel>): void {
    const assistance = cloneDeep(ctx.getState().assistance);
    ctx.patchState({ assistance: { ...assistance, isVisible: true } });
  }

  @Action(UiManagerActions.HideConfigAssistance)
  public onHideConfigassistance(ctx: StateContext<UiManagerStateModel>): void {
    const assistance = ctx.getState().assistance;
    ctx.patchState({ assistance: { ...assistance, isVisible: false } });
  }

}