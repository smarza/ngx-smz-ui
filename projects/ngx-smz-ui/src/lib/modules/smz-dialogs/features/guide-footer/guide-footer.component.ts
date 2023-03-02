import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SmzDynamicDialogConfig } from '../../models/smz-dialogs';
import { DynamicDialogRef } from '../../dynamicdialog/dynamicdialog-ref';
import { UntilDestroy } from '@ngneat/until-destroy';
import { SmzUiGuidesService } from '../../../../standalones/smz-ui-guides/services/smz-ui-guides.service';

@UntilDestroy()
@Component({
    selector: 'smz-guide-footer',
    templateUrl: './guide-footer.component.html',
    styleUrls: ['./guide-footer.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class GuideFooterComponent implements OnInit {

    constructor(public refService: DynamicDialogRef, public dialogConfig: SmzDynamicDialogConfig, public guidesServices: SmzUiGuidesService) { }

    public ngOnInit(): void {
    }

    public previous(): void {
        const overlay = this.dialogConfig.data.overlayPanel;

        overlay.state.context.step--;
        this.closeCurrentDialog();
        this.guidesServices.showCurrentStep(overlay.state);
    }

    public next(): void {
        const overlay = this.dialogConfig.data.overlayPanel;

        const step = overlay.state.steps[overlay.state.context.step];
        overlay.callbacks.concluded(step);

        overlay.state.context.step++;
        this.closeCurrentDialog();
        this.guidesServices.showCurrentStep(overlay.state);
    }

    public conclude(): void {
        this.closeCurrentDialog();
    }

    public closeCurrentDialog(): void {
        this.refService.close();
    }

}
