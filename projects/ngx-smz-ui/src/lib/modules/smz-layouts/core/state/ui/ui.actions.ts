import { ColorSchemaDefinition } from '../../models/color-schemas';
import { SmzLoader } from '../../models/loaders';
import { EdgePositionType, LeftPositionType, RightPositionType, SidePositionType } from '../../models/positions';
import { SmzContentTheme } from '../../models/themes';

export namespace UiActions
{

    export class Initialize
    {
        public static readonly type = '[UI] Initialize';
    }

    export class SetColorSchema
    {
        public static readonly type = '[UI] Set Color Schema';
        constructor(public data: ColorSchemaDefinition) {}
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