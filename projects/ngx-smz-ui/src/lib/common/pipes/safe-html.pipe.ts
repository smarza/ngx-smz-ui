import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform
{
    constructor(private sanitizer: DomSanitizer) { }
    transform(data)
    {
        return this.sanitizer.bypassSecurityTrustHtml(data);
    }
}


@Pipe({ name: 'safeUrl' })
export class SafeUrlPipe implements PipeTransform
{
    constructor(private sanitizer: DomSanitizer) { }
    transform(url)
    {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}

@NgModule({
    declarations: [SafeHtmlPipe, SafeUrlPipe],
    exports: [SafeHtmlPipe, SafeUrlPipe],
  })
  export class SafeContentPipeModule {}