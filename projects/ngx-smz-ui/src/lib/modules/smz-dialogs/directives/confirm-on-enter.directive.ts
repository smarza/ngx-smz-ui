import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { SmzDialogsService } from '../services/smz-dialogs.service';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[confirmOnEnter]'
})
export class ConfirmOnEnterDirective {
    @Input('confirmOnEnter') public confirmOnEnter: boolean = false;
    @Input('clickEvent') public clickEvent: string = 'onClick';
    @Input('delayConfirmation') public delayConfirmation: boolean = true;
    @Input('disabled') public disabled: boolean;
    @Input() public dialogId: string;

    constructor(private el: ElementRef, private dialogsService: SmzDialogsService) {
    }

    @HostListener('window:keydown', ['$event'])
    public handleKeyboardEvent(event: KeyboardEvent) {

        if (!this.disabled && event.keyCode === 13) {
            if (this.confirmOnEnter) {

                // console.log(this.dialogsService);

                const topDialogId = this.dialogsService.dialogRefs[this.dialogsService.dialogRefs.length - 1].id;

                if (topDialogId === this.dialogId) {
                    // console.log('me', this.dialogId);

                    if (this.delayConfirmation) {
                        setTimeout(() => {
                            this.el.nativeElement.dispatchEvent(new Event(this.clickEvent));
                        }, 300);
                    }
                    else {
                        this.el.nativeElement.dispatchEvent(new Event(this.clickEvent));
                    }
                }
            }

        }


    }

}
