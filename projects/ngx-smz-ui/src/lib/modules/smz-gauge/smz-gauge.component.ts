import { Component, Input, OnInit } from '@angular/core';
import { SmzGaugeState } from './smz-gauge.types';
import { CommonModule } from '@angular/common';
import { SmzSvgGaugeComponent } from './smz-svg-gauge.component';

@Component({
  standalone: true,
  selector: 'smz-gauge',
  imports: [CommonModule, SmzSvgGaugeComponent],
  template: `
  <ng-container *ngIf="state; else noState">
      <app-svg-gauge [title]="state.title" [min]="state.min" [max]="state.max" [value]="state.value$ | async" [unit]="state.unit" [numberPipeFormat]="state.numberPipeFormat"></app-svg-gauge>
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
export class SmzGaugeComponent implements OnInit {
  @Input() state: SmzGaugeState;

  constructor() { }

  ngOnInit(): void {
    console.log('smz-gauge', this.state);
  }

  calculatePercentage(value: number): number {
    if (this.state.max <= this.state.min) {
      return 0;
    }
    const percentage = ((value - this.state.min) / (this.state.max - this.state.min)) * 100;
    return Math.max(0, Math.min(100, percentage)); // Limita o valor entre 0 e 100
  }

}