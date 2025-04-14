import { SmzExportDialogData } from '../../../modules/smz-export-dialog/smz-export-dialog.model';
import { BreadcrumbsData } from '../../../modules/smz-layouts/core/models/breadcrumbs';
import { ColorSchemaDefinition } from '../../../modules/smz-layouts/core/models/color-schemas';
import { SmzLoader } from '../../../modules/smz-layouts/core/models/loaders';
import { EdgePositionType, LeftPositionType, RightPositionType, SidePositionType } from '../../../modules/smz-layouts/core/models/positions';
import { SmzContentTheme } from '../../../modules/smz-layouts/core/models/themes';

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

    export class ShowExportDialog
    {
        public static readonly type = '[LAYOUT UI] Show Export Dialog';
        constructor(public data: SmzExportDialogData) {}
    }

    export class HideExportDialog
    {
        public static readonly type = '[LAYOUT UI] Hide Export Dialog';
    }

}