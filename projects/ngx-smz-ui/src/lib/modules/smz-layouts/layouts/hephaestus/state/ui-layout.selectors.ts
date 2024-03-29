import { Selector } from '@ngxs/store';
import { LayoutState } from '../../../core/models/layout';
import { MenuType } from '../../../core/models/menu-types';
import { SidebarState } from '../../../core/models/sidebar-states';
import { LayoutUiState, UiStateModel } from '../../../../../state/ui/layout/layout.state';
import { HephaestusLayout } from '../layout.config';
import { UiHephaestusState, UiHephaestusStateModel } from './ui-layout.state';

export class UiHephaestusSelectors
{

    @Selector([UiHephaestusState, LayoutUiState])
    public static state(state: UiHephaestusStateModel, uiState: UiStateModel): LayoutState
    {
        const layoutTone = uiState.state.contentTone;

        const layoutClass = `layout-${state.config.menu}`;
        const sidebarClass = `${layoutClass}-${state.config.sidebarState}`;
        const mobileSidebarClass = state.config.mobileSidebarState === SidebarState.ACTIVE ? `layout-mobile-${state.config.mobileSidebarState}` : '';
        const isOverlayVisible = (state.config.menu === MenuType.OVERLAY && state.config.sidebarState === SidebarState.ACTIVE) ||
                                 (state.config.menu === MenuType.SLIM && state.config.mobileSidebarState === SidebarState.ACTIVE);

        const schemaClass = `layout-sidebar-schema-${layoutTone}${uiState.themes.theme.isDimmed ? ' dimmed-schema' : ''}`;

        const layout: LayoutState = {
            ...state.state,
            wrapperClass: `${schemaClass} ${layoutClass} ${sidebarClass} ${mobileSidebarClass}`,
            isOverlayVisible,
        };

        // console.log('state', state);
        // console.log('layout', layout);
        // console.log('uiState', uiState);

        return layout;
    }

    @Selector([UiHephaestusState])
    public static topbarTitle(state: UiHephaestusStateModel): string
    {
        return state.state.topbarTitle;
    }

    @Selector([UiHephaestusState])
    public static layout(state: UiHephaestusStateModel): HephaestusLayout
    {
        return state.config;
    }


}