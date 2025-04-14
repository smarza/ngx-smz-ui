import { Message } from 'primeng/api/message';
import { Observable, Subscription, timer } from 'rxjs';

export function debounceDistinctMessage(delay: number) {
  return (source: Observable<Message>): Observable<Message> => {
      return new Observable(subscriber => {
          let hasValue = false;
          let lastValue: Message | null = null;
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
              (value: Message) => {
                  // new value received cancel timer
                  durationSub?.unsubscribe();
                  // emit lastValue if the value has changed
                  if (hasValue && value?.detail !== lastValue?.detail) {
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