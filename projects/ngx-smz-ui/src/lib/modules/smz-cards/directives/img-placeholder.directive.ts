import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[imgPlaceholder]',
    host: {
        '(error)': 'updateUrl()',
        '(load)': 'load()',
        '[src]': 'src'
    },
    standalone: false
})
export class ImgPlaceholderDirective {
    @Input() public placeholder: string = 'assets/images/placeholder.jpeg';
    @Input() public src: string;
    @HostBinding('class') public className;

    public updateUrl() {
      this.src = this.placeholder;
    }
    public load(){
      this.className = 'image-loaded';
    }

}