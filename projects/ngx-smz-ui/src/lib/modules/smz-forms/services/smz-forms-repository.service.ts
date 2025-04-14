import { ChangeDetectorRef, Injectable } from '@angular/core';
import { SmzForm, SmzFormGroup } from '../models/smz-forms';

@Injectable({
    providedIn: 'root'
})
export class SmzFormsRepositoryService
{
    public forms: RepositoryForm[] = [];
    constructor() { }

    public add(form: SmzForm<any>, cdr: ChangeDetectorRef): void {
        this.forms.push(new RepositoryForm(form, cdr));
    }

    public remove(form: SmzForm<any>): void {
        this.forms = this.forms.filter(x => x.id != form.formId);
    }

    public getAllGroups(): { formId: string, group: SmzFormGroup }[] {
        return this.forms.flatMap(x => x.groups.map(group => ({
            formId: x.id,
            group: group
        })));
    }

    public applyChanges(formdId: string): void {
        this.forms
            .filter(x => x.id === formdId)
            .forEach(form => form.applyChanges())
    }
}

export class RepositoryForm {
    constructor(private form: SmzForm<any>, private cdr: ChangeDetectorRef) {

    }

    public get id(): string { return this.form.formId }

    public get groups(): SmzFormGroup[] { return this.form.groups }

    public applyChanges(): void {
        this.cdr.markForCheck();
    }


}