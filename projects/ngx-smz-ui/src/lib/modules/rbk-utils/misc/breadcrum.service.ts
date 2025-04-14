import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {

    private itemsSource = new Subject<MenuItem[]>();

    public itemsHandler = this.itemsSource.asObservable();

    public setItems(items: MenuItem[]): void {
        this.itemsSource.next(items);
    }
}
