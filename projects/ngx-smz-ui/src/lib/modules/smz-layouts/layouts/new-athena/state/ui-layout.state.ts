import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { LayoutState } from '../../../core/models/layout';
import { SidebarState } from '../../../core/models/sidebar-states';
import { UiAthenaActions } from './ui-layout.actions';
import { NewAthenaLayout } from '../layout.config';

export interface UiAthenaStateModel {
  config: NewAthenaLayout;
  state: LayoutState;
}
export const getInitialState = (): UiAthenaStateModel => ({
  config: null,
  state: {
    wrapperClass: '',
    contentClass: '',
    isOverlayVisible: false,
    topbarTitle: '',
    appName: '',
    footerText: '',
    contentTone: null,
    layoutTone: null,
    schemaTone: null,
  }
});

// @dynamic
@State<UiAthenaStateModel>({
  name: 'uiAthena',
  defaults: getInitialState()
})

@Injectable()
export class UiAthenaState {
  constructor() { }

  @Action(UiAthenaActions.Initialize)
  public onInitialize(ctx: StateContext<UiAthenaStateModel>, action: UiAthenaActions.Initialize): void {
    const state = ctx.getState().state;

    ctx.patchState(
      {
        config: action.data,
        state: {
          ...state,
          appName: action.config.appName,
        }
      });

    ctx.dispatch(new UiAthenaActions.SetSidebarWidth(action.data.sidebarWidth));
    ctx.dispatch(new UiAthenaActions.SetSidebarSlimWidth(action.data.sidebarSlimWidth));

  }


  @Action(UiAthenaActions.SetSidebarWidth)
  public onSetSidebarWidth(ctx: StateContext<UiAthenaStateModel>, action: UiAthenaActions.SetSidebarWidth): void {
    const config = ctx.getState().config;

    ctx.patchState({ config: { ...config, sidebarWidth: action.data } });

    document.documentElement.style.setProperty('--sidebar-width', action.data);
  }

  @Action(UiAthenaActions.SetSidebarSlimWidth)
  public onSetSidebarSlimWidth(ctx: StateContext<UiAthenaStateModel>, action: UiAthenaActions.SetSidebarSlimWidth): void {
    const config = ctx.getState().config;

    ctx.patchState({ config: { ...config, sidebarSlimWidth: action.data } });

    document.documentElement.style.setProperty('--sidebar-slim-width', action.data);
  }

  @Action(UiAthenaActions.SetMenu)
  public onSetMenuType(ctx: StateContext<UiAthenaStateModel>, action: UiAthenaActions.SetMenu): void {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, menu: action.data } });
  }

  @Action(UiAthenaActions.ShowSidebar)
  public onShowSidebar(ctx: StateContext<UiAthenaStateModel>): void {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, sidebarState: SidebarState.ACTIVE } });
  }


  @Action(UiAthenaActions.HideSidebar)
  public onHideSidebar(ctx: StateContext<UiAthenaStateModel>): void {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, sidebarState: SidebarState.INACTIVE } });
  }

  @Action(UiAthenaActions.ToggleSidebar)
  public onToggleSidebar(ctx: StateContext<UiAthenaStateModel>): void {
    const config = ctx.getState().config;
    ctx.patchState({
      config: {
        ...config,
        sidebarState: config.sidebarState === SidebarState.ACTIVE ? SidebarState.INACTIVE : SidebarState.ACTIVE
      }
    });
  }

  @Action(UiAthenaActions.ToggleMobileSidebar)
  public onToggleMobileSidebar(ctx: StateContext<UiAthenaStateModel>): void {
    const config = ctx.getState().config;
    ctx.patchState({
      config: {
        ...config,
        mobileSidebarState: config.mobileSidebarState === SidebarState.ACTIVE ? SidebarState.INACTIVE : SidebarState.ACTIVE
      }
    });
  }

}