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
      .debugMode()
      .content()

        .row()
          .title('imagem')
            .setWidth('70%')
            .setRowspan(3)
            .row
          .title('OC-02382')
            .setWidth('15%')
            .row
          .title('VERSÃO DE CONSULTA')
            .setWidth('15%')
            .row
        .content

        .row()
          .title('AGUARDANDO CONFIRMAÇÃO')
            .setColspan(2)
            .row
        .content

        .row()
          .title('04/10/2021 18:00')
            .setColspan(2)
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
          .title('ORDEM DE COMPRA')
            .setBackgroundColor('#FDD835')
            .setTextColor('#212121')
            .setColspan(3)
            .row
        .content

        .document
      .build()
  },
}

