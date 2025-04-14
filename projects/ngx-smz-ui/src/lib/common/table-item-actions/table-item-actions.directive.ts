import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[tableItemAction]',
    standalone: false
})
export class TableItemActionsDirective implements OnInit {
    @Input() public isClickable: boolean;
    @Input() public item: any;
    @Input() public callback: (event) => void;
    @Input() public expandRowOnClick: boolean;

    constructor(private renderer: Renderer2, private hostElement: ElementRef) {
    }

    public ngOnInit(): void {
        if (this.isClickable) {
            this.renderer.addClass(this.hostElement.nativeElement, 'clickable');
        }
    }

    @HostListener('click', ['$event'])
    public onClick(event: any): void {
        const isMenu = event.srcElement?.id === 'action-button' || event.target?.parentElement?.id === 'action-button' || event.srcElement?.parentElement?.parentElement?.id === 'action-button';
        // console.log('onClick');
        // console.log('event', event);
        // console.log('isMenu', isMenu);
        // console.log('isClickable', this.isClickable);
        // console.log('callback', this.callback);
        // console.log('item', this.item);

        if (!isMenu && this.isClickable && this.callback != null) {
            this.callback(this.item);
        }

        if (!isMenu && this.expandRowOnClick) {
            this.item._isExpanded = !this.item._isExpanded;
        }

    }

}