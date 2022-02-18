import { DemoKeys } from '@demos/demo-keys';
import { DemoFeatureSelectors } from '@states/demo/demo.selectors';
import { SmzChart, SmzDocumentBuilder } from 'ngx-smz-ui';
import { CountriesDbSelectors } from '@states/database/countries/countries.selectors';
import { VERTICAL_BAR } from '@demos/data/chart-data-original';
import { LINE } from '../../../../../ngx-smz-ui-dark-theme/src/app/demos/data/chart-data-original';

export const DocumentsDemo: { [key: string]: () => void } = {
  //
  [DemoKeys.DOCUMENTS_DEMO_HTML2PDF]: () => {
    return baseDocument(new SmzDocumentBuilder(), true)
      // .debugMode()
      .setRenderer('html2pdf')
      .setQuality(2)

      .setUnit('cm')
      .setMargins(1, 1, 1, 1)
      .setFilename('html2pdf')
      .setPage('a4', 'landscape')

      .viewer()
        .setZoom(1, 0.5, 5, 0.5)
        .allowDownload()
        .document

      .build()
  },
  //
  [DemoKeys.DOCUMENTS_DEMO_JSPDF]: () => {
    return baseDocument(new SmzDocumentBuilder(), false)
      .setRenderer('jspdf')

      .setUnit('cm')
      .setMargins(0.6, 0.6, 0.6, 0.6)
      .setFilename('jspdf')
      .setPage('a4', 'landscape')

      .viewer()
        .setZoom(1, 0.5, 5, 0.5)
        .allowDownload()
        .document

      .build()
  },
  //
  [DemoKeys.DOCUMENTS_DEMO_1]: () => {
    return new SmzDocumentBuilder()
    // .setHeaderHeight('cm', 5.5)
    // .setMargins('cm', 0.6)
    // .setFilename('demo')
    // .setPaperSize(297, 'landscape', 'A4')

    .viewer()
      .setZoom(1, 0.5, 5, 0.5)
      .allowDownload()
      .document

    .header()

      .row()
        .image('assets/logo.png')
          .setWidth('col-8')
          .setRowspan(3)
          .setImageWidth('40%')
          .row
        .field('OC-02382', 'Nº COMPRA')
          .setWidth('col-2')
          .useCentralized()
          .useBold()
          .row
        .field('VERSÃO DE CONSULTA')
          .setWidth('col-2')
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

      .document

    .content()

      .row()
        .subTitle('COMPRADOR')
          .row
        .content

      .row()
        .group()
          .setColspan(3)
          .addField('TIG COMERCIO DE MOVEIS E DECORACOES EIRELLI', 'RAZÃO SOCIAL')
            .setWidth('col-8')
            .group
          .addField('01234567891012', 'CNPJ')
            .setWidth('col-4')
            .group
          .addField('YASMIM.FREITAS', 'RESPONSÁVEL')
            .group
          .if(false)
            .addField('21 7280-9395', 'TELEFONE')
              .group
            .endIf
          .addField('ENCOMENDA@GRUPOIDEIA.COM.BR', 'EMAIL')
            .group
          .row
        .content

      .row()
        .subTitle('FORNECEDOR')
          .row
        .content

      .row()
        .group()
          .setColspan(3)
          .addField('HOME SIER', 'FÁBRICA')
            .useBold()
            .setTextColor('blue')
            .group
          .addField('MAURY', 'REPRESENTANTE')
            .group
          .addField('21 99209-4433', 'TELEFONE')
            .group
          .addField('AFFARIVENDAS@OUTLOOK.COM', 'EMAIL')
            .group
          .row
        .content

      .row()
        .subTitle('INFORMAÇÕES GERAIS')
          .row
        .content

      .row()
        .chart(VERTICAL_BAR as SmzChart)
          .setWidth('col-5')
          .row
        .content

      .row()
        .group()
          .setColspan(3)
          .addField('ENCOMENDA DE MERCADORIA VENDIDA', 'NATUREZA')
            .setWidth('col-6')
            .useBold()
            .useAlert()
            .group
          .addField('PV-002167', 'PEDIDO DE VENDA')
            .useBold()
            .group
          .addField('04/02/2022', 'PREVISÃO DE CHEGADA')
            .group
          .addField(`
  Se houver alguma dúvida, favor entrar em contato conosco imediatamente.
  Caso contrário, aguardamos a confirmação do envio em até 48 horas.

  ** Enviar o número do nosso pedido de venda e ordem de compra no corpo da nota fiscal, na confirmação e na embalagem da mercadoria.`, 'OBSERVAÇÕES')
            .setWidth('col-12')
            .group
          .row
        .content

      .row()
        .subTitle('RELAÇÃO DE ITENS')
          .row
        .content

      .row()
        .table()
          .setSource(DemoFeatureSelectors.all)
          .addColumn('name', 'Nome')
            .table
          .addColumn('company', 'Empresa')
            .table
          .row
        .content

      .row()
        .spacer()
          .row
        .content

      .row()

        .field('FINAL DO DOCUMENTO')
          .setBackgroundColor('#EEEEEE')
          .useBold()
          .row
        .field('YASMIM.FREITAS', 'EMISSOR DO DOCUMENTO')
          .setBackgroundColor('#EEEEEE')
          .row
        .field('4 DE OUT. DE 2021', 'DATA DA EMISSÃO')
          .setBackgroundColor('#EEEEEE')
          .row
        .content

      .document
      .build()
  },
  [DemoKeys.DOCUMENTS_DEMO_2]: () => {
    return new SmzDocumentBuilder()
      .debugMode()
      // .setHeaderHeight('cm', 5.5)
      // .setMargins('cm', 0.6)
      .setFilename('demo-debug')

      .viewer()
        .setZoom(1, 0.5, 5, 0.5)
        .allowDownload()
        .document

      .header()

        .row()
          .image('assets/logo.png')
            .setWidth('col-8')
            .setRowspan(3)
            .setImageWidth('40%')
            .row
          .field('OC-02382', 'Nº COMPRA')
            .setWidth('col-2')
            .useCentralized()
            .useBold()
            .row
          .field('VERSÃO DE CONSULTA')
            .setWidth('col-2')
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

        .document

      .content()

        .row()
          .subTitle('COMPRADOR')
            .row
          .content

        .row()
          .group()
            .setColspan(3)
            .addField('TIG COMERCIO DE MOVEIS E DECORACOES EIRELLI', 'RAZÃO SOCIAL')
              .setWidth('col-8')
              .group
            .addField('01234567891012', 'CNPJ')
              .setWidth('col-4')
              .group
            .addField('YASMIM.FREITAS', 'RESPONSÁVEL')
              .group
            .addField('21 7280-9395', 'TELEFONE')
              .group
            .addField('ENCOMENDA@GRUPOIDEIA.COM.BR', 'EMAIL')
              .group
            .row
          .content

        .row()
          .subTitle('FORNECEDOR')
            .row
          .content

        .row()
          .group()
            .setColspan(3)
            .addField('HOME SIER', 'FÁBRICA')
              .useBold()
              .setTextColor('blue')
              .group
            .addField('MAURY', 'REPRESENTANTE')
              .group
            .addField('21 99209-4433', 'TELEFONE')
              .group
            .addField('AFFARIVENDAS@OUTLOOK.COM', 'EMAIL')
              .group
            .row
          .content

        .row()
          .subTitle('INFORMAÇÕES GERAIS')
            .row
          .content

        .row()
          .group()
            .setColspan(3)
            .addField('ENCOMENDA DE MERCADORIA VENDIDA', 'NATUREZA')
              .setWidth('col-6')
              .useBold()
              .useAlert()
              .group
            .addField('PV-002167', 'PEDIDO DE VENDA')
              .useBold()
              .group
            .addField('04/02/2022', 'PREVISÃO DE CHEGADA')
              .group
            .addField(`
Se houver alguma dúvida, favor entrar em contato conosco imediatamente.
Caso contrário, aguardamos a confirmação do envio em até 48 horas.

** Enviar o número do nosso pedido de venda e ordem de compra no corpo da nota fiscal, na confirmação e na embalagem da mercadoria.`, 'OBSERVAÇÕES')
              .setWidth('col-12')
              .group
            .row
          .content

        .row()
          .subTitle('RELAÇÃO DE ITENS 1')
            .row
          .content

        .row()
          .table()
            .setSource(DemoFeatureSelectors.all)
            .for([{ property: 'name', label: 'Nome' }, { property: 'company', label: 'Empresa' }],
              (x, item) =>
                x.addColumn(item.property, item.label)
                  .table
              )
            .row
          .content

        .row()
          .subTitle('RELAÇÃO DE ITENS 2')
            .row
          .content

        .row()
          .table()
            .setSource(CountriesDbSelectors.all)
            .addColumn('name', 'País')
              .table
            .addColumn('id', 'Identificação')
              .table
            .row
          .content

        .row()
          .subTitle('RELAÇÃO DE ITENS 3')
            .row
          .content

        .row()
          .table()
            .setSource(DemoFeatureSelectors.all)
            .addColumn('name', 'Nome')
              .table
            .addColumn('company', 'Empresa')
              .table
            .row
          .content

        .row()
          .subTitle('RELAÇÃO DE ITENS 4')
            .row
          .content

        .row()
          .table()
            .setSource(CountriesDbSelectors.all)
            .addColumn('name', 'País')
              .table
            .addColumn('id', 'Identificação')
              .table
            .row
          .content

        .row()
          .spacer()
            .row
          .content

        .row()

          .field('FINAL DO DOCUMENTO')
            .setBackgroundColor('#EEEEEE')
            .useBold()
            .row
          .field('YASMIM.FREITAS', 'EMISSOR DO DOCUMENTO')
            .setBackgroundColor('#EEEEEE')
            .row
          .field('4 DE OUT. DE 2021', 'DATA DA EMISSÃO')
            .setBackgroundColor('#EEEEEE')
            .row
          .content

        .document
      .build()
  },
  [DemoKeys.DOCUMENTS_DEMO_3]: () => {
    return new SmzDocumentBuilder()
      // .setHeaderHeight('cm', 5.5)
      // .setMargins('cm', 0.6)
      // .setFilename('demo')
      // .setPaperSize(297, 'landscape', 'A4')

      .viewer()
        .setZoom(1, 0.5, 5, 0.5)
        .allowDownload()
        .document

      .header()

        .row()
          .image('assets/logo.png')
            .setWidth('col-8')
            .setRowspan(3)
            .setImageWidth('40%')
            .row
          .field('OC-02382', 'Nº COMPRA')
            .setWidth('col-2')
            .useCentralized()
            .useBold()
            .row
          .field('VERSÃO DE CONSULTA')
            .setWidth('col-2')
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
          .title('DOCUMENTO COM QUEBRA DE PÁGINA')
            .setBackgroundColor('#FDD835')
            .setTextColor('#212121')
            .setColspan(3)
            .row
          .content

        .document

      .content()

        .row()
          .subTitle('RELAÇÃO DE ITENS')
            .row
          .content

        .row()
          .table()
            .setSource(DemoFeatureSelectors.moreItems)
            .addColumn('name', 'Nome')
              .table
            .addColumn('company', 'Empresa')
              .table
            .row
          .content

        .row()
          .spacer()
            .row
          .content

        .row()

          .field('FINAL DO DOCUMENTO')
            .setBackgroundColor('#EEEEEE')
            .useBold()
            .row
          .field('YASMIM.FREITAS', 'EMISSOR DO DOCUMENTO')
            .setBackgroundColor('#EEEEEE')
            .row
          .field('4 DE OUT. DE 2021', 'DATA DA EMISSÃO')
            .setBackgroundColor('#EEEEEE')
            .row
          .content

        .document
      .build()
  },
  //
  [DemoKeys.DOCUMENTS_DEMO_FLUENT_UTILITIES]: () => {
    return new SmzDocumentBuilder()
    // .debugMode()
    .setRenderer('html2pdf')
    .setQuality(2)

    .setUnit('cm')
    .setMargins(1, 1, 1, 1)
    .setFilename('html2pdf')
    .setPage('a4', 'portrait')

    .viewer()
      .setZoom(1, 0.5, 5, 0.5)
      .allowDownload()
      .document

    .content()

      .row().subTitle('TÍTULO1').setBackgroundColor('red').row.content

      .for(['AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG', 'HHH', 'III', 'A2', 'A3', 'A4', 'A5', 'A6'], (_, data: string, index: number) =>
        (
          _
          .row()
            .subTitle(data)
            .row
          .content
          .if((index + 1) % 2 === 0)
          .row().subTitle('---').row.content
        .endIf
        )
      )

    .document

    .content()

    .row().subTitle('TÍTULO2').setBackgroundColor('red').row.content

    .for(['AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG', 'HHH', 'III'], (_, data: string, index: number) =>
      (
        _
        .row()
          .subTitle(data)
          .row
        .content
        .if((index + 1) % 2 === 0)
        .row().subTitle('---').row.content
      .endIf
      )
    )

    .document

    .build()
  },
}

function baseDocument(_: SmzDocumentBuilder, includePageBreaks: boolean): SmzDocumentBuilder {
  return _

  .header()

    .row()
      .image('assets/logo.png')
        .setWidth('col-8')
        .setRowspan(3)
        .setImageWidth('40%')
        .row
      .field('OC-02382', 'Nº COMPRA')
        .setWidth('col-2')
        .useCentralized()
        .useBold()
        .row
      .field('VERSÃO DE CONSULTA')
        .setWidth('col-2')
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
      .title('ORDEM DE COMPRA 1')
        .addContainerStyles('outline outline-1 outline-offset-0 outline-yellow-400')
        .setBackgroundColor('#FDD835')
        .setTextColor('#212121')
        .setColspan(3)
        .row
      .content

    .document

  .content()

    .row()
      .subTitle('COMPRADOR')
        .row
      .content

    .row()
      .group()
        .setColspan(3)
        .addField('TIG COMERCIO DE MOVEIS E DECORACOES EIRELLI', 'RAZÃO SOCIAL')
          .setWidth('col-8')
          .group
        .addField('01234567891012', 'CNPJ')
          .setWidth('col-4')
          .group
        .addField('YASMIM.FREITAS', 'RESPONSÁVEL')
          .group
        .if(false)
          .addField('21 7280-9395', 'TELEFONE')
            .group
          .endIf
        .addField('ENCOMENDA@GRUPOIDEIA.COM.BR', 'EMAIL')
          .group
        .row
      .content

    .row()
      .subTitle('FORNECEDOR')
        .row
      .content

    .row()
      .group()
        .setColspan(3)
        .addField('HOME SIER', 'FÁBRICA')
          .useBold()
          .setTextColor('blue')
          .group
        .addField('MAURY', 'REPRESENTANTE')
          .group
        .addField('21 99209-4433', 'TELEFONE')
          .group
        .addField('AFFARIVENDAS@OUTLOOK.COM', 'EMAIL')
          .group
        .row
      .content

    .document

    .if(includePageBreaks)
      .pageBreak()
    .endIf

    .content()

    .row()
      .subTitle('CAPÍTULO 1')
        .row
      .content

    .row()
      .chart(LINE as SmzChart)
        .row
      .content

    .row()
      .chart(LINE as SmzChart)
        .row
      .chart(LINE as SmzChart)
        .row
      .content

    .document

    .if(includePageBreaks)
      .pageBreak()
    .endIf

    .content()

    .row()
      .subTitle('INFORMAÇÕES GERAIS')
        .row
      .content

    .row()
      .group()
        .setColspan(3)
        .addField('ENCOMENDA DE MERCADORIA VENDIDA', 'NATUREZA')
          .setWidth('col-6')
          .useBold()
          .useAlert()
          .group
        .addField('PV-002167', 'PEDIDO DE VENDA')
          .useBold()
          .group
        .addField('04/02/2022', 'PREVISÃO DE CHEGADA')
          .group
        .addField(`
Se houver alguma dúvida, favor entrar em contato conosco imediatamente.
Caso contrário, aguardamos a confirmação do envio em até 48 horas.

** Enviar o número do nosso pedido de venda e ordem de compra no corpo da nota fiscal, na confirmação e na embalagem da mercadoria.`, 'OBSERVAÇÕES')
          .setWidth('col-12')
          .group
        .row
      .content

    .row()
      .subTitle('RELAÇÃO DE ITENS')
        .row
      .content

    .row()
      .table()
        .setSource(DemoFeatureSelectors.moreItems)
        .addColumn('name', 'Nome')
          .table
        .addColumn('company', 'Empresa')
          .setWidth('col-10')
          .table
        .row
      .content

    .row()
      .spacer()
        .row
      .content

    .row()

      .field('FINAL DO DOCUMENTO')
        .setBackgroundColor('#EEEEEE')
        .useBold()
        .row
      .field('YASMIM.FREITAS', 'EMISSOR DO DOCUMENTO')
        .setBackgroundColor('#EEEEEE')
        .row
      .field('4 DE OUT. DE 2021', 'DATA DA EMISSÃO')
        .setBackgroundColor('#EEEEEE')
        .row
      .content

    .document
}