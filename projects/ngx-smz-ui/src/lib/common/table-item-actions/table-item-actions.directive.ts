import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[tableItemAction]'
})
export class TableItemActionsDirective implements OnInit {
    @Input() public isClickable: boolean;
    @Input() public item: any;
    @Input() public callback: (event) => void;

    constructor(private renderer: Renderer2, private hostElement: ElementRef) {
    }

    public ngOnInit(): void {
        if (this.isClickable) {
            this.renderer.addClass(this.hostElement.nativeElement, 'clickable');
        }
    }

    @HostListener('click', ['$event'])
    public onClick(event: any): void {
        const isMenu = event.srcElement?.id === 'action-button' || event.target?.parentElement?.id === 'action-button' ;

        if (!isMenu && this.isClickable && this.callback != null) {
            this.callback(this.item);
        }

    }

}