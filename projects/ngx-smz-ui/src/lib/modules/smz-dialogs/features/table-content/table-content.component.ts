import { Component, ViewEncapsulation, Input } from '@angular/core';
// import { SmzTableState } from 'ngx-smz-ui';
import { Observable } from 'rxjs';

@Component({
    selector: 'smz-table-content',
    templateUrl: './table-content.component.html',
    styleUrls: ['./table-content.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TableContentComponent
{
    @Input() public items$: Observable<any[]>;
    // @Input() public state: SmzTableState;
    public isValid = true;

}
