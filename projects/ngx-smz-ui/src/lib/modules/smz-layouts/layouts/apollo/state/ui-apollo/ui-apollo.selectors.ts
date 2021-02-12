import { Selector } from '@ngxs/store';
import { LayoutState } from '../../../../core/models/layout';
import { MenuType } from '../../../../core/models/menu-types';
import { SidebarState } from '../../../../core/models/sidebar-states';
import { UiState, UiStateModel } from '../../../../core/state/ui/ui.state';
import { ApolloLayout } from '../../layout.config';
import { UiApolloState, UiApolloStateModel } from './ui-apollo.state';

export class UiApolloSelectors
{

    @Selector([UiApolloState, UiState])
    public static state(state: UiApolloStateModel, ui: UiStateModel): LayoutState
    {
        const layoutClass = `layout-${state.config.menu}`;
        const sidebarClass = `${layoutClass}-${state.config.sidebarState}`;
        const mobileSidebarClass = state.config.sidebarState === SidebarState.ACTIVE ? `layout-mobile-${state.config.sidebarState}` : '';
        const isOverlayVisible = state.config.menu === MenuType.OVERLAY && state.config.sidebarState === SidebarState.ACTIVE;

        const layout: LayoutState = {
            ...state.state,
            wrapperClass: `${layoutClass} ${sidebarClass} ${mobileSidebarClass}`,
            isOverlayVisible,
        };

        return layout;
    }

    @Selector([UiApolloState])
    public static topbarTitle(state: UiApolloStateModel): string
    {
        return state.state.topbarTitle;
    }

    @Selector([UiApolloState])
    public static layout(state: UiApolloStateModel): ApolloLayout
    {
        return state.config;
    }


}