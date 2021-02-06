import { SmzLoader } from '../../models/loaders';
import { SmzMenuType } from '../../models/menu-types';
import { SmzContentTheme, SmzLayoutTheme } from '../../models/themes';

export namespace UiManagerActions
{

    export class Initialize
    {
        public static readonly type = '[UI Manager] Initialize';
    }

    export class SetMenuType
    {
        public static readonly type = '[UI Manager] Set Menu Type';
        constructor(public data: SmzMenuType) {}
    }

    export class SetLayoutTheme
    {
        public static readonly type = '[UI Manager] Set Layout Theme';
        constructor(public data: SmzLayoutTheme) {}
    }

    export class SetContentTheme
    {
        public static readonly type = '[UI Manager] Set Content Theme';
        constructor(public data: SmzContentTheme) {}
    }

    export class SetGlobalLoader
    {
        public static readonly type = '[UI Manager] Set Global Loader';
        constructor(public data: SmzLoader) {}
    }

    export class SetSidebarWidth
    {
        public static readonly type = '[UI Manager] Set Sidebar Width';
        constructor(public regular: string) {}
    }

    export class SetSidebarSlimWidth
    {
        public static readonly type = '[UI Manager] Set Sidebar Slim Width';
        constructor(public slim: string) {}
    }

    export class ShowSidebar
    {
        public static readonly type = '[UI Manager] Show Sidebar';
    }
    export class HideSidebar
    {
        public static readonly type = '[UI Manager] Hide Sidebar';
    }
    export class ToggleSidebar
    {
        public static readonly type = '[UI Manager] Toggle Sidebar';
    }
    export class ShowConfigAssistance
    {
        public static readonly type = '[UI Manager] Show Config Assistance';
    }
    export class HideConfigAssistance
    {
        public static readonly type = '[UI Manager] Hide Config Assistance';
    }

    export class SetTopbarTitle
    {
        public static readonly type = '[UI Manager] Set Topbar Title';
        constructor(public data: string) {}
    }

}