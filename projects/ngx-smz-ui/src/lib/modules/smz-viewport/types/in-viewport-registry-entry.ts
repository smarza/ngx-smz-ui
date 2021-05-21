
import type { Observable } from 'rxjs';

export interface InViewportRegistryEntry {
  root: Element | null;
  configHash: string;
  targets: Set<Element>;
  observer: IntersectionObserver;
}

export type InViewportRegistryEntries = InViewportRegistryEntry[];

export type InViewportTrigger = Observable<IntersectionObserverEntry>;
