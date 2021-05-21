/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import type { InViewportConfigCheckFn, InViewportConfigDirections, InViewportConfigOptions } from '../types';
import {
  stringifyObject,
  toBase64,
  withCheckFn,
  withDirection,
  withPartial,
  withRoot,
  withRootMargin,
  withThreshold
} from '../utils/utils';

export class SmzViewportConfig {
  #root?: Element;

  #rootMargin: string;

  #threshold: number | number[];

  #partial: boolean;

  #direction: InViewportConfigDirections;

  #checkFn?: InViewportConfigCheckFn;

  #hash: string;

  private constructor(
    root: Element | undefined,
    rootMargin: string,
    threshold: number | number[],
    partial: boolean,
    direction: InViewportConfigDirections,
    checkFn?: InViewportConfigCheckFn
  ) {
    this.#root = root;
    this.#rootMargin = rootMargin;
    this.#threshold = threshold;
    this.#partial = partial;
    this.#direction = direction;
    this.#checkFn = checkFn;

    this.#hash = toBase64(
      stringifyObject({
        rootMargin: this.rootMargin,
        threshold: this.threshold,
        partial: this.partial,
        direction: this.direction,
        checkFn: String(this.checkFn)
      })
    );
  }

  public static fromOptions(options: Partial<InViewportConfigOptions> = {}): SmzViewportConfig {
    return new SmzViewportConfig(
      withRoot(options.root),
      withRootMargin(options.rootMargin),
      withThreshold(options.threshold),
      withPartial(options.partial),
      withDirection(options.direction),
      withCheckFn(options.checkFn)
    );
  }

  public get root(): Element | undefined {
    return this.#root;
  }

  public get rootMargin(): string {
    return this.#rootMargin;
  }

  public get threshold(): number | number[] {
    return this.#threshold;
  }

  public get partial(): boolean {
    return this.#partial;
  }

  public get direction(): InViewportConfigDirections {
    return this.#direction;
  }

  public get hash(): string {
    return this.#hash;
  }

  public get checkFn(): InViewportConfigCheckFn | undefined {
    return this.#checkFn;
  }
}
