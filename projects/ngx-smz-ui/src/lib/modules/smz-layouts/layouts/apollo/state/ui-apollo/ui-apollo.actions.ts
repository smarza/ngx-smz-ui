import { SmzLayoutsConfig } from '../../../../core/globals/smz-layouts.config';
import { ApolloLayout, ApolloMenuTypes } from '../../layout.config';


export namespace UiApolloActions
{

    export class Initialize
    {
        public static readonly type = '[UI Apollo] Initialize';
        constructor(public config: SmzLayoutsConfig, public data: ApolloLayout) {}
    }

    export class SetMenu
    {
        public static readonly type = '[UI Apollo] Set Menu Type';
        constructor(public data: ApolloMenuTypes) {}
    }

    export class SetSidebarWidth
    {
        public static readonly type = '[UI Apollo] Set Sidebar Width';
        constructor(public data: string) {}
    }

    export class SetSidebarSlimWidth
    {
        public static readonly type = '[UI Apollo] Set Sidebar Slim Width';
        constructor(public data: string) {}
    }

    export class ShowSidebar
    {
        public static readonly type = '[UI Apollo] Show Sidebar';
    }

    export class HideSidebar
    {
        public static readonly type = '[UI Apollo] Hide Sidebar';
    }

    export class ToggleSidebar
    {
        public static readonly type = '[UI Apollo] Toggle Sidebar';
    }

    export class ToggleMobileSidebar
    {
        public static readonly type = '[UI Apollo] Toggle Mobile Sidebar';
    }

}