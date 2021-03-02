/*
 * Public API Surface of ngx-smz-ui
 */

export * from './lib/ngx-smz-ui.component';
export * from './lib/ngx-smz-ui.module';

export * from './lib/modules/smz-messages/public-api';
export * from './lib/modules/smz-faqs/public-api';
export * from './lib/modules/smz-layouts/public-api';
export * from './lib/modules/smz-tables/public-api';

export * from './lib/common/input-detection/input-detection.module';
export * from './lib/common/input-detection/input-detection.directive';

export { DataPipesModule } from './lib/common/data-pipes/data-pipes.module';
export { ClonePipe } from './lib/common/data-pipes/pipes/clone.pipe';
export { SafeHtmlPipe } from './lib/common/data-pipes/pipes/safe-html.pipe';
export { SafeUrlPipe } from './lib/common/data-pipes/pipes/safe-url.pipe';
export { UniqueFilterPipe } from './lib/common/data-pipes/pipes/unique-filter.pipe';

export { PrimeConfigService } from './lib/common/services/prime-config.service';