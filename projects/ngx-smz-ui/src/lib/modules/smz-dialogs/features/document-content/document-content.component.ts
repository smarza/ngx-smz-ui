import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SmzDocumentState } from '../../../smz-documents/models/smz-document';

@Component({
    selector: 'smz-document-content',
    templateUrl: './document-content.component.html',
    styleUrls: ['./document-content.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DocumentContentComponent
{
    @Input() public items$: Observable<any[]>;
    @Input() public state: SmzDocumentState;
    public isValid = true;

}
