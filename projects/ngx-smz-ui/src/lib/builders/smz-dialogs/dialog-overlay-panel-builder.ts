import { SmzDialogBuilder } from './dialog-builder';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';

export class SmzDialogOverlayPanelBuilder<TResponse> extends SmzBuilderUtilities<SmzDialogOverlayPanelBuilder<TResponse>> {
  protected that = this;
  constructor(public _dialogBuilder: SmzDialogBuilder<TResponse>, private targetElementId: string) {
    super();

    this._dialogBuilder._state.overlayPanel = {
      targetElementId,
      styleClass: '',
      width: '400px',
      baseZIndex: 1000
    };

  }

  public setStyles(styleClass: string): SmzDialogOverlayPanelBuilder<TResponse> {
    this._dialogBuilder._state.overlayPanel.styleClass = styleClass;
    return this;
  }

  public setWidth(width: string): SmzDialogOverlayPanelBuilder<TResponse> {
    this._dialogBuilder._state.overlayPanel.width = width;
    return this;
  }

  public setZIndex(baseZIndex: number): SmzDialogOverlayPanelBuilder<TResponse> {
    this._dialogBuilder._state.overlayPanel.baseZIndex = baseZIndex;
    return this;
  }

  public get dialog(): SmzDialogBuilder<TResponse> {
    return this._dialogBuilder;
  }
}
