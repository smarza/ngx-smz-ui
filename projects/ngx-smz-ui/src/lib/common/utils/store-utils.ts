import { Store } from '@ngxs/store';
import { GlobalInjector } from '../services/global-injector';
import { Observable } from 'rxjs';

export namespace SmzProxyStore {

    export function selectSnapshot<T>(selector: any): T {
      const store: Store = GlobalInjector.instance.get(Store);
      return store.selectSnapshot(selector) as T;
    }

    export function select<T>(selector: any): Observable<T> {
      const store: Store = GlobalInjector.instance.get(Store);
      return store.select(selector) as Observable<T>;
    }

  }