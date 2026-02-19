import { AfterViewInit, Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ObjectUtils } from 'primeng/utils';
import { SmzCardsContentType, SmzCardsContentTypes } from '../models/smz-cards-contents';

@Directive({
    selector: "div[contentSelector]",
    standalone: false
})
export class SmzCardsContentSelectorDirective implements AfterViewInit, OnChanges {

  @Input() public content: SmzCardsContentTypes<unknown>;
  @Input() public data: any;
  @Input() public callback: (data: any, row: any) => string;
  constructor(private el: ElementRef) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['data']?.isFirstChange()) {
      this.setupInnerHtml();
    }
  }

  public ngAfterViewInit(): void {
    this.setupInnerHtml();
  }
  public setupInnerHtml() {

    const content = this.content;

    let value = this.getValue(this.data, content.dataPath);

    switch (content.type) {
      case SmzCardsContentType.TEXT:
        if (content.callback != null) {
          value =  content.callback(value, this.data);
        }

        if (content.maxLength != null && value.length > content.maxLength) {
          value = `${value.slice(0, content.maxLength - 1)}${content.shortenSuffix}`;
        }

        break;

      default:
        break;
    }

    this.setInnerHtml(value);
  }

  private hide() {
    this.el.nativeElement.classList.add('hidden');
  }

  private show() {
    this.el.nativeElement.classList.remove('hidden');
  }

  private setInnerHtml(html: string) {
    if (html == null) {
      this.hide();
    }
    else {
      this.show();
    }

    this.el.nativeElement.innerHTML = html;
  }

  private getValue(data: any, field: string): string {
    if (data == null) return '';
    return ObjectUtils.resolveFieldData(data, field) ?? '';
  }

}