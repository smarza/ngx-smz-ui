import { ActivatedRoute, ParamMap } from '@angular/router';
import { RouterParamsActions } from './state/router-params/router-params.actions';
import { Store } from '@ngxs/store';

import isEmpty from 'lodash-es/isEmpty';
import isNumber from 'lodash-es/isNumber';
import { GlobalInjector } from '../../common/services/global-injector';

export function routerParamsListener(key: string, route: ActivatedRoute, callback?: (data) => void): void
{
    route.paramMap.subscribe(params =>
        {
            const data = mapParamsToObject<any>(params);

            if (!isEmpty(key))
            {
                if (callback != null) callback(data);

                const store = GlobalInjector.instance.get(Store);
                store.dispatch(new RouterParamsActions.Update(key, data));
            }
        });
}

export function routerParamsDispatch(action: any, route: ActivatedRoute, property?: string): void
{
    route.paramMap.subscribe(params =>
        {
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

export function mapParamsToObject<T>(params: ParamMap): T
{
  let result = {} as T;

  for (let key of params.keys)
  {
    const value = params.get(key);

    if (value.includes(','))
    {
      // is array
      const values = value.split(',');

      result[key] = values.map(x => isNumber(Number(x)) ? Number(x) : x);
    }
    else if (value === 'null')
    {
      // is null
      result[key] = null;
    }
    else if (value === 'true' || value === 'false')
    {
      // is boolean
      result[key] = (value === 'true');
    }
    else
    {
      result[key] = isNaN(value as any) ? value : Number(value);
    }
  }

  return result;
}