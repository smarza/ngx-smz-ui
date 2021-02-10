import { Selector } from '@ngxs/store';
import { UiState, UiStateModel } from './ui.state';
import { LayoutConfig, LayoutState, LoaderData } from '../../models/layout';
import { Assistance } from '../../models/assistance';
import { SmzMenuType } from '../../models/menu-types';
import { SmzSidebarState } from '../../models/sidebar-states';
import { SmzAppLogo } from '../../models/logo';
export class UiSelectors
{

    @Selector([UiState])
    public static state(state: UiStateModel): LayoutState
    {
        const themeClass = `layout-sidebar-${state.config.layoutTheme}`;
        const layoutClass = `layout-${state.config.menuType}`;
        const sidebarClass = `${layoutClass}-${state.config.sidebarState}`;
        const isOverlayVisible = state.config.menuType === SmzMenuType.OVERLAY && state.config.sidebarState === SmzSidebarState.ACTIVE;

        const layout: LayoutState = {
            ...state.state,
            wrapperClass: `${themeClass} ${layoutClass} ${sidebarClass}`,
            isOverlayVisible,
        };

        return layout;
    }

    @Selector([UiState])
    public static topbarTitle(state: UiStateModel): string
    {
        return state.state.topbarTitle;
    }


    @Selector([UiState])
    public static loader(state: UiStateModel): LoaderData
    {
        return state.config.loader;
    }

    @Selector([UiState])
    public static contentTheme(state: UiStateModel): string
    {
        return `assets/scss/contents/${state.config.contentTheme}`;
    }

    @Selector([UiState])
    public static assistance(state: UiStateModel): Assistance
    {
        return state.assistance;
    }

    @Selector([UiState])
    public static config(state: UiStateModel): LayoutConfig
    {
        return state.config;
    }

    @Selector([UiState])
    public static appLogo(state: UiStateModel): SmzAppLogo
    {
        return {
            horizontal: state.appLogo.horizontal[state.state.themeTone],
            vertical: state.appLogo.vertical[state.state.themeTone],
            icon: state.appLogo.icon[state.state.themeTone],
            typo: state.appLogo.typo[state.state.themeTone]
        };
    }
}