import { DemoKeys } from '@demos/demo-keys';
import { DemoFeatureSelectors } from '@states/demo/demo.selectors';
import { SmzDocumentBuilder } from 'ngx-smz-ui';
import { CountriesDbSelectors } from '@states/database/countries/countries.selectors';

export const DocumentsDemo: { [key: string]: () => void } = {
  //
  [DemoKeys.DOCUMENTS_DEMO_1]: () => {
    return new SmzDocumentBuilder()
      .setGlobalScale(0.8)
      .setHeaderHeight('cm', 5.5)
      .setMargins('cm', 0.6)

      .viewer()
        .setFilename('demo')
        .setZoom(1, 0.5, 5, 0.5)
        .allowDownload()
        .document

      .header()

        .row()
          .image('assets/logo.png')
            .setWidth('70%')
            .setRowspan(3)
            .setImageWidth('40%')
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
      .setGlobalScale(0.8)
      .setHeaderHeight('cm', 5.5)
      .setMargins('cm', 0.6)

      .viewer()
        .setFilename('demo-debug')
        .setZoom(1, 0.5, 5, 0.5)
        .allowDownload()
        .document

      .header()

        .row()
          .image('assets/logo.png')
            .setWidth('70%')
            .setRowspan(3)
            .setImageWidth('40%')
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
}

