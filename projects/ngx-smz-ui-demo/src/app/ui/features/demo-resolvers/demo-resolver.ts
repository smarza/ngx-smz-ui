import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Store } from '@ngxs/store';
import { EMPTY, Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class DemoResolver implements Resolve<unknown> {
  constructor(private store: Store) {}
  resolve(route: ActivatedRouteSnapshot): Observable<unknown> {
    return this.store
      .dispatch(new route.data.action(route.params))
      .pipe(map(x => route.data.selector != null ? this.store.selectSnapshot(route.data.selector) : null));
  }
}