import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'demo-ng-dom-content',
  template: `
  <section class="p-grid p-nogutter p-justify-start p-flex-column gap-1 p-col-12 h-full">
    <h4>demo-ng-dom-content works</h4>
    <div class="p-p-1 flex-grow p-grid p-nogutter p-flex-column p-justify-start gap-1">
      <span>Message: {{ message?.text }}</span>
      <span>Message async: {{ message$ | async }}</span>
    </div>
  </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DemoNgDomContentComponent implements OnInit, OnChanges {
  @Input() public message: { text: string };
  @Input() public message$: Observable<string>;

  constructor() { }
  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

}