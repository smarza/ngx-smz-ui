import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { SmzLayoutsConfig } from '../../../public-api';
import { Assistance } from '../../models/assistance';
import { LayoutConfig, LayoutState } from '../../models/layout';
import { SmzSidebarState } from '../../models/sidebar-states';
import { UiManagerActions } from './ui-manager.actions';
import cloneDeep from 'lodash-es/cloneDeep';

export interface UiManagerStateModel
{
  assistance: Assistance;
  config: LayoutConfig;
  state: LayoutState;
}

export const getInitialState = (): UiManagerStateModel => ({
  assistance: null,
  config: null,
  state: {
    wrapperClass: '',
    isOverlayVisible: false
  }
});

@State<UiManagerStateModel>({
  name: 'uiManager',
  defaults: getInitialState()
})

@Injectable()
export class UiManagerState
{
  constructor(public readonly config: SmzLayoutsConfig) { }


  @Action(UiManagerActions.Initialize)
  public onInitialize(ctx: StateContext<UiManagerStateModel>): void
  {
    ctx.patchState(
      {
        assistance: this.config.assistance,
        config: this.config.layout
      });
  }

  @Action(UiManagerActions.SetMenuType)
  public onSetMenuType(ctx: StateContext<UiManagerStateModel>, action: UiManagerActions.SetMenuType): void
  {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, menuType: action.data } });
  }

  @Action(UiManagerActions.SetTheme)
  public onSetTheme(ctx: StateContext<UiManagerStateModel>, action: UiManagerActions.SetTheme): void
  {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, theme: action.data } });
  }

  @Action(UiManagerActions.ShowSidebar)
  public onShowSidebar(ctx: StateContext<UiManagerStateModel>): void
  {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, sidebarState: SmzSidebarState.ACTIVE } });
  }


  @Action(UiManagerActions.HideSidebar)
  public onHideSidebar(ctx: StateContext<UiManagerStateModel>): void
  {
    const config = ctx.getState().config;
    ctx.patchState({ config: { ...config, sidebarState: SmzSidebarState.INACTIVE } });
  }

  @Action(UiManagerActions.ToggleSidebar)
  public onToggleSidebar(ctx: StateContext<UiManagerStateModel>): void
  {
    const config = ctx.getState().config;
    ctx.patchState({
      config: {
        ...config,
        sidebarState: config.sidebarState === SmzSidebarState.ACTIVE ? SmzSidebarState.INACTIVE : SmzSidebarState.ACTIVE
      }
    });
  }

  @Action(UiManagerActions.ShowConfigAssistance)
  public onShowConfigAssistance(ctx: StateContext<UiManagerStateModel>): void
  {
    const assistance = cloneDeep(ctx.getState().assistance);
    ctx.patchState({ assistance: { ...assistance, isVisible: true } });
  }

  @Action(UiManagerActions.HideConfigAssistance)
  public onHideConfigassistance(ctx: StateContext<UiManagerStateModel>): void
  {
    const assistance = ctx.getState().assistance;
    ctx.patchState({ assistance: { ...assistance, isVisible: false } });
  }

}