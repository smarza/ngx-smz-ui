import { AfterViewInit, Directive, ElementRef, Input, NgModule, OnChanges, SimpleChanges } from '@angular/core';
import { isEmpty } from '../../../builders/common/utils';

@Directive({
    selector: "img[safeImage]",
    standalone: false
})
export class SafeImageDirective implements AfterViewInit, OnChanges {
  constructor(private el: ElementRef) { }
  @Input() public path;
  @Input() public placeholder = 'assets/images/placeholder.jpeg';

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['path']?.isFirstChange()) {
      this.setupImage();
    }
  }

  public ngAfterViewInit(): void {
    this.setupImage();
  }

  public setupImage() {

    const img = new Image();

    if (isEmpty(this.path)) {
      this.path = this.placeholder;
    }

    img.onload = () => {
      this.setImage(this.path);
    };

    img.onerror = () => {
      this.setImage(this.placeholder);
    };

    img.src = this.path;
  }

  private setImage(src: string) {
    this.el.nativeElement.setAttribute('src', src);
  }

}

@NgModule({
  imports: [],
  exports: [SafeImageDirective],
  declarations: [SafeImageDirective],
  providers: [],
})
export class NgxSmzSafeImageModule { }
