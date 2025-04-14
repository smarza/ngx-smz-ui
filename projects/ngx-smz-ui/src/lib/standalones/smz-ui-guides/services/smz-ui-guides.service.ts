import { Injectable } from '@angular/core';
import { SmzUiGuidesState } from '../models/smz-ui-guides-state';
import { SmzDialogsService } from '../../../modules/smz-dialogs/services/smz-dialogs.service';
import { SmzDialogBuilder } from '../../../builders/smz-dialogs/dialog-builder';

@Injectable({providedIn: 'root'})
export class SmzUiGuidesService {
  constructor(private dialogs: SmzDialogsService) { }

  public start(guide: SmzUiGuidesState): void {
    guide.context.step = 1;
    this.showCurrentStep(guide);
  }

  public showCurrentStep(guide: SmzUiGuidesState) {

    const currentStep = guide.context.step;
    const step = guide.steps[currentStep - 1];

    guide.callbacks.init(step);

    const dialogState = new SmzDialogBuilder<void>()
      .setTitle(step.title)
      .useAsOverlayPanel(step.elementId, guide)
        .setWidth(step.size.width)
        .setHeight(step.size.height)
        .setStyles(step.style.styleClass)
        .if(!step.highlight.enabled)
          .disableHighlight()
          .endIf
        .setHighlightMargin(step.highlight.margin)
        .offsetX(step.alignment.offsetX)
        .offsetY(step.alignment.offsetY)
        .setHighlightStyleClass(guide.styleClass.highlight.styleClass)
        .setOverlayPanelStylesClass(guide.styleClass.overlay.styleClass)
        .setOverlayBlendStylesClass(guide.styleClass.blend.styleClass)
        .setConcludedCallback((step) => guide.callbacks.concluded(step))
        .dialog
      .markdown(step.content)
      .build()

    this.dialogs.open(dialogState);
  }

}