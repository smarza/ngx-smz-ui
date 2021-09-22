import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { State, Action, StateContext } from '@ngxs/store';
import { Assistance } from '../../models/assistance';
import { LayoutState, LoaderData } from '../../models/layout';
import { LayoutUiActions } from './ui.actions';
import { cloneDeep } from 'lodash-es';
import { SmzLayoutsConfig } from '../../globals/smz-layouts.config';
import { SmzContentTheme, SmzContentThemes } from '../../models/themes';
import { LogoResource } from '../../models/logo';
import { SmzToastData } from '../../models/toasts';
import { ColorSchemaDefinition, SmzColorSchemas } from '../../models/color-schemas';
import { BreadcrumbsData } from '../../models/breadcrumbs';

export interface UiStateModel {
  assistance: Assistance;
  themes: {
    content: SmzContentTheme;
    schema: ColorSchemaDefinition | string;
  };
  toast: SmzToastData;
  loader: LoaderData;
  state: LayoutState;
  appLogo: LogoResource;
  lastUserMouseEvent: 'mouseenter' | 'mouseleave';
  breadcrumbs: BreadcrumbsData;
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
    contentClass: '',
    isOverlayVisible: false,
    topbarTitle: '',
    appName: '',
    footerText: '',
    contentTone: null,
    layoutTone: null,
    schemaTone: null
  },
  appLogo: null,
  lastUserMouseEvent: 'mouseenter',
  breadcrumbs: {
    item: null,
    parent: null
  }
});

// @dynamic
@State<UiStateModel>({
  name: 'layout',
  defaults: getInitialState()
})

@Injectable()
export class LayoutUiState {
  constructor(public readonly config: SmzLayoutsConfig, private location: Location) { }


  @Action(LayoutUiActions.Initialize)
  public onInitialize(ctx: StateContext<UiStateModel>): void {
    const state = ctx.getState().state;

    if (this.config.themes.custom) {
      SmzColorSchemas.push(this.config.themes.custom);
    }

    const schema = this.config.themes.custom ? this.config.themes.custom.id : this.config.themes.schema;

    ctx.patchState(
      {
        assistance: this.config.assistance,
        themes: {
          content: this.config.themes.content,
          schema,
        },
        appLogo: this.config.appLogo,
        state: {
          ...state,
          appName: this.config.appName,
        },
        toast: this.config.toast,
        loader: this.config.loader,
      });

    ctx.dispatch(new LayoutUiActions.SetContentTheme(this.config.themes.content));
    ctx.dispatch(new LayoutUiActions.SetColorSchema(schema));
  }

  @Action(LayoutUiActions.SetTopbarTitle)
  public onSetTopbarTitle(ctx: StateContext<UiStateModel>, action: LayoutUiActions.SetTopbarTitle): void {
    const state = ctx.getState().state;
    ctx.patchState({ state: { ...state, topbarTitle: action.data } });
  }

  @Action(LayoutUiActions.SetContentTheme)
  public onSetContentTheme(ctx: StateContext<UiStateModel>, action: LayoutUiActions.SetContentTheme): void {
    const themes = ctx.getState().themes;
    const state = ctx.getState().state;
    const contentTheme = SmzContentThemes.find(x => x.id === action.data);

    ctx.patchState({ themes: { ...themes, content: action.data }, state: { ...state, contentTone: contentTheme.tone } });
  }

  @Action(LayoutUiActions.SetColorSchema)
  public onSetColorSchema(ctx: StateContext<UiStateModel>, action: LayoutUiActions.SetColorSchema): void {
    const themes = ctx.getState().themes;
    const state = ctx.getState().state;
    const schema = SmzColorSchemas.find(x => x.id === action.data);

    schema.schemas.forEach(x => {
      document.documentElement.style.setProperty(x.id, x.name);
    });

    ctx.patchState({ themes: { ...themes, schema: action.data }, state: { ...state, schemaTone: schema.tone } });
  }

  @Action(LayoutUiActions.SetGlobalLoader)
  public onSetGlobalLoader(ctx: StateContext<UiStateModel>, action: LayoutUiActions.SetGlobalLoader): void {
    const loader = ctx.getState().loader;

    ctx.patchState({ loader: { ...loader, type: action.data } });
  }

  @Action(LayoutUiActions.ShowConfigAssistance)
  public onShowConfigAssistance(ctx: StateContext<UiStateModel>): void {
    const assistance = cloneDeep(ctx.getState().assistance);
    ctx.patchState({ assistance: { ...assistance, isVisible: true } });
  }

  @Action(LayoutUiActions.HideConfigAssistance)
  public onHideConfigassistance(ctx: StateContext<UiStateModel>): void {
    const assistance = ctx.getState().assistance;
    ctx.patchState({ assistance: { ...assistance, isVisible: false } });
  }

  @Action(LayoutUiActions.SetAssistancePosition)
  public onSetAssistancePosition(ctx: StateContext<UiStateModel>, action: LayoutUiActions.SetAssistancePosition): void {
    const assistance = ctx.getState().assistance;
    ctx.patchState({ assistance: { ...assistance, sidebarData: { ...assistance.sidebarData, position: action.data } } });
  }

  @Action(LayoutUiActions.SetAssistanceButtonPosition)
  public onSetAssistanceButtonPosition(ctx: StateContext<UiStateModel>, action: LayoutUiActions.SetAssistanceButtonPosition): void {
    const assistance = ctx.getState().assistance;
    ctx.patchState({ assistance: { ...assistance, buttonPosition: action.data } });
  }

  @Action(LayoutUiActions.SetToastPosition)
  public onSetToastPosition(ctx: StateContext<UiStateModel>, action: LayoutUiActions.SetToastPosition): void {
    const toast = ctx.getState().toast;
    ctx.patchState({ toast: { ...toast, position: action.data } });
  }


  @Action(LayoutUiActions.MoveLayout)
  public onMoveLayout(ctx: StateContext<UiStateModel>, action: LayoutUiActions.MoveLayout): void {
    const state = ctx.getState().state;

    ctx.patchState({ state: { ...state, contentClass: action.data }});

  }


  @Action(LayoutUiActions.RestoreLayoutPosition)
  public onRestoreLayoutPosition(ctx: StateContext<UiStateModel>): void {
    const state = ctx.getState().state;

    ctx.patchState({ state: { ...state, contentClass: '' }});

  }

  @Action(LayoutUiActions.SetLastUserMouseEvent)
  public onSetLastUserMouseEvent(ctx: StateContext<UiStateModel>, action: LayoutUiActions.SetLastUserMouseEvent): void {
    const state = ctx.getState().state;

    ctx.patchState({ lastUserMouseEvent: action.data });

  }

  @Action(LayoutUiActions.NavigateBack)
  public onNavigateBack(ctx: StateContext<UiStateModel>): void {
    this.location.back();

  }

  @Action(LayoutUiActions.SetBreadcrumbs)
  public onSetBreadcrumbs(ctx: StateContext<UiStateModel>, action: LayoutUiActions.SetBreadcrumbs): void {
    const data: BreadcrumbsData = {
      parent: { ...action.data.parent, command: undefined, items: undefined },
      item: { ...action.data.item, command: undefined, items: undefined },
    }
    ctx.patchState({ breadcrumbs: cloneDeep(data) });
  }

}