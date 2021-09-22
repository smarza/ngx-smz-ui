import { Selector } from '@ngxs/store';
import { LayoutState } from '../../../core/models/layout';
import { MenuType } from '../../../core/models/menu-types';
import { SidebarState } from '../../../core/models/sidebar-states';
import { LayoutUiState, UiStateModel } from '../../../core/state/ui/ui.state';
import { AthenaLayout } from '../layout.config';
import { UiAthenaState, UiAthenaStateModel } from './ui-layout.state';

export class UiAthenaSelectors
{

    @Selector([UiAthenaState, LayoutUiState])
    public static state(state: UiAthenaStateModel, ui: UiStateModel): LayoutState
    {
        const layoutClass = `layout-${state.config.menu}`;
        const sidebarClass = `${layoutClass}-${state.config.sidebarState}`;
        const mobileSidebarClass = state.config.sidebarState === SidebarState.ACTIVE ? `layout-mobile-${state.config.sidebarState}` : '';
        const isOverlayVisible = state.config.menu === MenuType.OVERLAY && state.config.sidebarState === SidebarState.ACTIVE;
        const contentClass = '';

        const layout: LayoutState = {
            ...state.state,
            wrapperClass: `${layoutClass} ${sidebarClass} ${mobileSidebarClass}`,
            isOverlayVisible,
            contentClass
        };

        return layout;
    }

    @Selector([UiAthenaState])
    public static topbarTitle(state: UiAthenaStateModel): string
    {
        return state.state.topbarTitle;
    }

    @Selector([UiAthenaState])
    public static layout(state: UiAthenaStateModel): AthenaLayout
    {
        return state.config;
    }


}