import { SmzMenuType } from '../../models/menu-types';

export namespace UiManagerActions
{

    export class Initialize
    {
        public static readonly type = '[UI Manager] Initialize';
    }

    export class SetMenuType
    {
        public static readonly type = '[UI Manager] Set Menu Type';
        constructor(public type: SmzMenuType) {}
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

}