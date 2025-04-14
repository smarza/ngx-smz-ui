import { DemoKeys } from '../../demos/demo-keys';
import { SmzGaugeBuilder, SmzGaugeComponent } from '@ngx-smz/core';
import { interval, map, Observable, takeWhile } from 'rxjs';

export const DynamicDemo: { [key: string]: () => void } = {
  //
  [DemoKeys.DYNAMIC_GAUGE]: () => {
    return {
      component: SmzGaugeComponent,
      stateBuilder: () => new SmzGaugeBuilder()
        .withSize(250)
        .withTitle('Plano de Pintura')
        .withTitleStyle('font-bold text-4xl')
        .withValue(createRangeObservable(40, 50, 10000))
        .withValueThrottleTime(100)
        .withDecimalPlaces(2, false)
        .withRange(40, 50)
        .withUnit('%')
        .withBackgroundColor('#e6e6e6')
        .withFont('bold', '#000000')
        .withMinMaxFont('bold', '#000000')
        .addThreshold()
          .withValue(40)
          .withColor('#e76f51')
          .gauge
        .addThreshold()
          .withValue(45)
          .withColor('#e9c46a')
          .gauge
        .addThreshold()
          .withValue(50)
          .withColor('#264653')
          .gauge
    }
  },
}


/**
 * Retorna um Observable que emite valores entre um mínimo e um máximo
 * variando lentamente ao longo do tempo.
 *
 * @param min O valor mínimo do intervalo.
 * @param max O valor máximo do intervalo.
 * @param duration O tempo (em milissegundos) que a variação deve levar para ir de min a max.
 * @returns Um Observable que emite valores variando entre min e max.
 */
function createRangeObservable(min: number, max: number, duration: number): Observable<number> {
  // Calcula o incremento por tick de tempo
  const step = (max - min) / duration;

  // Cria um Observable que emite a cada 100ms
  return interval(100).pipe(
    map(timeElapsed => min + step * timeElapsed * 100), // Incrementa o valor gradualmente
    takeWhile(value => value <= max) // Continua enquanto o valor estiver dentro do limite máximo
  );
}