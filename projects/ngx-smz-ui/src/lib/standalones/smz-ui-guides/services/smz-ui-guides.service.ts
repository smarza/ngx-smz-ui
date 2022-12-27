import { Injectable } from '@angular/core';
import { SmzUiGuidesState, SmzUiGuidesStep } from '../models/smz-ui-guides-state';
import { SmzDialogsService } from '../../../modules/smz-dialogs/services/smz-dialogs.service';
import { SmzDialogBuilder } from '../../../builders/smz-dialogs/dialog-builder';

@Injectable({providedIn: 'root'})
export class SmzUiGuidesService {
  constructor(private dialogs: SmzDialogsService) { }

  public start(guide: SmzUiGuidesState): void {
    console.log('start guide', guide);

    guide.context.step = 1;

    this.showCurrentStep(guide);


  }

  private showCurrentStep(guide: SmzUiGuidesState) {
    // 'BeforeOpen'

    const currentStep = guide.context.step;
    const step = guide.steps[currentStep - 1];
    const isFirst = guide.context.step === 1;
    const isLast = guide.context.step === guide.steps.length;
    const total = guide.steps.length;

    const dialogState = new SmzDialogBuilder<void>()
      .setTitle(step.title)
      .useAsOverlayPanel(step.elementId)
        .setWidth('600px')
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
          .confirm('Encerrar').buttons
          .endIf
        .if(!isLast)
          .confirm(`Avançar ${currentStep}/${total}`)
            .callback(() => {
              guide.context.step++;
              this.showCurrentStep(guide);
            })
            .buttons
          .endIf
        .dialog
      .build()

    console.log(dialogState);

    dialogState.behaviors.showAsLinkedOverlayPanel = true;
    dialogState.overlayPanel.targetElementId = step.elementId;

    this.dialogs.open(dialogState);
    // 'Open'
  }

}