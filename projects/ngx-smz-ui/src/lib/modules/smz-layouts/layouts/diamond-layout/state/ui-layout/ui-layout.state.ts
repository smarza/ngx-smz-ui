import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { DiamondLayout, LayoutState } from '../../../../core/models/layout';
import { DiamondSidebarState } from '../../../../core/models/sidebar-states';
import { SmzLayoutsConfig } from '../../../../core/globals/smz-layouts.config';
import { UiLayoutActions } from './ui-layout.actions';

export interface UiLayoutStateModel {
  config: DiamondLayout;
  state: LayoutState;
}

export const getInitialState = (): UiLayoutStateModel => ({
  config: null,
  state: {
    wrapperClass: '',
    isOverlayVisible: false,
    topbarTitle: '',
    appName: '',
    footerText: '',
    contentTone: null,
    layoutTone: null
  }
});

// @dynamic
@State<UiLayoutStateModel>({
  name: 'uiLayout',
  defaults: getInitialState()
})

@Injectable()
export class UiLayoutState {
  constructor(public readonly config: SmzLayoutsConfig) { }


  @Action(UiLayoutActions.Initialize)
  public onInitialize(ctx: StateContext<UiLayoutStateModel>): void {
    const state = ctx.getState().state;

    ctx.patchState(
      {
        config: this.config.layout,
        state: {
          ...state,
          appName: this.config.appName,
          footerText: this.config.footerText
        }
      });

    ctx.dispatch(new UiLayoutActions.SetSidebarWidth(this.config.layout.sidebarWidth));
    ctx.dispatch(new UiLayoutActions.SetSidebarSlimWidth(this.config.layout.sidebarSlimWidth));

  }


  @Action(UiLayoutActions.SetSidebarWidth)
  public onSetSidebarWidth(ctx: StateContext<UiLayoutStateModel>, action: UiLayoutActions.SetSidebarWidth): void {
    const config = ctx.getState().config;

    ctx.patchState({ config: { ...config, sidebarWidth: action.data } });

    document.documentElement.style.setProperty('--sidebar-width', action.data);
  }

  @Action(UiLayoutActions.SetSidebarSlimWidth)
  public onSetSidebarSlimWidth(ctx: StateContext<UiLayoutStateModel>, action: UiLayoutActions.SetSidebarSlimWidth): void {
    const config = ctx.getState().config;

    ctx.patchState({ config: { ...config, sidebarSlimWidth: action.data } });

    document.documentElement.style.setProperty('--sidebar-slim-width', action.data);
  }

  @Action(UiLayoutActions.SetMenu)
  public onSetMenuType(ctx: StateContext<UiLayoutStateModel>, action: UiLayoutActions.SetMenu): void {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, menu: action.data } });
  }

  @Action(UiLayoutActions.ShowSidebar)
  public onShowSidebar(ctx: StateContext<UiLayoutStateModel>): void {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, sidebarState: DiamondSidebarState.ACTIVE } });
  }


  @Action(UiLayoutActions.HideSidebar)
  public onHideSidebar(ctx: StateContext<UiLayoutStateModel>): void {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, sidebarState: DiamondSidebarState.INACTIVE } });
  }

  @Action(UiLayoutActions.ToggleSidebar)
  public onToggleSidebar(ctx: StateContext<UiLayoutStateModel>): void {
    const config = ctx.getState().config;
    ctx.patchState({
      config: {
        ...config,
        sidebarState: config.sidebarState === DiamondSidebarState.ACTIVE ? DiamondSidebarState.INACTIVE : DiamondSidebarState.ACTIVE
      }
    });
  }

}