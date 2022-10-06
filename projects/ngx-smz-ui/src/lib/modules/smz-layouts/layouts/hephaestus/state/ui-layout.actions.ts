import { SmzLayoutsConfig } from '../../../core/globals/smz-layouts.config';
import { HephaestusLayout, HephaestusMenuTypes } from '../layout.config';

export namespace UiHephaestusActions
{

    export class Initialize
    {
        public static readonly type = '[UI Hephaestus] Initialize';
        constructor(public config: SmzLayoutsConfig, public data: HephaestusLayout) {}
    }

    export class SetMenu
    {
        public static readonly type = '[UI Hephaestus] Set Menu Type';
        constructor(public data: HephaestusMenuTypes) {}
    }

    export class SetSidebarWidth
    {
        public static readonly type = '[UI Hephaestus] Set Sidebar Width';
        constructor(public data: string) {}
    }

    export class SetSidebarSlimWidth
    {
        public static readonly type = '[UI Hephaestus] Set Sidebar Slim Width';
        constructor(public data: string) {}
    }

    export class ShowSidebar
    {
        public static readonly type = '[UI Hephaestus] Show Sidebar';
    }

    export class HideSidebar
    {
        public static readonly type = '[UI Hephaestus] Hide Sidebar';
    }

    export class ToggleSidebar
    {
        public static readonly type = '[UI Hephaestus] Toggle Sidebar';
    }

    export class ToggleMobileSidebar
    {
        public static readonly type = '[UI Hephaestus] Toggle Mobile Sidebar';
    }

}