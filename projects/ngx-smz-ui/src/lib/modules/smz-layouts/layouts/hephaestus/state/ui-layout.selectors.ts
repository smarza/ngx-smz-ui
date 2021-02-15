import { Selector } from '@ngxs/store';
import { LayoutState } from '../../../core/models/layout';
import { MenuType } from '../../../core/models/menu-types';
import { SidebarState } from '../../../core/models/sidebar-states';
import { UiState, UiStateModel } from '../../../core/state/ui/ui.state';
import { HephaestusLayout } from '../layout.config';
import { UiHephaestusState, UiHephaestusStateModel } from './ui-layout.state';

export class UiHephaestusSelectors
{

    @Selector([UiHephaestusState, UiState])
    public static state(state: UiHephaestusStateModel, ui: UiStateModel): LayoutState
    {
        const layoutClass = `layout-${state.config.menu}`;
        const sidebarClass = `${layoutClass}-${state.config.sidebarState}`;
        const isOverlayVisible = state.config.menu === MenuType.OVERLAY && state.config.sidebarState === SidebarState.ACTIVE;

        const layout: LayoutState = {
            ...state.state,
            wrapperClass: `${layoutClass} ${sidebarClass}`,
            isOverlayVisible,
        };

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