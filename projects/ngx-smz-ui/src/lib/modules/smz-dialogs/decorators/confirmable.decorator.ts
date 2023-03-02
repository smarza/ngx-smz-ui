import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { take, takeWhile } from 'rxjs/operators';
import { GlobalInjector } from '../../../common/services/global-injector';
import { DialogsActions } from '../state/dialogs/dialogs.actions';

export function Confirmable(
  /**
  * Mensagem de confirmação.
  */
  message: string,
  /**
  * Título do diálogo.
  */
  title: string,
  /**
  *
  * Define se o botão de confirmação deverá ser evidenciado.
  */
  isCritical?: boolean)
{
  return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) =>
  {
    const original = descriptor.value;

    descriptor.value = async function (...args: never[])
    {
      const store = GlobalInjector.instance.get(Store);
      const actions$ = GlobalInjector.instance.get(Actions);
      let isConfirming = true;

      actions$.pipe(ofActionSuccessful(DialogsActions.ConfirmationSuccess), take(1), takeWhile(x => isConfirming)).subscribe(() => {
        isConfirming = false;
        const result = original.apply(this, args);
        return result;
      });

      actions$.pipe(ofActionSuccessful(DialogsActions.ConfirmationFailure), take(1), takeWhile(x => isConfirming)).subscribe(() => {
        isConfirming = false;
        return null;
      });

      await firstValueFrom(store.dispatch(new DialogsActions.Confirmation(title ?? 'Mensagem', [message], isCritical)));

    };

    return descriptor;
  };
}

export function ConfirmableFunction(title: string, message: string, callback: () => void) {
  const store = GlobalInjector.instance.get(Store);
  const actions$ = GlobalInjector.instance.get(Actions);

  let isConfirming = true;

  actions$.pipe(ofActionSuccessful(DialogsActions.ConfirmationSuccess), take(1), takeWhile(x => isConfirming)).subscribe(() => {
    isConfirming = false;
    callback();
    return true;
  });

  actions$.pipe(ofActionSuccessful(DialogsActions.ConfirmationFailure), take(1), takeWhile(x => isConfirming)).subscribe(() => {
    isConfirming = false;
    return null;
  });

  store.dispatch(new DialogsActions.Confirmation(title ?? 'Mensagem', [message], false));
}

export function CriticalConfirmableFunction(title: string, message: string, callback: () => void) {
  const store = GlobalInjector.instance.get(Store);
  const actions$ = GlobalInjector.instance.get(Actions);

  let isConfirming = true;

  actions$.pipe(ofActionSuccessful(DialogsActions.ConfirmationSuccess), take(1), takeWhile(x => isConfirming)).subscribe(() => {
    isConfirming = false;
    callback();
    return true;
  });

  actions$.pipe(ofActionSuccessful(DialogsActions.ConfirmationFailure), take(1), takeWhile(x => isConfirming)).subscribe(() => {
    isConfirming = false;
    return null;
  });

  store.dispatch(new DialogsActions.Confirmation(title ?? 'Mensagem', [message], true));
}