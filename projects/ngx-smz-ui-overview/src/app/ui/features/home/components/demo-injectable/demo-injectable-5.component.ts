import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-demo-injectable-4',
  template: `Component Works With Error Listener!!
  <ng-container *ngIf="onValidationError$ | async as onValidationError">
    <div class="grid grid-nogutter items-center justify-end w-full">
      <span ngIf="onValidationError" style="color: red"> onValidationError Triggered</span>
    </div>
  </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})

export class DemoInjectable5Component {
  public isValid = true;
  public onValidationError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor() {
  }


}