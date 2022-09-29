import { AfterViewInit, Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SmzCardsColumn } from '../models/smz-cards-state';
import { ObjectUtils } from 'primeng/utils';
import { SmzCardsContentType } from '../models/smz-cards-contents';

@Directive({
  selector: "div[contentSelector]",
})
export class SmzCardsContentSelectorDirective implements AfterViewInit, OnChanges {

  @Input() public column: SmzCardsColumn;
  @Input() public data: any;
  @Input() public index: number;
  constructor(private el: ElementRef) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes.data?.isFirstChange()) {
      this.setupInnerHtml();
    }
  }

  public ngAfterViewInit(): void {
    this.setupInnerHtml();
  }
  public setupInnerHtml() {

    const content = this.column.content;

    let value = this.getValue(this.data, content.dataPath);

    switch (content.type) {
      case SmzCardsContentType.TEXT:
        // value = this.getValue(this.data, content.dataPath);
        break;

      case SmzCardsContentType.DATA_TRANSFORM:
        value = content.callback(value, this.data, this.index);
        break;

      default:
        break;
    }

    this.setInnerHtml(value);
  }

  private setInnerHtml(html: string) {
    this.el.nativeElement.innerHTML = html;
  }

  private getValue(data: any, field: string): string {
    if (data == null) return '';
    return ObjectUtils.resolveFieldData(data, field) ?? '';
  }

}