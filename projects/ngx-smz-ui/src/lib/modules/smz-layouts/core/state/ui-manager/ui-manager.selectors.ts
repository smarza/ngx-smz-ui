import { Selector } from '@ngxs/store';
import { UiManagerState, UiManagerStateModel } from './ui-manager.state';
import { LayoutState } from '../../models/layout';
import { SmzSidebarState } from '../../../public-api';
import { Assistance } from '../../models/assistance';
export class UiManagerSelectors
{

    @Selector([UiManagerState])
    public static layoutState(state: UiManagerStateModel): LayoutState
    {
        const layoutClass = `layout-${state.config.menuType}`;
        const sidebarClass = state.config.sidebarState === SmzSidebarState.INACTIVE ? `${layoutClass}-${SmzSidebarState.INACTIVE}` : '';

        const layout: LayoutState = {
            wrapperClass: `${layoutClass} ${sidebarClass}`
        };

        return layout;
    }

    @Selector([UiManagerState])
    public static assistance(state: UiManagerStateModel): Assistance
    {
        return state.assistance;
    }
}