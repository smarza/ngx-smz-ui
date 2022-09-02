import { ActivatedRoute, ParamMap } from '@angular/router';
import { RouterParamsActions } from './state/router-params/router-params.actions';
import { Store } from '@ngxs/store';

import { GlobalInjector } from '../../common/services/global-injector';
import { isEmpty } from 'lodash-es';
import { isNumeric } from '../../common/utils/utils';

export function routerParamsListener(key: string, route: ActivatedRoute, callback?: (data) => void): void {
  route.paramMap.subscribe(params => {

    const data = mapParamsToObject<any>(params);

    if (key != null && key !== '') {
      const store = GlobalInjector.instance.get(Store);
      store.dispatch(new RouterParamsActions.Update(key, data));

      if (callback != null) callback(data);
    }
  });
}

export function routerParamsDispatch(action: any, route: ActivatedRoute, property?: string): void {
  route.paramMap.subscribe(params => {

    const data = mapParamsToObject<any>(params);
    const store = GlobalInjector.instance.get(Store);

    try {
      if (property == null) {
        store.dispatch(new action(data));
      }
      else {
        store.dispatch(new action(Reflect.get(data, property)));
      }
    } catch (error) {
      console.error('Error trying to dispatch routerParamsDispatch events', action, data, property);
    }
  });
}

export function mapParamsToObject<T>(params: ParamMap): T {
  let result = {} as T;

  for (let key of params.keys) {
    const value = params.get(key);

    if (key.includes('Array') || value.includes(',')) {
      // is array

      if (isEmpty(value)) {
        result[key] = [];
      }
      else {
        const values = value.split(',');
        result[key] = values.map(x => {
          return (isNumeric(x)) ? Number(x) : x;
        });
      }
    }
    else if (value === 'null') {
      // is null
      result[key] = null;
    }
    else if (value === 'true' || value === 'false') {
      // is boolean
      result[key] = (value === 'true');
    }
    else {
      result[key] = isNumeric(value) ? Number(value) : value;
    }
  }

  return result;
}