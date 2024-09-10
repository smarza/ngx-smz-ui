import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, ViewChild } from '@angular/core';

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
      <stop offset="15%" [attr.stop-color]="color" stop-opacity="1"></stop>
      <stop offset="85%" stop-color="#98c0ff" stop-opacity="1"></stop>
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
    [attr.transform]="transform"
    style="transition: stroke-dashoffset 0.3s;">
  </circle>

  <!-- Texto Central -->
  <text
    x="50%"
    y="50%"
    text-anchor="middle"
    dy=".3em"
    [attr.font-size]="size * 0.2"
    fill="#333">
    {{ value | number: numberPipeFormat }}{{unit}}
  </text>
</svg>

  `,
  styles: [
    `
:host {
  display: block;
}
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
  @Input() unit: string = '%';
  @Input() numberPipeFormat: string = '1.0-0';
  @Input() size: number = 200; // Tamanho do SVG
  @Input() strokeWidth: number = 20;
  @Input() color: string = '#4caf50';
  @Input() backgroundColor: string = '#e6e6e6';

  public dashOffset: number = 0;
  public radius: number = 0;
  public circumference: number = 0;
  public dashArray: string = '';
  public transformBase: string = '';
  public transform: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateGauge();
  }

  private calculateGauge(): void {
    this.radius = (this.size - this.strokeWidth) / 2;
    this.circumference = 2 * Math.PI * this.radius;

    // Define o arco como 270° (3/4 da circunferência total)
    const arc = this.circumference * (270 / 360);
    this.dashArray = `${arc} ${this.circumference}`;
    this.transform = `rotate(135, ${this.size / 2}, ${this.size / 2})`;
    this.transformBase = `rotate(135, ${this.size / 2}, ${this.size / 2})`;

    // Normaliza o valor percentual e calcula o offset
    const percentNormalized = Math.min(Math.max(this.value, this.min), this.max);
    const progress = (percentNormalized - this.min) / (this.max - this.min);
    this.dashOffset = arc - progress * arc;
  }
}