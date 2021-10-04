import { Observable, Subscription, timer } from 'rxjs';

// observable.pipe(debounceDistinct(51)).subscribe(x => console.log(x));

export function debounceDistinct<T>(delay: number) {
  return (source: Observable<T>): Observable<T> => {
      return new Observable(subscriber => {
          let hasValue = false;
          let lastValue: T | null = null;
          let durationSub: Subscription = null;

          const emit = () => {
              durationSub?.unsubscribe();
              durationSub = null;
              if (hasValue) {
                  // We have a value! Free up memory first, then emit the value.
                  hasValue = false;
                  const value = lastValue!;
                  lastValue = null;
                  subscriber.next(value);
              }
          };

          return source.subscribe(
              (value: T) => {
                  // new value received cancel timer
                  durationSub?.unsubscribe();
                  // emit lastValue if the value has changed
                  if (hasValue && value !== lastValue) {
                      const value = lastValue!;
                      subscriber.next(value);
                  }
                  hasValue = true;
                  lastValue = value;
                  // restart timer
                  durationSub = timer(delay).subscribe(() => {
                      emit();
                  });
              },
              error => {
              },
              () => {
                  emit();
                  subscriber.complete();
                  lastValue = null;
              });
      });
  }
}