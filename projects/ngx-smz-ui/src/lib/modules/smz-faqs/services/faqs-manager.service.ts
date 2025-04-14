import { Injectable } from '@angular/core';
import { FaqDetails, FaqCreation, FaqUpdate, DbData } from '../models/faqs';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { FaqsDbActions } from '../state/faqs.actions';
import { FaqsDbSelector } from '../state/faqs.selector';
import { SmzFaqsConfig } from '../smz-faqs.config';


@Injectable({
    providedIn: 'root'
})
export class FaqsManagerService
{
    public dbData$: Observable<DbData<FaqDetails[]>>;
    public currentTag: string;
    constructor(private store: Store, public config: SmzFaqsConfig) { }

    public loadTag(): void
    {
        // LER DADOS
        this.store.dispatch(new FaqsDbActions.LoadAll(this.currentTag));

        // ATUALIZAR SELECTOR DA LISTA
        this.dbData$ = this.store.select(FaqsDbSelector.all(this.currentTag)) as Observable<DbData<FaqDetails[]>>;
    }

    public create(data: FaqCreation): void
    {
        this.store.dispatch(new FaqsDbActions.Create(data));
    }

    public update(data: FaqUpdate): void
    {
        this.store.dispatch(new FaqsDbActions.Update(data));
    }

    public delete(id: string): void
    {
        this.store.dispatch(new FaqsDbActions.Delete(id, this.currentTag));
    }


}
