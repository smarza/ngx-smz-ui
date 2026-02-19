import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SmzGaugeThreshold } from './smz-gauge.types';

@Component({
    selector: 'app-svg-gauge',
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `

<svg [attr.width]="size" [attr.height]="size" [attr.viewBox]="'0 0 ' + size + ' ' + size">
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
    [attr.stroke]="currentColor"
    fill="transparent"
    stroke-linecap="round"
    [attr.stroke-dasharray]="dashArray"
    [attr.stroke-dashoffset]="dashOffset"
    [attr.transform]="transformProgress"
    style="transition: stroke-dashoffset 0.3s, stroke 0.3s;">
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
  @if (showMin) {
    <text
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
  }

  <!-- Texto Max -->
  @if (showMax) {
    <text
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
  }
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

  public strokeWidth: number | undefined;
  public dashOffset: number | undefined;
  public radius: number | undefined;
  public circumference: number | undefined;
  public dashArray: string | undefined;
  public transformBase: string | undefined;
  public transformProgress: string | undefined;
  public currentColor: string = '#000000';

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

    // Calcula a cor interpolada
    this.currentColor = this.calculateColor(percentNormalized);
  }

  private calculateColor(value: number): string {
    if (this.thresholds.length === 0) {
      // Cor padrão se nenhum threshold for fornecido
      return '#000000';
    }

    // Garante que os thresholds estejam ordenados por valor
    const thresholds = this.thresholds.slice().sort((a, b) => a.value - b.value);

    // Se o valor estiver abaixo do primeiro threshold
    if (value <= thresholds[0].value) {
      return thresholds[0].color;
    }

    // Se o valor estiver acima do último threshold
    if (value >= thresholds[thresholds.length - 1].value) {
      return thresholds[thresholds.length - 1].color;
    }

    // Encontra os thresholds entre os quais o valor atual se encontra
    for (let i = 0; i < thresholds.length - 1; i++) {
      const t1 = thresholds[i];
      const t2 = thresholds[i + 1];
      if (value >= t1.value && value <= t2.value) {
        // Calcula o fator de interpolação
        const factor = (value - t1.value) / (t2.value - t1.value);
        // Interpola entre as duas cores
        return this.interpolateColor(t1.color, t2.color, factor);
      }
    }

    // Retorna a cor do último threshold por segurança
    return thresholds[thresholds.length - 1].color;
  }

  private interpolateColor(color1: string, color2: string, factor: number): string {
    const rgb1 = this.hexToRgb(color1);
    const rgb2 = this.hexToRgb(color2);

    const r = Math.round(rgb1.r + factor * (rgb2.r - rgb1.r));
    const g = Math.round(rgb1.g + factor * (rgb2.g - rgb1.g));
    const b = Math.round(rgb1.b + factor * (rgb2.b - rgb1.b));

    return this.rgbToHex(r, g, b);
  }

  private hexToRgb(hex: string): { r: number, g: number, b: number } {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    const bigint = parseInt(hex, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255
    };
  }

  private rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }
}
