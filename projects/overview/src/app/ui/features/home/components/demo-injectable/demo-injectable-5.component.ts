import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-demo-injectable-4',
  template: `Component Works With Error Listener!!
  @if (onValidationError$ | async; as onValidationError) {
    <div class="grid grid-nogutter items-center justify-end w-full">
      @if (onValidationError) {
        <span style="color: red"> onValidationError Triggered</span>
      }
    </div>
  }
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})

export class DemoInjectable5Component {
  public isValid = true;
  public onValidationError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public test = '-';

  constructor() {
  }

}