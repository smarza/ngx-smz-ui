import { ClickStopPropagationModule } from './lib/common/stop-click-propagation/click-stop-propagation.module';
/*
 * Public API Surface of ngx-smz-ui
 */

export * from './lib/modules/smz-dialogs/public-api';
export * from './lib/modules/smz-forms/public-api';

export * from './lib/ngx-smz-ui.component';
export * from './lib/ngx-smz-ui.module';

export * from './lib/modules/smz-messages/public-api';
export * from './lib/modules/smz-faqs/public-api';
export * from './lib/modules/smz-layouts/public-api';
export * from './lib/modules/smz-tables/public-api';
export * from './lib/modules/smz-trees/public-api';
export * from './lib/modules/smz-charts/public-api';
export * from './lib/modules/smz-html-viewer/public-api';
export * from './lib/modules/smz-data-info/public-api';
export * from './lib/modules/smz-side-content/public-api';
export * from './lib/modules/smz-info-date/public-api';
export * from './lib/modules/smz-router-params/public-api';
export * from './lib/modules/smz-viewport/public-api';
export * from './lib/modules/smz-menu/public-api';
export * from './lib/modules/smz-dock/public-api';
// export * from './lib/modules/smz-notifications/public-api';
export * from './lib/modules/smz-documents/public-api';

// Verificar se já resolveram o issue para publicar com esse módulo
export * from './lib/modules/smz-svg/public-api';

export * from './lib/common/input-detection/input-detection.module';
export * from './lib/common/input-detection/input-detection.directive';

export { NgxSmzDataPipesModule } from './lib/common/data-pipes/data-pipes.module';
export { ClonePipe } from './lib/common/data-pipes/pipes/clone.pipe';
export { SafeHtmlPipe } from './lib/common/data-pipes/pipes/safe-html.pipe';
export { SafeUrlPipe } from './lib/common/data-pipes/pipes/safe-url.pipe';
export { UniqueFilterPipe } from './lib/common/data-pipes/pipes/unique-filter.pipe';
export { DescribeArrayPipe } from './lib/common/data-pipes/pipes/describe-array.pipe';
export { CalendarPipe } from './lib/common/data-pipes/pipes/calendar.pipe';
export { SmzGetDataPipe } from './lib/common/data-pipes/pipes/get-data.pipe';
export { JoinPipe } from './lib/common/data-pipes/pipes/join.pipe';
export { DescribeSimpleNamedPipe } from './lib/common/data-pipes/pipes/describe-simple-named.pipe';
export { DescribeAnyPipe } from './lib/common/data-pipes/pipes/describe-any.pipe';
export { StateBuilderPipe } from './lib/common/data-pipes/pipes/state-builder.pipe';

export { UrlCheckerPipeModule } from './lib/common/url-checker/url-checker.pipe';
export { UrlCheckerPipe } from './lib/common/url-checker/url-checker.pipe';

export { ClickStopPropagationModule } from './lib/common/stop-click-propagation/click-stop-propagation.module';
export { ClickStopPropagationDirective } from './lib/common/stop-click-propagation/click-stop-propagation.directive';

export { IsVisiblePipeModule, IsVisiblePipe } from './lib/common/is-visible-pipe/is-visible.pipe';
export { MergeClonePipeModule, MergeClonePipe } from './lib/common/merge-clone-pipe/merge-clone.pipe';

export { PrimeConfigService } from './lib/common/services/prime-config.service';
export { SmzClipboardService } from './lib/common/services/smz-clipboard.service';

// DIRECTIVES
export * from './lib/common/directives/tooltip-touch-support/tooltip-touch-support.module';
export * from './lib/common/directives/tooltip-touch-support/tooltip-touch-support.directive';

export * from './lib/common/directives/action-dispatch/action-dispatch.module';
export * from './lib/common/directives/action-dispatch/action-dispatch.directive';

export * from './lib/common/directives/ng-var/ng-var.module';
export * from './lib/common/directives/ng-var/ng-var.directive';

export * from './lib/common/directives/ng-clone/ng-clone.module';
export * from './lib/common/directives/ng-clone/ng-clone.directive';

// DIALOG STUFFS

export * from './lib/common/modules/inject-content/public-api';
export * from './lib/common/models/simple-named-entity';
export * from './lib/common/models/templates';
export * from './lib/common/utils/utils';
export * from './lib/common/utils/pretty-json';

export * from './lib/common/pipes/templates.pipe';

// RBK

export * from './lib/modules/rbk-utils/public-api';

// BUILDERS
export * from './lib/builders/smz-documents/document-builder';
export * from './lib/builders/smz-documents/document-base-cell';

export * from './lib/builders/smz-menu/menu-builder';
export * from './lib/builders/smz-charts/public-api';
export * from './lib/builders/smz-trees/tree-builder';


export * from './lib/modules/smz-ui-block/public-api';