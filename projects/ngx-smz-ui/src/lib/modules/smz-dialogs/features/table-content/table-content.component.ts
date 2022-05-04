import { Component, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SmzTableState } from '../../../smz-tables/models/table-state';

@Component({
    selector: 'smz-table-content',
    templateUrl: './table-content.component.html',
    styleUrls: ['./table-content.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableContentComponent
{
    @Input() public items$: Observable<any[]>;
    @Input() public state: SmzTableState;
    public get isValid() {
        return this.state == null ? true : this.state.isValid;
    };
    public onValidationError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

}
