
import type { InViewportConfigCheckFn } from './in-viewport-config-check-fn';
import type { InViewportConfigDirections } from './in-viewport-config-directions';

export interface InViewportConfigOptions {
  root: Element;
  rootMargin: string;
  threshold: number | number[];
  partial: boolean;
  direction: InViewportConfigDirections;
  checkFn: InViewportConfigCheckFn;
}
