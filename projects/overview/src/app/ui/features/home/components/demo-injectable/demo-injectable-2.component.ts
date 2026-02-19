import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-demo-injectable-2',
  template: `
  <div class="border-2 border-solid border-slate-700 bg-blue-300 grid grid-nogutter items-center justify-center text-lg font-bold h-full">app-demo-injectable-2<div>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})

export class DemoInjectable2Component {

  constructor() {
  }


}