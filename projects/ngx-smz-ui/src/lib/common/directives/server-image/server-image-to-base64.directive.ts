import { AfterViewInit, Directive, ElementRef, HostBinding, HostListener, Input, NgModule, OnChanges, SimpleChanges } from '@angular/core';
import { isEmpty } from '../../../builders/common/utils';
import { environment } from '@environments/environment';
import { SmzDialogsService } from '../../../modules/smz-dialogs/public-api';
import { SmzDialogBuilder } from '../../../builders/smz-dialogs/dialog-builder';

@Directive({
  selector: "img[serverImageToBase64]",
  host: {
    '(error)':'updateUrl()',
    '(load)': 'load()',
    '[src]':'src'
   }
})
export class ServerImageToBase64Directive implements AfterViewInit, OnChanges {

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

    if (this.useServerPath && environment.serverUrl == null) {
      throw Error("ServerPathPipe needs a property named 'serverUrl' on environment constant");
    }

    if (isEmpty(this.path)) {
      this.path = this.placeholder;
    }
    else if (this.useServerPath){
      let path = environment.serverUrl;
      const relativeUrl = this.path;

      if (relativeUrl.startsWith("/")) {
        this.path = `${path}${relativeUrl}`;
      }
      else {
        this.path = `${path}/${relativeUrl}`;
      }
    }

    img.onload = (event) => {
      console.log('image onload', event);
      this.setImage(this.path);
    };

    img.onerror = () => {
      this.setImage(this.errorPlaceholder);
    };

    this.toDataURL(this.path, (base64) => {
      console.log('toDataURL base64', base64);
    })

    img.src = this.path;
  }

  private toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };

    xhr.open('GET', url);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Content-Type', 'image/jpg');
    xhr.responseType = 'blob';
    xhr.send();
  }

  private setImage(src: string) {
    this.el.nativeElement.setAttribute('src', src);
    this.currentSrc = src;
  }

}

@NgModule({
  imports: [],
  exports: [ServerImageToBase64Directive],
  declarations: [ServerImageToBase64Directive],
  providers: [],
})
export class NgxSmzServerImageToBase64Module { }
