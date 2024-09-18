import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SmzGaugeState } from './smz-gauge.types';
import { CommonModule } from '@angular/common';
import { SmzSvgGaugeComponent } from './smz-svg-gauge.component';
import { BehaviorSubject, debounceTime, merge, Subject, takeUntil, throttleTime } from 'rxjs';

/**
 * Componente Angular que exibe um Gauge (medidor) personalizado baseado nas configurações fornecidas
 * pelo estado (`SmzGaugeState`). Este componente utiliza um Gauge SVG para visualização dos valores.
 */
@Component({
  standalone: true,
  selector: 'smz-ui-gauge',
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
  styles: [`
    /* Estilos personalizados para o componente Gauge */
  `]
})
export class SmzGaugeComponent implements OnInit, OnDestroy {
  /**
   * Estado do Gauge que define todas as configurações necessárias para a exibição.
   */
  @Input() state: SmzGaugeState | null = null;

  /**
 * Comportamento sujeito para manter o valor atual do medidor.
 */
  public throttledValue = new BehaviorSubject<number>(0);

  /**
   * Observable que mantém o valor do medidor aplicando throttling para limitar a frequência de atualizações.
   */
  public throttledValue$ = this.throttledValue.asObservable();

  /**
   * Subject usado para sinalizar a destruição do componente e cancelar assinaturas do RxJS.
   */
  private destroy$ = new Subject<void>();

  /**
   * Inicializa uma nova instância do componente SmzGaugeComponent.
   */
  constructor() { }

  /**
   * Lifecycle hook que é chamado após a inicialização do componente.
   * Configura o comportamento do medidor com base no estado fornecido.
   */
  ngOnInit(): void {
    // Exibe o estado no console se o modo de depuração estiver ativado.
    if (this.state && this.state.debugMode) {
      console.log('SmzGaugeState', this.state);
    }

    // Configura a observação do valor do medidor com throttle e debounce.
    if (this.state && this.state.value$) {
      // Throttling do valor do medidor com base no intervalo especificado.
      const throttled$ = this.state.value$.pipe(
        throttleTime(this.state.valueThrottleTime),
        takeUntil(this.destroy$)
      );

      // Debouncing para garantir que o último valor seja emitido após o throttle.
      const debounced$ = this.state.value$.pipe(
        debounceTime(this.state.valueThrottleTime),
        takeUntil(this.destroy$)
      );

      // Combina os fluxos de throttle e debounce para atualizar o valor do medidor.
      merge(throttled$, debounced$)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(value => {
          this.throttledValue.next(value);
        });
    }
  }

  /**
   * Lifecycle hook que é chamado quando o componente é destruído.
   * Emite um valor para destruir o Subject e cancelar todas as assinaturas ativas.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
