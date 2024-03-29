
import { Store } from '@ngxs/store';
import { SmzPresets } from '../../smz-dialogs/models/smz-presets';
import { SmzDialogsService } from '../../smz-dialogs/services/smz-dialogs.service';
import { ToastActions } from '../../../state/global/application/application.actions.toast';
import { GlobalInjector } from '../../../common/services/global-injector';

export function CanAccess(
  /**
  * claim.
  */
  claim: string,
  /**
  * Message.
  */
  message?: string,
  /**
  *
  * Define o método para mostrar a mensagem caso o usuário não possua acesso
  */
  displayMethod?: 'dialog' | 'toast')
{
  return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) =>
  {
    const original = descriptor.value;

    descriptor.value = function (...args: never[])
    {
      const dialogs = GlobalInjector.instance.get(SmzDialogsService);
      const store = GlobalInjector.instance.get(Store);
      const validationSelectors = GlobalInjector.config.rbkUtils.authorization.validationSelectors;

      if (store.selectSnapshot(validationSelectors.hasClaimAccess(claim))) {
        return original.apply(this, args);
      }
      else {
        const displayMessage = message ?? 'Usuário não possuí acesso para acessar essa funcionalidade.';

        if (displayMethod === 'toast') {
          // Mostrar com toast
          store.dispatch(new ToastActions.Warning(displayMessage));
        }
        else {
          // Mostrar com diálogo (padrão)
          dialogs.open({
            title: 'Acesso negado',
            features: [{ type: 'message', data: displayMessage }],
            callbacks: {
              onClose: () =>
              {
                return null;
              }
            },
            presetId: SmzPresets.Message,
          });
        }
      }
    };

    return descriptor;
  };
}