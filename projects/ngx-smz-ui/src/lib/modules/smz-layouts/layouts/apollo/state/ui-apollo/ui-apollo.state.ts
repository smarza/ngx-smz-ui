import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { LayoutState } from '../../../../core/models/layout';
import { SidebarState } from '../../../../core/models/sidebar-states';
import { UiApolloActions } from './ui-apollo.actions';
import { ApolloLayout } from '../../layout.config';

export interface UiApolloStateModel {
  config: ApolloLayout;
  state: LayoutState;
}

export const getInitialState = (): UiApolloStateModel => ({
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
@State<UiApolloStateModel>({
  name: 'uiApollo',
  defaults: getInitialState()
})

@Injectable()
export class UiApolloState {
  constructor() { }


  @Action(UiApolloActions.Initialize)
  public onInitialize(ctx: StateContext<UiApolloStateModel>, action: UiApolloActions.Initialize): void {
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

    ctx.dispatch(new UiApolloActions.SetSidebarWidth(action.data.sidebarWidth));
    ctx.dispatch(new UiApolloActions.SetSidebarSlimWidth(action.data.sidebarSlimWidth));

  }


  @Action(UiApolloActions.SetSidebarWidth)
  public onSetSidebarWidth(ctx: StateContext<UiApolloStateModel>, action: UiApolloActions.SetSidebarWidth): void {
    const config = ctx.getState().config;

    ctx.patchState({ config: { ...config, sidebarWidth: action.data } });

    document.documentElement.style.setProperty('--sidebar-width', action.data);
  }

  @Action(UiApolloActions.SetSidebarSlimWidth)
  public onSetSidebarSlimWidth(ctx: StateContext<UiApolloStateModel>, action: UiApolloActions.SetSidebarSlimWidth): void {
    const config = ctx.getState().config;

    ctx.patchState({ config: { ...config, sidebarSlimWidth: action.data } });

    document.documentElement.style.setProperty('--sidebar-slim-width', action.data);
  }

  @Action(UiApolloActions.SetMenu)
  public onSetMenuType(ctx: StateContext<UiApolloStateModel>, action: UiApolloActions.SetMenu): void {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, menu: action.data } });
  }

  @Action(UiApolloActions.ShowSidebar)
  public onShowSidebar(ctx: StateContext<UiApolloStateModel>): void {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, sidebarState: SidebarState.ACTIVE } });
  }


  @Action(UiApolloActions.HideSidebar)
  public onHideSidebar(ctx: StateContext<UiApolloStateModel>): void {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, sidebarState: SidebarState.INACTIVE } });
  }

  @Action(UiApolloActions.ToggleSidebar)
  public onToggleSidebar(ctx: StateContext<UiApolloStateModel>): void {
    const config = ctx.getState().config;
    ctx.patchState({
      config: {
        ...config,
        sidebarState: config.sidebarState === SidebarState.ACTIVE ? SidebarState.INACTIVE : SidebarState.ACTIVE
      }
    });
  }

  @Action(UiApolloActions.ToggleMobileSidebar)
  public onToggleMobileSidebar(ctx: StateContext<UiApolloStateModel>): void {
    const config = ctx.getState().config;
    ctx.patchState({
      config: {
        ...config,
        mobileSidebarState: config.mobileSidebarState === SidebarState.ACTIVE ? SidebarState.INACTIVE : SidebarState.ACTIVE
      }
    });
  }

}