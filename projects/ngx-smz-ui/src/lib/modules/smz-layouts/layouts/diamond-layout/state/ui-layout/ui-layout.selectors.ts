import { Selector } from '@ngxs/store';
import { DiamondLayout, LayoutState } from '../../../../core/models/layout';
import { DiamondMenuType } from '../../../../core/models/menu-types';
import { DiamondSidebarState } from '../../../../core/models/sidebar-states';
import { UiState, UiStateModel } from '../../../../core/state/ui/ui.state';
import { UiLayoutState, UiLayoutStateModel } from './ui-layout.state';

export class UiLayoutSelectors
{

    @Selector([UiLayoutState, UiState])
    public static state(state: UiLayoutStateModel, ui: UiStateModel): LayoutState
    {
        const themeClass = `layout-sidebar-${ui.themes.layout}`;
        const layoutClass = `layout-${state.config.menu}`;
        const sidebarClass = `${layoutClass}-${state.config.sidebarState}`;
        const isOverlayVisible = state.config.menu === DiamondMenuType.OVERLAY && state.config.sidebarState === DiamondSidebarState.ACTIVE;

        const layout: LayoutState = {
            ...state.state,
            wrapperClass: `${themeClass} ${layoutClass} ${sidebarClass}`,
            isOverlayVisible,
        };

        return layout;
    }

    @Selector([UiLayoutState])
    public static topbarTitle(state: UiLayoutStateModel): string
    {
        return state.state.topbarTitle;
    }

    @Selector([UiLayoutState])
    public static layout(state: UiLayoutStateModel): DiamondLayout
    {
        return state.config;
    }


}