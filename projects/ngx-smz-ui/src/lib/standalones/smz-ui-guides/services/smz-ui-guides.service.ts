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

  private showCurrentStep(guide: SmzUiGuidesState) {

    const currentStep = guide.context.step;
    const step = guide.steps[currentStep - 1];
    const isFirst = guide.context.step === 1;
    const isLast = guide.context.step === guide.steps.length;
    const total = guide.steps.length;

    step.callbacks.init(step);

    const title = guide.showSummaryCount ? `<div class="grid grid-nogutter items-center justify-between w-full gap-2"><div class="col">${step.title}</div> <div class="text-sm font-bold">(${currentStep}/${total})</div><div>` : step.title;

    const dialogState = new SmzDialogBuilder<void>()
      .setTitle(title)
      .useAsOverlayPanel(step.elementId)
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
        .dialog
      .markdown(step.content)
      .buttons()
        .if(!guide.allowBackNavigation || isFirst)
          .cancel().hide().buttons
          .endIf
        .if(guide.allowBackNavigation && !isFirst)
          .cancel(guide.locale.previousButton)
            .callback(() => {
              guide.context.step--;
              this.showCurrentStep(guide);
            })
            .buttons
          .endIf
        .if(isLast)
          .confirm(guide.locale.concludeButton)
            .callback(() => {
              step.callbacks.concluded(step);
            })
            .buttons
          .endIf
        .if(!isLast)
          .confirm(guide.locale.nextButton)
            .callback(() => {
              guide.context.step++;
              step.callbacks.concluded(step);
              this.showCurrentStep(guide);
            })
            .buttons
          .endIf
        .dialog
      .build()

    this.dialogs.open(dialogState);
  }

}