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
      height: '400px',
      baseZIndex: 1000,
      centerX: false,
      centerY: false,
      offsetX: 0,
      offsetY: 0,
      highlight: true
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

  public setHeight(height: string): SmzDialogOverlayPanelBuilder<TResponse> {
    this._dialogBuilder._state.overlayPanel.height = height;
    return this;
  }

  public setZIndex(baseZIndex: number): SmzDialogOverlayPanelBuilder<TResponse> {
    this._dialogBuilder._state.overlayPanel.baseZIndex = baseZIndex;
    return this;
  }

  public offsetX(percentage: number): SmzDialogOverlayPanelBuilder<TResponse> {
    this._dialogBuilder._state.overlayPanel.offsetX = percentage;
    return this;
  }

  public offsetY(percentage: number): SmzDialogOverlayPanelBuilder<TResponse> {
    this._dialogBuilder._state.overlayPanel.offsetY = percentage;
    return this;
  }

  public horizontal(): SmzDialogOverlayPanelBuilder<TResponse> {
    this._dialogBuilder._state.overlayPanel.centerX = true;
    return this;
  }

  public vertical(): SmzDialogOverlayPanelBuilder<TResponse> {
    this._dialogBuilder._state.overlayPanel.centerY = true;
    return this;
  }

  public disableHighlight(): SmzDialogOverlayPanelBuilder<TResponse> {
    this._dialogBuilder._state.overlayPanel.highlight = false;
    return this;
  }

  public get dialog(): SmzDialogBuilder<TResponse> {
    return this._dialogBuilder;
  }
}
