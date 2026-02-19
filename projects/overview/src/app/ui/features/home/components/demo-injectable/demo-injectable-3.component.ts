import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-demo-injectable-3',
  template: `
  <div class="border-2 border-solid border-orange-700 bg-orange-300 grid grid-nogutter items-center justify-center text-lg font-bold h-full">app-demo-injectable-3<div>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})

export class DemoInjectable3Component {

  constructor() {
  }


}