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
        .setLocale('pt-BR')
        .defaults()
          .setWidth('500px')
          .setHeight('400px')
          .defaults
        .step('footer-logo-container')
          .setTitle('Barra inferior')
          .setContent(sampleStepContent)
          .offsetY(-30)
          .step
        .step('treeContainer')
          .setTitle('Árvore de demos')
          .setContent(sampleStepContent)
          .offsetX(60)
          .offsetY(70)
          .step
        .step('sampleTab')
          .setTitle('Demo')
          .setContent(sampleStepContent)
          .setHeight('300px')
          .offsetY(120)
          .step
        .step('codeTab')
          .setTitle('Código')
          .setContent(sampleStepContent)
          .setHeight('300px')
          .offsetY(120)
          .step
        .override()
          .setInitCallback((step) => console.log(`Init Step: ${step.number}`))
          .setConcludedCallback((step) => console.log(`Concluded Step: ${step.number}`))
          .override
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