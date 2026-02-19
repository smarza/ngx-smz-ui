import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'smz-message-from-observablecontent',
    templateUrl: './message-from-observable-content.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class MessageFromObservableContentComponent
{
    @Input() public data: Observable<string>;
    public isValid = true;

}
