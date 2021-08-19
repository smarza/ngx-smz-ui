import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SmzTableState } from '../../../smz-tables/models/table-state';

@Component({
    selector: 'smz-table-content',
    templateUrl: './table-content.component.html',
    styleUrls: ['./table-content.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TableContentComponent
{
    @Input() public items$: Observable<any[]>;
    @Input() public state: SmzTableState;
    public isValid = true;

}
