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
  public _root?: Element;

  public _rootMargin: string;

  public _threshold: number | number[];

  public _partial: boolean;

  public _direction: InViewportConfigDirections;

  public _checkFn?: InViewportConfigCheckFn;

  public _hash: string;

  private constructor(
    root: Element | undefined,
    rootMargin: string,
    threshold: number | number[],
    partial: boolean,
    direction: InViewportConfigDirections,
    checkFn?: InViewportConfigCheckFn
  ) {
    this._root = root;
    this._rootMargin = rootMargin;
    this._threshold = threshold;
    this._partial = partial;
    this._direction = direction;
    this._checkFn = checkFn;

    this._hash = toBase64(
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
    return this._root;
  }

  public get rootMargin(): string {
    return this._rootMargin;
  }

  public get threshold(): number | number[] {
    return this._threshold;
  }

  public get partial(): boolean {
    return this._partial;
  }

  public get direction(): InViewportConfigDirections {
    return this._direction;
  }

  public get hash(): string {
    return this._hash;
  }

  public get checkFn(): InViewportConfigCheckFn | undefined {
    return this._checkFn;
  }
}
