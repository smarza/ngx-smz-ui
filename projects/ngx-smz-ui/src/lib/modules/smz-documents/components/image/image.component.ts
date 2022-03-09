import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { SmzDocumentConfig } from '../../models/smz-document-config';
import { SmzDocumentImage } from '../../models/smz-document-features';

@Component({
  selector: 'smz-document-image',
  templateUrl: 'image.component.html'
})

export class SmzDocumentImageComponent implements OnInit {
  @Input() public data: SmzDocumentImage;
  @Input() public config: SmzDocumentConfig;
  public base64: string;
  constructor(private cdf: ChangeDetectorRef) { }
  ngOnInit() {
    this.toDataURL(this.data.image.src, (dataUrl) => {
      this.base64 = dataUrl;
      this.cdf.markForCheck();
    });
  }

  toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
}
