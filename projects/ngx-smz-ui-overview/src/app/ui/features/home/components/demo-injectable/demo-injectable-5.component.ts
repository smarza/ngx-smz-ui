import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-demo-injectable-4',
  template: `Component Works !!`,
  changeDetection: ChangeDetectionStrategy.Default,
})

export class DemoInjectable5Component {
  public isValid = true;

  constructor() {
  }


}