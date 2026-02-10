import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[imgPlaceholder]',
    host: {
        '(error)': 'updateUrl()',
        '(load)': 'load()'
    },
    standalone: false
})
export class ImgPlaceholderDirective {
    @Input() public placeholder: string = 'assets/images/placeholder.jpeg';
    @HostBinding('class') public className: string;

    constructor(private readonly elementRef: ElementRef<HTMLImageElement>) {}

    public updateUrl(): void {
        this.elementRef.nativeElement.src = this.placeholder;
    }

    public load(): void {
        this.className = 'image-loaded';
    }
}