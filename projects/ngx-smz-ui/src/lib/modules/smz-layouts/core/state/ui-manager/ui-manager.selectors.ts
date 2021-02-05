import { Selector } from '@ngxs/store';
import { UiManagerState, UiManagerStateModel } from './ui-manager.state';
import { LayoutState } from '../../models/layout';
import { Assistance } from '../../models/assistance';
import { SmzMenuType } from '../../models/menu-types';
import { SmzSidebarState } from '../../../public-api';
import { SmzContentTheme } from '../../models/themes';
export class UiManagerSelectors
{

    @Selector([UiManagerState])
    public static layoutState(state: UiManagerStateModel): LayoutState
    {
        const themeClass = `layout-sidebar-${state.config.layoutTheme}`;
        const layoutClass = `layout-${state.config.menuType}`;
        const sidebarClass = `${layoutClass}-${state.config.sidebarState}`;
        const isOverlayVisible = state.config.menuType === SmzMenuType.OVERLAY && state.config.sidebarState === SmzSidebarState.ACTIVE;

        const layout: LayoutState = {
            wrapperClass: `${themeClass} ${layoutClass} ${sidebarClass}`,
            isOverlayVisible
        };

        return layout;
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