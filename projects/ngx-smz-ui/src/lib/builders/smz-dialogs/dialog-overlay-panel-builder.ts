import { SmzDialogBuilder } from './dialog-builder';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiGuidesState, SmzUiGuidesStep } from '../../standalones/smz-ui-guides/models/smz-ui-guides-state';

export class SmzDialogOverlayPanelBuilder<TResponse> extends SmzBuilderUtilities<SmzDialogOverlayPanelBuilder<TResponse>> {
  protected override that = this;
  constructor(public _dialogBuilder: SmzDialogBuilder<TResponse>, private targetElementId: string, private guideState: SmzUiGuidesState) {
    super();

    this._dialogBuilder._state.overlayPanel = {
      state: guideState,
      targetElementId,
      styleClass: '',
      width: '400px',
      height: '400px',
      baseZIndex: 1000,
      centerX: false,
      centerY: false,
      offsetX: 0,
      offsetY: 0,
      highlight: true,
      hightlightMargin: 0,
      hightlightStyleClass: '',
      overlayPanelStylesClass: '',
      overlayBlendStylesClass: '',
      callbacks: {
        init: () => {},
        concluded: () => {}
      },
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

  public setHighlightMargin(margin: number): SmzDialogOverlayPanelBuilder<TResponse> {
    this._dialogBuilder._state.overlayPanel.hightlightMargin = margin;
    return this;
  }

  public setHighlightStyleClass(styleClass: string): SmzDialogOverlayPanelBuilder<TResponse> {
    this._dialogBuilder._state.overlayPanel.hightlightStyleClass = styleClass;
    return this;
  }

  public setOverlayPanelStylesClass(styleClass: string): SmzDialogOverlayPanelBuilder<TResponse> {
    this._dialogBuilder._state.overlayPanel.overlayPanelStylesClass = styleClass;
    return this;
  }

    public setOverlayBlendStylesClass(styleClass: string): SmzDialogOverlayPanelBuilder<TResponse> {
    this._dialogBuilder._state.overlayPanel.overlayBlendStylesClass = styleClass;
    return this;
  }

  public setInitCallback(callback: (step: SmzUiGuidesStep) => void): SmzDialogOverlayPanelBuilder<TResponse> {
    this._dialogBuilder._state.overlayPanel.callbacks.init = callback;
    return this;
  }

  public setConcludedCallback(callback: (step: SmzUiGuidesStep) => void): SmzDialogOverlayPanelBuilder<TResponse> {
    this._dialogBuilder._state.overlayPanel.callbacks.concluded = callback;
    return this;
  }

  public get dialog(): SmzDialogBuilder<TResponse> {
    return this._dialogBuilder;
  }
}
