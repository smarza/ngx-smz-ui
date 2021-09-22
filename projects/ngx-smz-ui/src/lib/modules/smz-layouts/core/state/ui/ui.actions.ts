import { BreadcrumbsData } from '../../models/breadcrumbs';
import { ColorSchemaDefinition } from '../../models/color-schemas';
import { SmzLoader } from '../../models/loaders';
import { EdgePositionType, LeftPositionType, RightPositionType, SidePositionType } from '../../models/positions';
import { SmzContentTheme } from '../../models/themes';

export namespace LayoutUiActions
{

    export class Initialize
    {
        public static readonly type = '[LAYOUT UI] Initialize';
    }

    export class SetColorSchema
    {
        public static readonly type = '[LAYOUT UI] Set Color Schema';
        constructor(public data: ColorSchemaDefinition | string) {}
    }

    export class SetContentTheme
    {
        public static readonly type = '[LAYOUT UI] Set Content Theme';
        constructor(public data: SmzContentTheme) {}
    }

    export class SetGlobalLoader
    {
        public static readonly type = '[LAYOUT UI] Set Global Loader';
        constructor(public data: SmzLoader) {}
    }

    export class ShowConfigAssistance
    {
        public static readonly type = '[LAYOUT UI] Show Config Assistance';
    }
    export class HideConfigAssistance
    {
        public static readonly type = '[LAYOUT UI] Hide Config Assistance';
    }
    export class SetAssistancePosition
    {
        public static readonly type = '[LAYOUT UI] Set Assistance Position';
        constructor(public data: SidePositionType) {}
    }

    export class SetAssistanceButtonPosition
    {
        public static readonly type = '[LAYOUT UI] Set Assistance Button Position';
        constructor(public data: LeftPositionType | RightPositionType) {}
    }

    export class SetTopbarTitle
    {
        public static readonly type = '[LAYOUT UI] Set Topbar Title';
        constructor(public data: string) {}
    }

    export class SetToastPosition
    {
        public static readonly type = '[LAYOUT UI] Set Toast Position';
        constructor(public data: EdgePositionType) {}
    }

    export class MoveLayout
    {
        public static readonly type = '[LAYOUT UI] Move Layout';
        constructor(public data: string) {}
    }

    export class RestoreLayoutPosition
    {
        public static readonly type = '[LAYOUT UI] Restore Layout Position';
    }

    export class SetLastUserMouseEvent
    {
        public static readonly type = '[LAYOUT UI] Set Last User Mouse Event';
        constructor(public data: 'mouseenter' | 'mouseleave') {}
    }

    export class NavigateBack
    {
        public static readonly type = '[LAYOUT UI] Navigate Back';
    }

    export class SetBreadcrumbs
    {
        public static readonly type = '[LAYOUT UI] SetB readcrumbs';
        constructor(public data: BreadcrumbsData) {}
    }

}