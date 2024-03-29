import { AthenaLayout, AthenaMenuTypes } from '../layout.config';

export namespace UiAthenaActions
{

    export class Initialize
    {
        public static readonly type = '[UI Athena] Initialize';
        constructor(public data: AthenaLayout) {}
    }

    export class SetMenu
    {
        public static readonly type = '[UI Athena] Set Menu Type';
        constructor(public data: AthenaMenuTypes) {}
    }

    export class SetSidebarWidth
    {
        public static readonly type = '[UI Athena] Set Sidebar Width';
        constructor(public data: string) {}
    }

    export class SetSidebarSlimWidth
    {
        public static readonly type = '[UI Athena] Set Sidebar Slim Width';
        constructor(public data: string) {}
    }

    export class ShowSidebar
    {
        public static readonly type = '[UI Athena] Show Sidebar';
    }

    export class HideSidebar
    {
        public static readonly type = '[UI Athena] Hide Sidebar';
    }

    export class ToggleSidebar
    {
        public static readonly type = '[UI Athena] Toggle Sidebar';
    }

    export class ToggleMobileSidebar
    {
        public static readonly type = '[UI Athena] Toggle Mobile Sidebar';
    }

}