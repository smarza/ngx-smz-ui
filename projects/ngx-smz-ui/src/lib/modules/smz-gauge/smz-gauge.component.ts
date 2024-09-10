import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SmzGaugeState } from './smz-gauge.types';
import { CommonModule } from '@angular/common';
import { SmzSvgGaugeComponent } from './smz-svg-gauge.component';
import { BehaviorSubject, debounceTime, merge, Subject, takeUntil, throttleTime } from 'rxjs';

@Component({
  standalone: true,
  selector: 'smz-gauge',
  imports: [CommonModule, SmzSvgGaugeComponent],
  template: `
  <ng-container *ngIf="state; else noState">
    <div class="flex flex-col items-center justify-center gap-3">
      <div [ngClass]="state.titleStyle" *ngIf="state.showTitle">{{state.title}}</div>
      <app-svg-gauge
        [title]="state.title"
        [min]="state.min"
        [max]="state.max"
        [value]="throttledValue$ | async"
        [unit]="state.unit"
        [size]="state.size"
        [valuePipeFormat]="state.valuePipeFormat"
        [valueFontWeight]="state.valueFontWeight"
        [valueFontColor]="state.valueFontColor"
        [minMaxPipeFormat]="state.minMaxPipeFormat"
        [minMaxFontWeight]="state.minMaxFontWeight"
        [minMaxFontColor]="state.minMaxFontColor"
        [thresholds]="state.thresholds"
        [showMin]="state.showMin"
        [showMax]="state.showMax"
        [backgroundColor]="state.backgroundColor">
      </app-svg-gauge>
    </div>
  </ng-container>
  <ng-template #noState>
    <div class="gauge-container">
      <div class="gauge-title">No state was provided to Gauge</div>
    </div>
  </ng-template>
  `,
  styles: [
    `
    `
  ]
})
export class SmzGaugeComponent implements OnInit, OnDestroy {
  @Input() state: SmzGaugeState;

  private throttledValue = new BehaviorSubject<number>(0);
  public throttledValue$ = this.throttledValue.asObservable();
  private destroy$ = new Subject<void>();

  constructor() { }

  ngOnInit(): void {

    if (this.state && this.state.debugMode) {
      console.log('SmzGaugeState', this.state);
    }

    if (this.state && this.state.value$) {
      // Combinação de throttleTime com debounceTime para garantir emissão do último valor
      const throttled$ = this.state.value$.pipe(
        throttleTime(this.state.valueThrottleTime),
        takeUntil(this.destroy$)
      );

      const debounced$ = this.state.value$.pipe(
        debounceTime(this.state.valueThrottleTime), // Debounce com mesmo intervalo do throttle para pegar o último
        takeUntil(this.destroy$)
      );

      merge(throttled$, debounced$)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(value => {
          this.throttledValue.next(value);
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}