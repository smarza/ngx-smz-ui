import { SmzPresets } from '../models/smz-presets';
import { GlobalInjector } from '../services/global-injector';
import { SmzDialogsService } from '../services/smz-dialogs.service';

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

    descriptor.value = function (...args: never[])
    {
      const service = GlobalInjector.instance.get(SmzDialogsService);

      // for (const key of Reflect.ownKeys(this))
      // {
      //     // console.log('----');
      //     // console.log(`typeof ${key.toString()}:`, typeof this[key]);

      //     if(this[key] instanceof SmzDialogsService)
      //     {
      //       service = this[key];
      //     }
      // }

      if (service != null)
      {
        service.open({
          title: title ?? 'Mensagem',
          features: [{ type: 'message', data: message }],
          callbacks: {
            onConfirm: () =>
            {
              const result = original.apply(this, args);
              return result;
            },
            onCancel: () =>
            {
              return null;
            },
            onClose: () =>
            {
              return null;
            }
          },
          presetId: isCritical ? SmzPresets.CriticalConfirmation : SmzPresets.Confirmation,
        });
      }
      else
      {
        throw 'O serviço SmzDialogsService não foi encontrado no component. Favor injetar SmzDialogsService';
      }

    };

    return descriptor;
  };
}