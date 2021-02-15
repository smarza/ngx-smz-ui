import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { LayoutState } from '../../../core/models/layout';
import { SidebarState } from '../../../core/models/sidebar-states';
import { UiHephaestusActions } from './ui-layout.actions';
import { HephaestusLayout } from '../layout.config';

export interface UiHephaestusStateModel {
  config: HephaestusLayout;
  state: LayoutState;
}

export const getInitialState = (): UiHephaestusStateModel => ({
  config: null,
  state: {
    wrapperClass: '',
    isOverlayVisible: false,
    topbarTitle: '',
    appName: '',
    footerText: '',
    contentTone: null,
    layoutTone: null,
    schemaTone: null
  }
});

// @dynamic
@State<UiHephaestusStateModel>({
  name: 'uiHephaestus',
  defaults: getInitialState()
})

@Injectable()
export class UiHephaestusState {
  constructor() { }


  @Action(UiHephaestusActions.Initialize)
  public onInitialize(ctx: StateContext<UiHephaestusStateModel>, action: UiHephaestusActions.Initialize): void {
    const state = ctx.getState().state;

    ctx.patchState(
      {
        config: action.data,
        state: {
          ...state,
          appName: action.config.appName,
          footerText: action.config.footerText
        }
      });

    ctx.dispatch(new UiHephaestusActions.SetSidebarWidth(action.data.sidebarWidth));
    ctx.dispatch(new UiHephaestusActions.SetSidebarSlimWidth(action.data.sidebarSlimWidth));

  }


  @Action(UiHephaestusActions.SetSidebarWidth)
  public onSetSidebarWidth(ctx: StateContext<UiHephaestusStateModel>, action: UiHephaestusActions.SetSidebarWidth): void {
    const config = ctx.getState().config;

    ctx.patchState({ config: { ...config, sidebarWidth: action.data } });

    document.documentElement.style.setProperty('--sidebar-width', action.data);
  }

  @Action(UiHephaestusActions.SetSidebarSlimWidth)
  public onSetSidebarSlimWidth(ctx: StateContext<UiHephaestusStateModel>, action: UiHephaestusActions.SetSidebarSlimWidth): void {
    const config = ctx.getState().config;

    ctx.patchState({ config: { ...config, sidebarSlimWidth: action.data } });

    document.documentElement.style.setProperty('--sidebar-slim-width', action.data);
  }

  @Action(UiHephaestusActions.SetMenu)
  public onSetMenuType(ctx: StateContext<UiHephaestusStateModel>, action: UiHephaestusActions.SetMenu): void {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, menu: action.data } });
  }

  @Action(UiHephaestusActions.ShowSidebar)
  public onShowSidebar(ctx: StateContext<UiHephaestusStateModel>): void {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, sidebarState: SidebarState.ACTIVE } });
  }


  @Action(UiHephaestusActions.HideSidebar)
  public onHideSidebar(ctx: StateContext<UiHephaestusStateModel>): void {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, sidebarState: SidebarState.INACTIVE } });
  }

  @Action(UiHephaestusActions.ToggleSidebar)
  public onToggleSidebar(ctx: StateContext<UiHephaestusStateModel>): void {
    const config = ctx.getState().config;
    ctx.patchState({
      config: {
        ...config,
        sidebarState: config.sidebarState === SidebarState.ACTIVE ? SidebarState.INACTIVE : SidebarState.ACTIVE
      }
    });
  }

}