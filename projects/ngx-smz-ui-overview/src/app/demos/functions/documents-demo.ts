import { DemoKeys } from '@demos/demo-keys';
import { SmzDocumentBuilder } from 'ngx-smz-ui';

export const DocumentsDemo: { [key: string]: () => void } = {
  //
  [DemoKeys.DOCUMENTS_DEMO_1]: () => {
    return new SmzDocumentBuilder()
      .debugMode()
      .content()

        .row()
          .title('Month')
            .row
          .title('Savings')
            .row
          .title('Savings for holiday!')
            .row
        .content

        .row()
          .title('January')
            .row
          .title('$100')
            .row
          .title('$50')
            .setRowspan(2)
            .row
        .content

        .row()
          .title('February')
            .row
          .title('$80')
            .row
        .content

        .document
      .build()
  },
  [DemoKeys.DOCUMENTS_DEMO_2]: () => {
    return new SmzDocumentBuilder()
      // .debugMode()
      .content()

        .row()
          .title('imagem')
            .setWidth('70%')
            .setRowspan(3)
            .row
          .field('OC-02382', 'Nº COMPRA')
            .setWidth('15%')
            .useCentralized()
            .useBold()
            .row
          .field('VERSÃO DE CONSULTA')
            .setWidth('15%')
            .useCentralized()
            .useAlert()
            .row
        .content

        .row()
          .field('AGUARDANDO CONFIRMAÇÃO', 'STATUS')
            .setColspan(2)
            .useCentralized()
            .useBold()
            .row
        .content

        .row()
          .field('04/10/2021 18:00', 'DATA DA EMISSÃO')
            .setColspan(2)
            .useCentralized()
            .row
        .content

        .row()
          .title('ORDEM DE COMPRA')
            .setBackgroundColor('#FDD835')
            .setTextColor('#212121')
            .setColspan(3)
            .row
        .content

        .row()
          .divider()
            .setColspan(3)
            .row
        .content

        .row()
          .field('TIG COMERCIO DE MOVEIS E DECORACOES EIRELLI', 'RAZÃO SOCIAL')
            .row
        .content

        .document
      .build()
  },
}

