import { Component,Input,ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'smz-tag-message',
    template: `
        <div *ngIf="severity"
          aria-live="polite"
          [ngStyle]="style"
          [class]="'p-inline-message p-component p-inline-message p-inline-message-' + severity + ' ' + styleClass"
          [ngClass]="{ 'w-full': grow }">
            <span *ngIf="icon" class="p-inline-message-icon" [ngClass]="icon"></span>
            <div *ngIf="!escape; else escapeOut">
                <span *ngIf="!escape" class="p-inline-message-text" [innerHTML]="text"></span>
            </div>
            <ng-template #escapeOut>
                <span *ngIf="escape" class="p-inline-message-text">{{text}}</span>
            </ng-template>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./tag-message.component.css'],
    standalone: false
})
export class SmzTagMessage {

    @Input() severity: string;

    @Input() text: string;

    @Input() escape: boolean = true;
    @Input() grow: boolean = true;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() icon: any;

}