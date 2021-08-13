import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({ name: 'rbkSafeHtml' })
export class rbkSafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  public transform(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}