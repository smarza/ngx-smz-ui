import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FaqDetails, FaqCreation, FaqUpdate } from '../../models/faqs';
import { FaqsForms } from '../../functions/faqs.forms';
import { FaqsDialogs } from '../../functions/faqs.dialogs';
import { FaqsManagerService } from '../../services/faqs-manager.service';
import { SmzForm } from '../../../smz-forms/models/smz-forms';
import { SmzDialogsService } from '../../../smz-dialogs/services/smz-dialogs.service';
import { FormGroupComponent } from '../../../smz-forms/features/form-group/form-group.component';
import { Confirmable } from '../../../smz-dialogs/decorators/confirmable.decorator';

@Component({
    selector: 'smz-faqs-content',
    templateUrl: './faqs-content.component.html',
    styleUrls: ['./faqs-content.component.scss']
})
export class FaqsContentComponent implements OnInit
{
    @Input() public items: FaqDetails[];
    public formConfig: SmzForm<never>;
    public hasUnsavedForm = false;
    public keywords: string = '';
    constructor(public manager: FaqsManagerService, private cdf: ChangeDetectorRef, public dialogs: SmzDialogsService) { }

    public ngOnInit(): void
    {
        this.setupForm();
    }

    public setupForm(): void
    {
        this.formConfig = {
            formId: 'faqs-content-form',
            behaviors: { flattenResponse: true, avoidFocusOnLoad: true },
            groups: [
                FaqsForms.getFaqsFormGroup()
            ],
          };

        this.hasUnsavedForm = false;

        this.cdf.markForCheck();
    }


    @Confirmable('Confirma a criação desta pergunta/resposta ?', 'Aviso')
    public create(formComponent: FormGroupComponent): void
    {
        const data = formComponent.form.value;

        const creation: FaqCreation = {
            tag: this.manager.currentTag,
            question: data.question,
            answer: data.answer
        };

        formComponent.clearFormValues();

        this.manager.create(creation);
    }

    public update(item: FaqDetails): void
    {
        this.dialogs.open(FaqsDialogs.getDialog(item, (response: { question: string, answer: string }) =>
        {
            const update: FaqUpdate = {
                id: item.id,
                tag: this.manager.currentTag,
                question: response.question,
                answer: response.answer
            };

            this.manager.update(update);
        }));
    }

    @Confirmable('Deseja realmente excluir esta pergunta/resposta ?', 'Exclusão', true)
    public delete(data: FaqDetails): void
    {
        this.manager.delete(data.id);
    }

}
