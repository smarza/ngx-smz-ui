import { Selector } from '@ngxs/store';
import { LayoutState } from '../../../../core/models/layout';
import { MenuType } from '../../../../core/models/menu-types';
import { SidebarState } from '../../../../core/models/sidebar-states';
import { UiState, UiStateModel } from '../../../../core/state/ui/ui.state';
import { DiamondLayout } from '../../layout.config';
import { UiDiamondState, UiDiamondStateModel } from './ui-diamond.state';

export class UiDiamondSelectors
{

    @Selector([UiDiamondState, UiState])
    public static state(state: UiDiamondStateModel, ui: UiStateModel): LayoutState
    {
        const themeClass = `layout-sidebar-${ui.themes.layout}`;
        const layoutClass = `layout-${state.config.menu}`;
        const sidebarClass = `${layoutClass}-${state.config.sidebarState}`;
        const isOverlayVisible = state.config.menu === MenuType.OVERLAY && state.config.sidebarState === SidebarState.ACTIVE;

        const layout: LayoutState = {
            ...state.state,
            wrapperClass: `${themeClass} ${layoutClass} ${sidebarClass}`,
            isOverlayVisible,
        };

        return layout;
    }

    @Selector([UiDiamondState])
    public static topbarTitle(state: UiDiamondStateModel): string
    {
        return state.state.topbarTitle;
    }

    @Selector([UiDiamondState])
    public static layout(state: UiDiamondStateModel): DiamondLayout
    {
        return state.config;
    }


}