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
        .allowBackNavigation()
        .showSummaryCount()
        .setInitCallback((step) => console.log(`Init Step: ${step.number}`))
        .setConcludedCallback((step) => console.log(`Concluded Step: ${step.number}`))

        .customStyles()
          .overlay()
            .darker()
            .blurry()
            .overlay
          .blend()
            .grayscale()
            .blend
          .highlight()
            .lighter()
            .highlight
          .customStyles

        .defaults()
          .setWidth('500px')
          .setHeight('400px')
          .defaults

        .step('layout-config-button')
          .setTitle('Assistente de Layout')
          .setContent(sampleStepContent)
          .setHighlightMargin(5)
          .offsetY(120)
          .step

        .step('footer-logo-container')
          .setTitle('Barra inferior')
          .setContent(sampleStepContent)
          .offsetY(-30)
          .step

        .step('treeContainer')
          .setTitle('Árvore de demos')
          .setContent(sampleStepContentBigger)
          .setWidth('600px')
          .offsetX(50)
          .offsetY(30)
          .step

        .step('sampleTab')
          .setTitle('Demo')
          .setContent(sampleStepContent)
          .setHeight('300px')
          .horizontal()
          .offsetY(170)
          .setHighlightMargin(8)
          .step

        .step('codeTab')
          .setTitle('Código')
          .setContent(sampleStepContent)
          .setHeight('300px')
          .horizontal()
          .offsetY(170)
          .setHighlightMargin(8)
          .step

        .override()
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

const sampleStepContentBigger = `__Advertisement :)__

- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
  resize in browser.
- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
  i18n with plurals support and easy syntax.

You will like those projects!

![logo](https://wallpapercave.com/wp/wp4676582.jpg "MarineGEO logo")

Here's our logo (hover to see the title text):

Inline-style:
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

Reference-style:
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"

![logo](data:image/jpeg;base64,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 "MarineGEO logo")

__Advertisement :)__

- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
  resize in browser.
- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
  i18n with plurals support and easy syntax.

You will like those projects!

__Advertisement :)__

- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
  resize in browser.
- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
  i18n with plurals support and easy syntax.

You will like those projects!
`;