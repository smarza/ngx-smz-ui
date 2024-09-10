import { DemoKeys } from '@demos/demo-keys';
import { SmzGaugeBuilder, SmzGaugeComponent } from 'ngx-smz-ui';
import { interval, map, Observable, of, takeWhile } from 'rxjs';

export const DynamicDemo: { [key: string]: () => void } = {
  //
  [DemoKeys.DYNAMIC_GAUGE]: () => {
    return {
      component: SmzGaugeComponent,
      stateBuilder: () => new SmzGaugeBuilder()
        .withSize(250)
        .withTitle('Plano de Pintura')
        .withTitleStyle('font-bold text-4xl')
        .withValue(createRangeObservable(0, 100, 10000))
        .withValueThrottleTime(300)
        .withDecimalPlaces(2, false)
        .withRange(0, 100)
        .withUnit('%')
        .withBackgroundColor('#e6e6e6')
        .withFont('bold', '#000000')
        .withMinMaxFont('bold', '#000000')
        .addThreshold()
          .withValue(0)
          .withColor('#264653')
          .gauge
        .addThreshold()
          .withValue(25)
          .withColor('#2a9d8f')
          .gauge
        .addThreshold()
          .withValue(50)
          .withColor('#e9c46a')
          .gauge
        .addThreshold()
          .withValue(75)
          .withColor('#f4a261')
          .gauge
        .addThreshold()
          .withValue(100)
          .withColor('#e76f51')
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