import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SmzGaugeState, SmzGaugeThreshold } from './smz-gauge.types';

@Component({
  standalone: true,
  selector: 'app-svg-gauge',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `

<svg [attr.width]="size" [attr.height]="size" [attr.viewBox]="'0 0 ' + size + ' ' + size">
  <!-- Definição de Gradiente Linear -->
  <defs>
    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
      <ng-container *ngFor="let threshold of thresholds">
        <stop [attr.offset]="threshold.value + '%'" [attr.stop-color]="threshold.color" stop-opacity="1"></stop>
      </ng-container>
    </linearGradient>
  </defs>

  <!-- Círculo de Fundo -->
  <circle
    [attr.cx]="size / 2"
    [attr.cy]="size / 2"
    [attr.r]="radius"
    [attr.stroke-width]="strokeWidth"
    [attr.stroke]="backgroundColor"
    stroke-linecap="round"
    [attr.stroke-dasharray]="dashArray"
    [attr.transform]="transformBase"
    fill="transparent">
  </circle>

  <!-- Arco do Gauge -->
  <circle
    class="gauge_percent"
    [attr.cx]="size / 2"
    [attr.cy]="size / 2"
    [attr.r]="radius"
    [attr.stroke-width]="strokeWidth"
    [attr.stroke]="'url(#grad)'"
    fill="transparent"
    stroke-linecap="round"
    [attr.stroke-dasharray]="dashArray"
    [attr.stroke-dashoffset]="dashOffset"
    [attr.transform]="transformProgress"
    style="transition: stroke-dashoffset 0.3s;">
  </circle>

  <!-- Texto Central -->
  <text
    x="50%"
    y="50%"
    text-anchor="middle"
    dy=".3em"
    [attr.font-size]="size * 0.16"
    [attr.font-weight]="valueFontWeight"
    [attr.color]="valueFontColor"
    fill="#333">
    {{ value | number: valuePipeFormat }}{{unit}}
  </text>

  <!-- Texto Min -->
  <text
    *ngIf="showMin"
    x="18%"
    y="93%"
    text-anchor="middle"
    dy=".3em"
    [attr.font-size]="size * 0.06"
    [attr.font-weight]="minMaxFontWeight"
    [attr.color]="minMaxFontColor"
    fill="#333">
    {{ min | number: minMaxPipeFormat }}{{unit}}
  </text>

  <!-- Texto Max -->
  <text
    *ngIf="showMax"
    x="82%"
    y="93%"
    text-anchor="middle"
    dy=".3em"
    [attr.font-size]="size * 0.06"
    [attr.font-weight]="minMaxFontWeight"
    [attr.color]="minMaxFontColor"
    fill="#333">
    {{ max | number: minMaxPipeFormat }}{{unit}}
  </text>
</svg>

  `,
  styles: [
    `
svg {
  display: block;
  margin: 0 auto;
}
    `
  ]
})
export class SmzSvgGaugeComponent implements OnChanges {
  @Input() title: string = 'Plano de Pintura';
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() value: number = 50;
  @Input() unit: string = '';
  @Input() thresholds: SmzGaugeThreshold[] = [];
  @Input() size: number = 200;

  @Input() valuePipeFormat: string = '1.0-0';
  @Input() valueFontWeight: string = 'bold';
  @Input() valueFontColor: string = '#000000';

  @Input() minMaxPipeFormat: string = '1.0-0';
  @Input() minMaxFontWeight: string = 'bold';
  @Input() minMaxFontColor: string = '#000000';

  @Input() backgroundColor: string = '#e6e6e6';

  @Input() showMin: boolean = true;
  @Input() showMax: boolean = true;

  public strokeWidth: number;
  public dashOffset: number;
  public radius: number;
  public circumference: number;
  public dashArray: string;
  public transformBase: string;
  public transformProgress: string;

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateGauge();
  }

  private calculateGauge(): void {
    this.strokeWidth = this.size * 0.1;
    this.radius = (this.size - this.strokeWidth) / 2;
    this.circumference = 2 * Math.PI * this.radius;

    // Define o arco como 270° (3/4 da circunferência total)
    const arc = this.circumference * (270 / 360);
    this.dashArray = `${arc} ${this.circumference}`;
    this.transformProgress = `rotate(135, ${this.size / 2}, ${this.size / 2})`;
    this.transformBase = `rotate(135, ${this.size / 2}, ${this.size / 2})`;

    // Normaliza o valor percentual e calcula o offset
    const percentNormalized = Math.min(Math.max(this.value, this.min), this.max);
    const progress = (percentNormalized - this.min) / (this.max - this.min);
    this.dashOffset = arc - progress * arc;
  }
}