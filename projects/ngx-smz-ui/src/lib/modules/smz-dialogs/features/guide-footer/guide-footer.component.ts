import { Component, inject, ViewEncapsulation } from '@angular/core';
import { SmzDynamicDialogConfig } from '../../models/smz-dialogs';
import { DynamicDialogRef } from '../../dynamicdialog/dynamicdialog-ref';
import { SmzUiGuidesService } from '../../../../standalones/smz-ui-guides/services/smz-ui-guides.service';

@Component({
    selector: 'smz-guide-footer',
    templateUrl: './guide-footer.component.html',
    styleUrls: ['./guide-footer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class GuideFooterComponent {
    private readonly refService = inject(DynamicDialogRef);
    public readonly dialogConfig = inject(SmzDynamicDialogConfig);
    private readonly guidesServices = inject(SmzUiGuidesService);

    public previous(): void {
        const overlay = this.dialogConfig.data?.overlayPanel;

        if (overlay) {
            overlay.state.context.step--;
            this.closeCurrentDialog();
            this.guidesServices.showCurrentStep(overlay.state);
        }
    }

    public next(): void {
        const overlay = this.dialogConfig.data?.overlayPanel;

        if (overlay) {
            const step = overlay.state.steps[overlay.state.context.step];
            overlay.callbacks.concluded(step);

            overlay.state.context.step++;
            this.closeCurrentDialog();
            this.guidesServices.showCurrentStep(overlay.state);
        }
    }

    public conclude(): void {
        this.closeCurrentDialog();
    }

    public closeCurrentDialog(): void {
        this.refService.close();
    }

}
