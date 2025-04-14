import { AfterViewInit, Directive, ElementRef, HostBinding, HostListener, inject, Input, NgModule, OnChanges, SimpleChanges } from '@angular/core';
import { isEmpty } from '../../../builders/common/utils';
import { SmzDialogsService } from '../../../modules/smz-dialogs/public-api';
import { SmzDialogBuilder } from '../../../builders/smz-dialogs/dialog-builder';
import { SmzEnvironment } from '../../../config';

@Directive({
    selector: "img[serverImage]",
    host: {
        '(error)': 'updateUrl()',
        '(load)': 'load()',
        '[src]': 'src'
    },
    standalone: false
})
export class ServerImageDirective implements AfterViewInit, OnChanges {
  private readonly environment = inject(SmzEnvironment);
  @Input() public src: string;
  @Input() public path: string;
  @Input() public placeholder = 'assets/images/placeholder.jpeg';
  @Input() public errorPlaceholder = 'assets/images/error-placeholder.jpeg';
  @Input() public maximize = false;
  @Input() public openMaximized = false;
  @Input() public title = '';
  @Input() public useServerPath = true;
  @HostBinding('class') public className;
  public currentSrc;
  constructor(private el: ElementRef, private dialogs: SmzDialogsService) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['path']?.isFirstChange()) {
      this.setupImage();
    }
  }

  public ngAfterViewInit(): void {
    this.setupImage();

    if (this.maximize) {
      this.el.nativeElement.classList.add('cursor-zoom-in');
    }
  }

  public updateUrl() {
    this.src = this.errorPlaceholder;
  }

  public load(){
    this.className = 'image-loaded';
  }

  @HostListener('click', ['$event'])
    public onClick(event: any): void {

        if (!this.maximize)
            return ;

        this.dialogs.open(new SmzDialogBuilder()
          .setTitle(this.title)
          .allowMaximize()
          .if(this.openMaximized)
            .openMaximized()
            .endIf
          .setLayout('EXTRA_LARGE', 'col-8')
          .setLayout('LARGE', 'col-10')
          .setLayout('MEDIUM', 'col-12')
          .html([`<img src="${this.currentSrc}" class="w-full">`])
          .hideFooter()
          .build());
    }

  public setupImage() {

    const img = new Image();

    if (this.useServerPath && this.environment.serverUrl == null) {
      throw Error("ServerPathPipe needs a property named 'serverUrl' on environment constant");
    }

    if (isEmpty(this.path)) {
      this.path = this.placeholder;
    }
    else if (this.useServerPath){
      let path = this.environment.serverUrl;
      const relativeUrl = this.path;

      if (relativeUrl.startsWith("/")) {
        this.path = `${path}${relativeUrl}`;
      }
      else {
        this.path = `${path}/${relativeUrl}`;
      }

    }

    img.onload = (event) => {
      this.setImage(this.path);
    };

    img.onerror = () => {
      this.setImage(this.errorPlaceholder);
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
