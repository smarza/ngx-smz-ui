import { Selector } from '@ngxs/store';
import { UiManagerState, UiManagerStateModel } from './ui-manager.state';
import { LayoutConfig, LayoutState, LoaderData } from '../../models/layout';
import { Assistance } from '../../models/assistance';
import { SmzMenuType } from '../../models/menu-types';
import { SmzSidebarState } from '../../models/sidebar-states';
import { SmzLoader } from '../../models/loaders';
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
        return `/assets/${state.config.contentTheme}`;
    }

    @Selector([UiManagerState])
    public static assistance(state: UiManagerStateModel): Assistance
    {
        return state.assistance;
    }
}