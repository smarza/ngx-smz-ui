import { Selector } from '@ngxs/store';
import { UiManagerState, UiManagerStateModel } from './ui-manager.state';
import { LayoutConfig, LayoutState, LoaderData } from '../../models/layout';
import { Assistance } from '../../models/assistance';
import { SmzMenuType } from '../../models/menu-types';
import { SmzSidebarState } from '../../models/sidebar-states';
import { SmzAppLogo } from '../../models/logo';
export class UiManagerSelectors
{

    @Selector([UiManagerState])
    public static state(state: UiManagerStateModel): LayoutState
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

    @Selector([UiManagerState])
    public static topbarTitle(state: UiManagerStateModel): string
    {
        return state.state.topbarTitle;
    }


    @Selector([UiManagerState])
    public static loader(state: UiManagerStateModel): LoaderData
    {
        return state.config.loader;
    }

    @Selector([UiManagerState])
    public static contentTheme(state: UiManagerStateModel): string
    {
        return `/assets/scss/contents/${state.config.contentTheme}`;
    }

    @Selector([UiManagerState])
    public static assistance(state: UiManagerStateModel): Assistance
    {
        return state.assistance;
    }

    @Selector([UiManagerState])
    public static config(state: UiManagerStateModel): LayoutConfig
    {
        return state.config;
    }

    @Selector([UiManagerState])
    public static appLogo(state: UiManagerStateModel): SmzAppLogo
    {
        return {
            horizontal: state.appLogo.horizontal[state.state.themeTone],
            vertical: state.appLogo.vertical[state.state.themeTone],
            icon: state.appLogo.icon[state.state.themeTone],
            typo: state.appLogo.typo[state.state.themeTone]
        };
    }
}