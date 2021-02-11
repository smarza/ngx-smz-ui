import { DiamondMenuType } from '../../../../../core/models/menu-types';

export namespace UiLayoutActions
{

    export class Initialize
    {
        public static readonly type = '[UI Layout] Initialize';
    }

    export class SetMenu
    {
        public static readonly type = '[UI Layout] Set Menu Type';
        constructor(public data: DiamondMenuType) {}
    }

    export class SetSidebarWidth
    {
        public static readonly type = '[UI Layout] Set Sidebar Width';
        constructor(public data: string) {}
    }

    export class SetSidebarSlimWidth
    {
        public static readonly type = '[UI Layout] Set Sidebar Slim Width';
        constructor(public data: string) {}
    }

    export class ShowSidebar
    {
        public static readonly type = '[UI Layout] Show Sidebar';
    }

    export class HideSidebar
    {
        public static readonly type = '[UI Layout] Hide Sidebar';
    }

    export class ToggleSidebar
    {
        public static readonly type = '[UI Layout] Toggle Sidebar';
    }

}