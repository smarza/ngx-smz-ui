import { Selector } from '@ngxs/store';
import { UiManagerState, UiManagerStateModel } from './ui-manager.state';
import { clone } from '../../../../../common/utils/deep-merge';
import { LayoutState } from '../../models/layout';
export class UiManagerSelectors
{

    @Selector([UiManagerState])
    public static layoutState(state: UiManagerStateModel): LayoutState
    {
        const sidebarClass = state.config.sidebarState === 'inactive' ? 'layout-static-inactive' : '';

        const layout: LayoutState = {
            wrapperClass: `layout-static ${sidebarClass}`
        };

        return layout;
    }

}