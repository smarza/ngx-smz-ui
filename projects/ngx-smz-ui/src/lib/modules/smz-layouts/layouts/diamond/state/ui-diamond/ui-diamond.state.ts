import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { LayoutState } from '../../../../core/models/layout';
import { SidebarState } from '../../../../core/models/sidebar-states';
import { UiDiamondActions } from './ui-diamond.actions';
import { DiamondLayout } from '../../layout.config';

export interface UiDiamondStateModel {
  config: DiamondLayout;
  state: LayoutState;
}

export const getInitialState = (): UiDiamondStateModel => ({
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
@State<UiDiamondStateModel>({
  name: 'uiDiamond',
  defaults: getInitialState()
})

@Injectable()
export class UiDiamondState {
  constructor() { }


  @Action(UiDiamondActions.Initialize)
  public onInitialize(ctx: StateContext<UiDiamondStateModel>, action: UiDiamondActions.Initialize): void {
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

    ctx.dispatch(new UiDiamondActions.SetSidebarWidth(action.data.sidebarWidth));
    ctx.dispatch(new UiDiamondActions.SetSidebarSlimWidth(action.data.sidebarSlimWidth));

  }


  @Action(UiDiamondActions.SetSidebarWidth)
  public onSetSidebarWidth(ctx: StateContext<UiDiamondStateModel>, action: UiDiamondActions.SetSidebarWidth): void {
    const config = ctx.getState().config;

    ctx.patchState({ config: { ...config, sidebarWidth: action.data } });

    document.documentElement.style.setProperty('--sidebar-width', action.data);
  }

  @Action(UiDiamondActions.SetSidebarSlimWidth)
  public onSetSidebarSlimWidth(ctx: StateContext<UiDiamondStateModel>, action: UiDiamondActions.SetSidebarSlimWidth): void {
    const config = ctx.getState().config;

    ctx.patchState({ config: { ...config, sidebarSlimWidth: action.data } });

    document.documentElement.style.setProperty('--sidebar-slim-width', action.data);
  }

  @Action(UiDiamondActions.SetMenu)
  public onSetMenuType(ctx: StateContext<UiDiamondStateModel>, action: UiDiamondActions.SetMenu): void {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, menu: action.data } });
  }

  @Action(UiDiamondActions.ShowSidebar)
  public onShowSidebar(ctx: StateContext<UiDiamondStateModel>): void {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, sidebarState: SidebarState.ACTIVE } });
  }


  @Action(UiDiamondActions.HideSidebar)
  public onHideSidebar(ctx: StateContext<UiDiamondStateModel>): void {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, sidebarState: SidebarState.INACTIVE } });
  }

  @Action(UiDiamondActions.ToggleSidebar)
  public onToggleSidebar(ctx: StateContext<UiDiamondStateModel>): void {
    const config = ctx.getState().config;
    ctx.patchState({
      config: {
        ...config,
        sidebarState: config.sidebarState === SidebarState.ACTIVE ? SidebarState.INACTIVE : SidebarState.ACTIVE
      }
    });
  }

}