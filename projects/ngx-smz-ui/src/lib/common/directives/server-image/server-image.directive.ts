import { AfterViewInit, Directive, ElementRef, Input, NgModule } from "@angular/core";
import { isEmpty } from '../../../builders/common/utils';
import { environment } from '@environments/environment';

@Directive({
  selector: "img[serverImage]",
})
export class ServerImageDirective implements AfterViewInit {
  constructor(private el: ElementRef) { }
  @Input() public path;
  @Input() public placeholder = 'assets/images/placeholder.jpeg';

  ngAfterViewInit(): void {
    const img = new Image();

    if (environment.serverUrl == null) {
      throw Error("ServerPathPipe needs a property named 'serverUrl' on environment constant");
    }

    if (isEmpty(this.path)) {
      this.path = this.placeholder;
    }
    else {
      this.path = `${environment.serverUrl}/${this.path}`;
    }

    img.onload = () => {
      this.setImage(this.path);
    };

    img.onerror = () => {
      console.log(5);
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
  exports: [ServerImageDirective],
  declarations: [ServerImageDirective],
  providers: [],
})
export class NgxSmzServerImageModule { }
