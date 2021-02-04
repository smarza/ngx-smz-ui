import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { LayoutConfig, LayoutState } from '../../models/layout';
import { UiManagerActions } from './ui-manager.actions';

export interface UiManagerStateModel
{
  config: LayoutConfig;
  state: LayoutState;
}

export const getInitialState = (): UiManagerStateModel => ({
  config: {
    sidebarState: 'active'
  },
  state: {
    wrapperClass: ''
  }
});

@State<UiManagerStateModel>({
  name: 'uiManager',
  defaults: getInitialState()
})

@Injectable()
export class UiManagerState
{
  constructor() { }


  @Action(UiManagerActions.Initialize)
  public onInitialize(ctx: StateContext<UiManagerStateModel>): void
  {
    const config = ctx.getState().config;

    ctx.patchState(
      {
        config: {
          ...config,
          sidebarState: 'active'
        }
      });
  }


  @Action(UiManagerActions.ShowSidebar)
  public onShowSidebar(ctx: StateContext<UiManagerStateModel>): void
  {
    ctx.patchState(
      {
        config: {
          sidebarState: 'active'
        }
      });
  }


  @Action(UiManagerActions.HideSidebar)
  public onHideSidebar(ctx: StateContext<UiManagerStateModel>): void
  {
    ctx.patchState(
      {
        config: {
          sidebarState: 'inactive'
        }
      });
  }

  @Action(UiManagerActions.ToggleSidebar)
  public onToggleSidebar(ctx: StateContext<UiManagerStateModel>): void
  {
    const config = ctx.getState().config;

    ctx.patchState(
      {
        config: {
          ...config,
          sidebarState: config.sidebarState === 'active' ? 'inactive' : 'active'
        }
      });
  }

}