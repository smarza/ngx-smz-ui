import { SmzLayoutsConfig } from '../../../../core/globals/smz-layouts.config';
import { DiamondLayout, DiamondMenuTypes } from '../../layout.config';


export namespace UiDiamondActions
{

    export class Initialize
    {
        public static readonly type = '[UI Diamond] Initialize';
        constructor(public config: SmzLayoutsConfig, public data: DiamondLayout) {}
    }

    export class SetMenu
    {
        public static readonly type = '[UI Diamond] Set Menu Type';
        constructor(public data: DiamondMenuTypes) {}
    }

    export class SetSidebarWidth
    {
        public static readonly type = '[UI Diamond] Set Sidebar Width';
        constructor(public data: string) {}
    }

    export class SetSidebarSlimWidth
    {
        public static readonly type = '[UI Diamond] Set Sidebar Slim Width';
        constructor(public data: string) {}
    }

    export class ShowSidebar
    {
        public static readonly type = '[UI Diamond] Show Sidebar';
    }

    export class HideSidebar
    {
        public static readonly type = '[UI Diamond] Hide Sidebar';
    }

    export class ToggleSidebar
    {
        public static readonly type = '[UI Diamond] Toggle Sidebar';
    }

}