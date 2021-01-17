import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FaqDetails, FaqCreation, FaqUpdate } from '../../models/faqs';
import { FaqsForms } from '../../functions/faqs.forms';
import { FaqsDialogs } from '../../functions/faqs.dialogs';
import { FaqsManagerService } from '../../services/faqs-manager.service';
import { SmzDialogsService } from 'ngx-smz-dialogs';

@Component({
    selector: 'smz-faqs-content',
    templateUrl: './faqs-content.component.html',
    styleUrls: ['./faqs-content.component.scss']
})
export class FaqsContentComponent implements OnInit
{
    @Input() public items: FaqDetails[];
    // public formConfig: FormGroupConfig;
    public hasUnsavedForm = false;
    public keywords: string = '';
    constructor(public manager: FaqsManagerService, private cdf: ChangeDetectorRef, public dialogs: SmzDialogsService) { }

    public ngOnInit(): void
    {
        this.setupForm();
    }

    public setupForm(): void
    {
        // this.formConfig = FaqsForms.getForm();
        // this.hasUnsavedForm = false;

        // this.cdf.markForCheck();
    }


    public create(formComponent: any): void
    {
        // const data = formComponent.form.value;

        // this.dialogs.showConfirmation('Confirma a criação deste comentário ?', () =>
        // {
        //     const creation: FaqCreation = {
        //         tag: this.manager.currentTag,
        //         question: data.question,
        //         answer: data.answer
        //     };

        //     formComponent.clearFormValues();

        //     this.manager.create(creation);
        // });
    }

    public update(item: FaqDetails): void
    {
        // this.dialogs.showFormGroup(FaqsDialogs.getDialog(item, (response: any) =>
        // {
        //     const data = response.data as any;

        //     const update: FaqUpdate = {
        //         id: item.id,
        //         tag: this.manager.currentTag,
        //         question: data.question,
        //         answer: data.answer
        //     };

        //     this.manager.update(update);
        // }));
    }

    public delete(data: FaqDetails): void
    {
        // this.dialogs.showConfirmation('Deseja realmente excluir esta pergunta ?', () =>
        // {
        //     this.manager.delete(data.id);
        // });
    }

}
