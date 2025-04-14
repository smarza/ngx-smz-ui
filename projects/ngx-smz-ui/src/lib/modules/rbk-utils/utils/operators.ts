import { Observable } from 'rxjs';
import { fixDateProperties } from './utils';

export function fixDates() {
    return function <T>(source: Observable<T>): Observable<T> {
        return new Observable(subscriber => {
            source.subscribe({
                next(value) {
                    fixDateProperties(value);
                    subscriber.next(value);
                },
                error(error) {
                    subscriber.error(error);
                },
                complete() {
                    subscriber.complete();
                }
            })
        });
    }
}