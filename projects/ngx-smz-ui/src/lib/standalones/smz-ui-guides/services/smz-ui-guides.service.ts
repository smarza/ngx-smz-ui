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

    const dialogState = new SmzDialogBuilder<void>()
      .setTitle(step.title)
      .useAsOverlayPanel(step.elementId)
        .setWidth(step.size.width)
        .setHeight(step.size.height)
        .setStyles(step.style.styleClass)
        .if(!guide.highlight.enabled)
          .disableHighlight()
          .endIf
        .if(step.alignment.centerX)
          .horizontal()
          .endIf
        .if(step.alignment.centerY)
          .vertical()
          .endIf
        .offsetX(step.alignment.offsetX)
        .offsetY(step.alignment.offsetY)
        .dialog
      .markdown(step.content)
      .buttons()
        .if(isFirst)
          .cancel().hide().buttons
          .endIf
        .if(!isFirst)
          .cancel('Anterior')
            .callback(() => {
              guide.context.step--;
              this.showCurrentStep(guide);
            })
            .buttons
          .endIf
        .if(isLast)
          .confirm('Encerrar')
            .callback(() => {
              step.callbacks.concluded(step);
            })
            .buttons
          .endIf
        .if(!isLast)
          .confirm(`Avançar ${currentStep}/${total}`)
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