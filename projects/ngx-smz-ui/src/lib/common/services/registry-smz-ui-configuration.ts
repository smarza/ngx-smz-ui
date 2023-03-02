import { SmzUiBuilder } from '../../builders/smz-ui/ui-builder';
import { GlobalInjector } from './global-injector';

export function RegistrySmzUiConfiguration(builder: SmzUiBuilder): boolean {
  console.log('RegistrySmzUiConfiguration');
  GlobalInjector.config = builder.Build();
  return true;
}