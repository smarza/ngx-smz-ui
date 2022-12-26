import { Store } from '@ngxs/store';
import { GlobalInjector, SmzUiGuidesBuilder, SmzUiGuidesService } from 'ngx-smz-ui';
import { DemoKeys } from '@demos/demo-keys';

const service = GlobalInjector.instance.get(SmzUiGuidesService);
const store = GlobalInjector.instance.get(Store);

export const UiGuidesDemo: { [key: string]: () => void } = {
  //
  [DemoKeys.UI_GUIDE_OVERVIEW]: () => {
    service.start(
      new SmzUiGuidesBuilder()
        .setTitle('Guia | Como encontrar os demos')
        .step('treeContainer')
          .setTitle('Árvore de demos')
          .setContent(sampleStepContent)
          .step
        .step('sampleTab')
          .setTitle('Demo')
          .setContent(sampleStepContent)
          .step
        .step('codeTab')
          .setTitle('Código')
          .setContent(sampleStepContent)
          .step
      .build()
    );
  },
}

const sampleStepContent = `__Advertisement :)__

- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
  resize in browser.
- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
  i18n with plurals support and easy syntax.

You will like those projects!`;