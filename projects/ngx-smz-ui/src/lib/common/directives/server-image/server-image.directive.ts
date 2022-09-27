import { AfterViewInit, Directive, ElementRef, HostListener, Input, NgModule, OnChanges, SimpleChanges } from '@angular/core';
import { isEmpty } from '../../../builders/common/utils';
import { environment } from '@environments/environment';
import { SmzDialogsService } from '../../../modules/smz-dialogs/public-api';
import { SmzDialogBuilder } from '../../../builders/smz-dialogs/dialog-builder';

@Directive({
  selector: "img[serverImage]",
})
export class ServerImageDirective implements AfterViewInit, OnChanges {

  @Input() public path;
  @Input() public placeholder = 'assets/images/placeholder.jpeg';
  @Input() public maximize = false;
  @Input() public title = '';
  @Input() public useServerPath = true;
  public currentSrc;
  constructor(private el: ElementRef, private dialogs: SmzDialogsService) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes.path?.isFirstChange()) {
      this.setupImage();
    }
  }

  public ngAfterViewInit(): void {
    this.setupImage();

    if (this.maximize) {
      this.el.nativeElement.classList.add('cursor-zoom-in');
    }
  }

  @HostListener('click', ['$event'])
    public onClick(event: any): void {

        if (!this.maximize)
            return ;

        this.dialogs.open(new SmzDialogBuilder()
          .setTitle(this.title)
          .allowMaximize()
          .setLayout('EXTRA_LARGE', 'col-8')
          .setLayout('LARGE', 'col-10')
          .setLayout('MEDIUM', 'col-12')
          .html([`<img src="${this.currentSrc}" class="w-full">`])
          .hideFooter()
          .build());
    }

  public setupImage() {

    const img = new Image();

    if (this.useServerPath && environment.serverUrl == null) {
      throw Error("ServerPathPipe needs a property named 'serverUrl' on environment constant");
    }

    if (isEmpty(this.path)) {
      this.path = this.placeholder;
    }
    else if (this.useServerPath){
      this.path = `${environment.serverUrl}/${this.path}`;
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
    this.currentSrc = src;
  }

}

@NgModule({
  imports: [],
  exports: [ServerImageDirective],
  declarations: [ServerImageDirective],
  providers: [],
})
export class NgxSmzServerImageModule { }
