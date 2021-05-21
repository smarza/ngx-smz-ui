import type { SmzViewportConfig } from '../models/smz-viewport-config';

export interface InViewportConfigCheckFnOptions {
  force: boolean;
  config: SmzViewportConfig;
}

export type InViewportConfigCheckFn = (
  entry: IntersectionObserverEntry | undefined,
  options: InViewportConfigCheckFnOptions
) => any;
