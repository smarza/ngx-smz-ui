import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'contentErrors'
})

export class SmzContentErrorsPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(errors: string[]): SafeHtml{

    const data = errors.join('<br>');

    return this.sanitizer.bypassSecurityTrustHtml(data);

  }

}
