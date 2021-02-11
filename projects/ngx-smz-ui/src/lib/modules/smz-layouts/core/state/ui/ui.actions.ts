import { SmzLoader } from '../../models/loaders';
import { SmzMenuType } from '../../models/menu-types';
import { EdgePositionType, LeftPositionType, RightPositionType, SidePositionType } from '../../models/positions';
import { SmzContentTheme, SmzLayoutTheme } from '../../models/themes';

export namespace UiActions
{

    export class Initialize
    {
        public static readonly type = '[UI] Initialize';
    }

    export class SetMenuType
    {
        public static readonly type = '[UI] Set Menu Type';
        constructor(public data: SmzMenuType) {}
    }

    export class SetLayoutTheme
    {
        public static readonly type = '[UI] Set Layout Theme';
        constructor(public data: SmzLayoutTheme) {}
    }

    export class SetContentTheme
    {
        public static readonly type = '[UI] Set Content Theme';
        constructor(public data: SmzContentTheme) {}
    }

    export class SetGlobalLoader
    {
        public static readonly type = '[UI] Set Global Loader';
        constructor(public data: SmzLoader) {}
    }

    export class SetSidebarWidth
    {
        public static readonly type = '[UI] Set Sidebar Width';
        constructor(public regular: string) {}
    }

    export class SetSidebarSlimWidth
    {
        public static readonly type = '[UI] Set Sidebar Slim Width';
        constructor(public slim: string) {}
    }

    export class ShowSidebar
    {
        public static readonly type = '[UI] Show Sidebar';
    }
    export class HideSidebar
    {
        public static readonly type = '[UI] Hide Sidebar';
    }
    export class ToggleSidebar
    {
        public static readonly type = '[UI] Toggle Sidebar';
    }
    export class ShowConfigAssistance
    {
        public static readonly type = '[UI] Show Config Assistance';
    }
    export class HideConfigAssistance
    {
        public static readonly type = '[UI] Hide Config Assistance';
    }
    export class SetAssistancePosition
    {
        public static readonly type = '[UI] Set Assistance Position';
        constructor(public data: SidePositionType) {}
    }

    export class SetAssistanceButtonPosition
    {
        public static readonly type = '[UI] Set Assistance Button Position';
        constructor(public data: LeftPositionType | RightPositionType) {}
    }

    export class SetTopbarTitle
    {
        public static readonly type = '[UI] Set Topbar Title';
        constructor(public data: string) {}
    }

    export class SetToastPosition
    {
        public static readonly type = '[UI] Set Toast Position';
        constructor(public data: EdgePositionType) {}
    }

}