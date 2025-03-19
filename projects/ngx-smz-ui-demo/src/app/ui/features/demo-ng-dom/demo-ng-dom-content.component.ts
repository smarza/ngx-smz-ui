import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'demo-ng-dom-content',
    template: `
  <section class="grid grid-nogutter justify-start flex-col gap-1 col-12 h-full">
    <h4>demo-ng-dom-content works</h4>
    <div class="p-1 flex-grow grid grid-nogutter flex-col justify-start gap-1">
      <span>Message: {{ message?.text }}</span>
      <span>Message async: {{ message$ | async }}</span>
    </div>
  </section>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
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