import { DemoKeys } from '@demos/demo-keys';
import { DemoFeatureSelectors } from '@states/demo/demo.selectors';
import { SmzChart, SmzDocumentBuilder } from 'ngx-smz-ui';
import { CountriesDbSelectors } from '@states/database/countries/countries.selectors';
import { LINE, VERTICAL_BAR } from '@demos/data/chart-data-original';
import { buildSummaryReportDocument } from './summary-document/summary-report-document';
import { DemoInjectable1Component } from '@features/home/components/demo-injectable/demo-injectable-1.component';
import { DemoInjectable2Component } from '@features/home/components/demo-injectable/demo-injectable-2.component';
import { DemoInjectable3Component } from '@features/home/components/demo-injectable/demo-injectable-3.component';
import { DemoInjectable4Component } from '@features/home/components/demo-injectable/demo-injectable-4.component';

export const DocumentsDemo: { [key: string]: () => void } = {
  //
  [DemoKeys.DOCUMENTS_DEMO_HTML2PDF]: () => {
    return addDocumentContent(new SmzDocumentBuilder(), true)
      // .debugMode()
      .setRenderer('html2pdf')
      .setQuality(2)
      .hidePageNumbers()

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
    return addDocumentContent(new SmzDocumentBuilder(), false)
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
      .setRenderer('html2pdf')
      .setQuality(2)
      .hidePageNumbers()

      .setUnit('cm')
      .setMargins(1, 1, 1, 1)
      .setFilename('html2pdf')
      .setPage('a4', 'landscape')

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

      // .content()
      //    .row()
      //       .hiddenBreak()
      //          .overrideStyles('bg-black')
      //          .setHiddenBreakHeight('200px')
      //          .overrideOverlapStyles('bg-black page-overlap-demo')
      //          .row
      //       .content
      //    .document

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
  //
  [DemoKeys.DOCUMENTS_DEMO_2]: () => {
    return new SmzDocumentBuilder()
      .debugMode()
      .setRenderer('html2pdf')
      .setQuality(2)
      .hidePageNumbers()

      .setUnit('cm')
      .setMargins(1, 1, 1, 1)
      .setFilename('html2pdf')
      .setPage('a4', 'landscape')

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
  //
  [DemoKeys.DOCUMENTS_DEMO_3]: () => {
    return new SmzDocumentBuilder()
      .setRenderer('html2pdf')
      .setQuality(2)
      .hidePageNumbers()

      .setUnit('cm')
      .setMargins(1, 1, 1, 1)
      .setFilename('html2pdf')
      .setPage('a4', 'landscape')

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
    return buildSummaryReportDocument(payload)
  },
  //
  [DemoKeys.DOCUMENTS_PAGES]: () => {
   return new SmzDocumentBuilder()
     .setRenderer('html2pdf')
     .setQuality(2)
     .setUnit('cm')
     .setMargins(1, 1, 2, 2)
   //   .setPaddingCompensation(5)
     .setPageOverlapCompensation(1)
     .setFilename('html2pdf')
     .setPage('a4', 'portrait')
     .hidePageNumbers()

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

     // .content()
     //    .row()
     //       .hiddenBreak()
     //          .overrideStyles('bg-black')
     //          .setHiddenBreakHeight('200px')
     //          .overrideOverlapStyles('bg-black page-overlap-demo')
     //          .row
     //       .content
     //    .document

     .for([0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
     (_, item) =>
       _.content()
          .pageBreak()
          .document

       .content()

       .row()
        .subTitle(`RELAÇÃO DE ITENS - INDEX ${item}`)
              .overrideContainerStyles('smz-document-border')
           .row
       .content

       .row()
        .table()
           .overrideContainerStyles('smz-document-border')
           .setSource(DemoFeatureSelectors.all)
           .addColumn('name', 'Nome')
              .table
           .addColumn('company', 'Empresa')
              .table
           .row
       .content

       .document
     )

     .build()
 },
  //
  [DemoKeys.DOCUMENTS_INJECTABLES]: () => {
   return new SmzDocumentBuilder()
   //   .debugMode()
     .setRenderer('html2pdf')
     .setQuality(2)
     .hidePageNumbers()

     .setUnit('cm')
     .setMargins(1, 1, 1, 1)
     .setFilename('html2pdf')
     .setPage('a4', 'landscape')

     .viewer()
        .setZoom(1, 0.5, 5, 0.5)
        .allowDownload()
        .document

     .header()

       .row()
         .title('DEMO DE DOCUMENTOS COM COMPONENTS INJETADOS')
           .setBackgroundColor('#26A69A')
           .setTextColor('#212121')
           .setColspan(3)
           .row
         .content

       .document

     .content()

       .row()
         .subTitle('COMPONENTES INJETÁVEIS')
           .row
         .content

       .row()
         .component(DemoInjectable1Component)
            .addInput('title', 'Ready to dive in?')
            .addInput('subTitle', 'Start your free trial today.')
            .row
         .content

      .row()
         .component(DemoInjectable2Component)
            .setColspan(2)
            .setHeight('100px')
            .row
         .component(DemoInjectable3Component)
            .setColspan(1)
            .setHeight('100px')
            .row
         .content

      .row()
         .component(DemoInjectable4Component)
            .row
         .content

       .row()
         .spacer()
           .row
         .content

      .row()
         .table()
           .setSource(DemoFeatureSelectors.moreItems)
           .addColumn('name', 'Nome')
             .table
           .addColumn('company', 'Empresa')
             .table
            .addColumn('country.name', 'Site')
             .dataTransform((data) => `<a href="https://www.google.com/search?q=${data}" target="_blank" class="text-blue-500 font-bold hover:underline">${data}</a>`)
             .table
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

function addDocumentContent(_: SmzDocumentBuilder, includePageBreaks: boolean): SmzDocumentBuilder {
  return _

  .header()

    .row()
      .image('https://dev.varejofacil.tk/files/products/pyw937ns6zmedzf5bdmeglvcd2/8jd774ka2dgwa5bpbdnmgmt2fw/l9hyuymmyqae5qmrmbp8b7ls2a.jpg')
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
      .title('<i class="fa fa-bug mr-2"></i>ORDEM DE COMPRA 1')
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

   //  .if(includePageBreaks)
   //    .pageBreak()
   //  .endIf

    .content()
      .useFixedLayout()

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
         .setHeight('600px')
        .row
      .chart(LINE as SmzChart)
         .setHeight('600px')
        .row
      .content

    .document

   //  .if(includePageBreaks)
   //    .pageBreak()
   //  .endIf

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
         .addColumn('country.name', 'Site')
          .dataTransform((data) => `<a href="https://www.google.com/search?q=${data}">${data}</a>`)
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

const payload = {
  "filename":"20220419_Teste",
  "header":{
     "timestamp":"2022-04-19T13:11:00",
     "title":"Relatório de Resultados de Auditoria",
     "subtitle":"Teste"
  },
  "summary":{
     "title":"Resultados Atuais",
     "headers":[
        {
           "name":"Descrição",
           "property":"title"
        },
        {
           "name":"Problemas",
           "property":"issuesFound"
        }
     ],
     "data":[
        {
           "title":"Cabos sem instrumento",
           "auditedElements":null,
           "issuesFound":60,
           "issueRatio":null
        },
        {
           "title":"Campos obrigatórios associados a cabos",
           "auditedElements":null,
           "issuesFound":0,
           "issueRatio":null
        },
        {
           "title":"Campos obrigatórios associados a painéis",
           "auditedElements":null,
           "issuesFound":7500,
           "issueRatio":null
        },
        {
           "title":"Control System Tags não associados a Tags",
           "auditedElements":null,
           "issuesFound":320,
           "issueRatio":null
        },
        {
           "title":"Convenção de Nomes",
           "auditedElements":null,
           "issuesFound":2000,
           "issueRatio":null
        },
        {
           "title":"Equipamentos duplicados",
           "auditedElements":null,
           "issuesFound":4,
           "issueRatio":null
        },
        {
           "title":"Equipamentos sem tags associados",
           "auditedElements":null,
           "issuesFound":1,
           "issueRatio":null
        },
        {
           "title":"Estrutura de Projeto",
           "auditedElements":null,
           "issuesFound":5,
           "issueRatio":null
        },
        {
           "title":"Fluxogramas sem tags associados",
           "auditedElements":null,
           "issuesFound":5,
           "issueRatio":null
        },
        {
           "title":"Folhas de Dados que não obedecem a N1710",
           "auditedElements":null,
           "issuesFound":320,
           "issueRatio":null
        },
        {
           "title":"Instrumentos Cancelados",
           "auditedElements":null,
           "issuesFound":700,
           "issueRatio":null
        },
        {
           "title":"Instrumentos com Spec e sem FD associada",
           "auditedElements":null,
           "issuesFound":2,
           "issueRatio":null
        },
        {
           "title":"Instrumentos sem Hook-up",
           "auditedElements":null,
           "issuesFound":350,
           "issueRatio":null
        },
        {
           "title":"Instrumentos sem Spec e sem FD associadas",
           "auditedElements":null,
           "issuesFound":500,
           "issueRatio":null
        },
        {
           "title":"Isométricos não emitidos",
           "auditedElements":null,
           "issuesFound":79,
           "issueRatio":null
        },
        {
           "title":"Linhas com erro de dimensão",
           "auditedElements":null,
           "issuesFound":75,
           "issueRatio":null
        },
        {
           "title":"Linhas com erro no pipe class",
           "auditedElements":null,
           "issuesFound":50,
           "issueRatio":null
        },
        {
           "title":"Linhas sem tags associados",
           "auditedElements":null,
           "issuesFound":6,
           "issueRatio":null
        },
        {
           "title":"Lista de Tags por Loop",
           "auditedElements":null,
           "issuesFound":1785,
           "issueRatio":null
        },
        {
           "title":"Localização dos Instrumentos",
           "auditedElements":null,
           "issuesFound":99,
           "issueRatio":null
        },
        {
           "title":"Malhas com erros típicos",
           "auditedElements":null,
           "issuesFound":0,
           "issueRatio":null
        },
        {
           "title":"Malhas duplicadas",
           "auditedElements":null,
           "issuesFound":19,
           "issueRatio":null
        },
        {
           "title":"Malhas sem loop drawing associado",
           "auditedElements":null,
           "issuesFound":320,
           "issueRatio":null
        },
        {
           "title":"Malhas sem tags associados",
           "auditedElements":null,
           "issuesFound":29,
           "issueRatio":null
        },
        {
           "title":"Mapeamento de I/O",
           "auditedElements":null,
           "issuesFound":3,
           "issueRatio":null
        },
        {
           "title":"Multicabo conectados a mais de 2 painéis diferentes",
           "auditedElements":null,
           "issuesFound":1500,
           "issueRatio":null
        },
        {
           "title":"Painéis duplicados",
           "auditedElements":null,
           "issuesFound":65,
           "issueRatio":null
        },
        {
           "title":"Perfil com CS Tag porém sem definição de I/O",
           "auditedElements":null,
           "issuesFound":90,
           "issueRatio":null
        },
        {
           "title":"Perfis com Localização = ECOS, SOS ou PLC, porém com Wiring",
           "auditedElements":null,
           "issuesFound":25,
           "issueRatio":null
        },
        {
           "title":"Perfis com WIRING e sem Device Panel",
           "auditedElements":null,
           "issuesFound":3,
           "issueRatio":null
        },
        {
           "title":"Perfis com WIRING porém sem definição de I/O",
           "auditedElements":null,
           "issuesFound":60,
           "issueRatio":null
        },
        {
           "title":"Perfis sem preenchimento",
           "auditedElements":null,
           "issuesFound":25,
           "issueRatio":null
        },
        {
           "title":"Perfis Sem Wiring e I/O definidos",
           "auditedElements":null,
           "issuesFound":80,
           "issueRatio":null
        },
        {
           "title":"Quantidade de painéis um multicabo (conectado a dois ou mais) esta conectado",
           "auditedElements":null,
           "issuesFound":77,
           "issueRatio":null
        },
        {
           "title":"Tags associados a Tipos de instrumento errados",
           "auditedElements":null,
           "issuesFound":0,
           "issueRatio":null
        },
        {
           "title":"Tags com erros típicos",
           "auditedElements":null,
           "issuesFound":3,
           "issueRatio":null
        },
        {
           "title":"Tags duplicados",
           "auditedElements":null,
           "issuesFound":116,
           "issueRatio":null
        },
        {
           "title":"Tags não associados a Control System Tag",
           "auditedElements":null,
           "issuesFound":0,
           "issueRatio":null
        },
        {
           "title":"Tags que não deveriam pertencer a uma malha",
           "auditedElements":null,
           "issuesFound":531,
           "issueRatio":null
        },
        {
           "title":"Tipos de I/O",
           "auditedElements":null,
           "issuesFound":3,
           "issueRatio":null
        },
        {
           "title":"Tipos de instrumento duplicados",
           "auditedElements":null,
           "issuesFound":250,
           "issueRatio":null
        }
     ]
  },
  "history":{
     "title":"Histórico e Evolução",
     "charts":[
        {
           "title":"Isométricos não emitidos",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":29
                          },
                          {
                             "x":"15-02-22",
                             "y":38
                          },
                          {
                             "x":"11-03-22",
                             "y":60
                          },
                          {
                             "x":"19-04-22",
                             "y":79
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Cabos sem instrumento",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":52
                          },
                          {
                             "x":"15-02-22",
                             "y":66
                          },
                          {
                             "x":"11-03-22",
                             "y":80
                          },
                          {
                             "x":"19-04-22",
                             "y":60
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Campos obrigatórios associados a cabos",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":0
                          },
                          {
                             "x":"15-02-22",
                             "y":1
                          },
                          {
                             "x":"11-03-22",
                             "y":3
                          },
                          {
                             "x":"19-04-22",
                             "y":0
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Campos obrigatórios associados a painéis",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":3500
                          },
                          {
                             "x":"15-02-22",
                             "y":4647
                          },
                          {
                             "x":"11-03-22",
                             "y":7500
                          },
                          {
                             "x":"19-04-22",
                             "y":7500
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Control System Tags não associados a Tags",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":750
                          },
                          {
                             "x":"15-02-22",
                             "y":593
                          },
                          {
                             "x":"11-03-22",
                             "y":650
                          },
                          {
                             "x":"19-04-22",
                             "y":320
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Convenção de Nomes",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":3122
                          },
                          {
                             "x":"15-02-22",
                             "y":2944
                          },
                          {
                             "x":"11-03-22",
                             "y":1500
                          },
                          {
                             "x":"19-04-22",
                             "y":2000
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Equipamentos duplicados",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":0
                          },
                          {
                             "x":"15-02-22",
                             "y":2
                          },
                          {
                             "x":"11-03-22",
                             "y":4
                          },
                          {
                             "x":"19-04-22",
                             "y":4
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Equipamentos sem tags associados",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":19
                          },
                          {
                             "x":"15-02-22",
                             "y":41
                          },
                          {
                             "x":"11-03-22",
                             "y":35
                          },
                          {
                             "x":"19-04-22",
                             "y":1
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Estrutura de Projeto",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":3
                          },
                          {
                             "x":"15-02-22",
                             "y":72
                          },
                          {
                             "x":"11-03-22",
                             "y":80
                          },
                          {
                             "x":"19-04-22",
                             "y":5
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Fluxogramas sem tags associados",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":10
                          },
                          {
                             "x":"15-02-22",
                             "y":4
                          },
                          {
                             "x":"11-03-22",
                             "y":10
                          },
                          {
                             "x":"19-04-22",
                             "y":5
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Folhas de Dados que não obedecem a N1710",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":475
                          },
                          {
                             "x":"15-02-22",
                             "y":355
                          },
                          {
                             "x":"11-03-22",
                             "y":250
                          },
                          {
                             "x":"19-04-22",
                             "y":320
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Instrumentos Cancelados",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":600
                          },
                          {
                             "x":"15-02-22",
                             "y":771
                          },
                          {
                             "x":"11-03-22",
                             "y":833
                          },
                          {
                             "x":"19-04-22",
                             "y":700
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Instrumentos com Spec e sem FD associada",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":12
                          },
                          {
                             "x":"15-02-22",
                             "y":0
                          },
                          {
                             "x":"11-03-22",
                             "y":6
                          },
                          {
                             "x":"19-04-22",
                             "y":2
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Instrumentos sem Hook-up",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":630
                          },
                          {
                             "x":"15-02-22",
                             "y":752
                          },
                          {
                             "x":"11-03-22",
                             "y":300
                          },
                          {
                             "x":"19-04-22",
                             "y":350
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Instrumentos sem Spec e sem FD associadas",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":119
                          },
                          {
                             "x":"15-02-22",
                             "y":287
                          },
                          {
                             "x":"11-03-22",
                             "y":222
                          },
                          {
                             "x":"19-04-22",
                             "y":500
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Linhas com erro de dimensão",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":233
                          },
                          {
                             "x":"15-02-22",
                             "y":334
                          },
                          {
                             "x":"11-03-22",
                             "y":112
                          },
                          {
                             "x":"19-04-22",
                             "y":75
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Linhas com erro no pipe class",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":450
                          },
                          {
                             "x":"15-02-22",
                             "y":334
                          },
                          {
                             "x":"11-03-22",
                             "y":123
                          },
                          {
                             "x":"19-04-22",
                             "y":50
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Linhas sem tags associados",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":10
                          },
                          {
                             "x":"15-02-22",
                             "y":13
                          },
                          {
                             "x":"11-03-22",
                             "y":5
                          },
                          {
                             "x":"19-04-22",
                             "y":6
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Lista de Tags por Loop",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":333
                          },
                          {
                             "x":"15-02-22",
                             "y":334
                          },
                          {
                             "x":"11-03-22",
                             "y":1785
                          },
                          {
                             "x":"19-04-22",
                             "y":1785
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Localização dos Instrumentos",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":24
                          },
                          {
                             "x":"15-02-22",
                             "y":28
                          },
                          {
                             "x":"11-03-22",
                             "y":99
                          },
                          {
                             "x":"19-04-22",
                             "y":99
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Malhas com erros típicos",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":0
                          },
                          {
                             "x":"15-02-22",
                             "y":0
                          },
                          {
                             "x":"11-03-22",
                             "y":1
                          },
                          {
                             "x":"19-04-22",
                             "y":0
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Malhas duplicadas",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":33
                          },
                          {
                             "x":"15-02-22",
                             "y":48
                          },
                          {
                             "x":"11-03-22",
                             "y":19
                          },
                          {
                             "x":"19-04-22",
                             "y":19
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Malhas sem loop drawing associado",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":299
                          },
                          {
                             "x":"15-02-22",
                             "y":279
                          },
                          {
                             "x":"11-03-22",
                             "y":333
                          },
                          {
                             "x":"19-04-22",
                             "y":320
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Malhas sem tags associados",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":112
                          },
                          {
                             "x":"15-02-22",
                             "y":38
                          },
                          {
                             "x":"11-03-22",
                             "y":25
                          },
                          {
                             "x":"19-04-22",
                             "y":29
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Mapeamento de I/O",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":13
                          },
                          {
                             "x":"15-02-22",
                             "y":17
                          },
                          {
                             "x":"11-03-22",
                             "y":10
                          },
                          {
                             "x":"19-04-22",
                             "y":3
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Multicabo conectados a mais de 2 painéis diferentes",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":350
                          },
                          {
                             "x":"15-02-22",
                             "y":599
                          },
                          {
                             "x":"11-03-22",
                             "y":700
                          },
                          {
                             "x":"19-04-22",
                             "y":1500
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Painéis duplicados",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":30
                          },
                          {
                             "x":"15-02-22",
                             "y":37
                          },
                          {
                             "x":"11-03-22",
                             "y":59
                          },
                          {
                             "x":"19-04-22",
                             "y":65
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Perfil com CS Tag porém sem definição de I/O",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":89
                          },
                          {
                             "x":"15-02-22",
                             "y":68
                          },
                          {
                             "x":"11-03-22",
                             "y":75
                          },
                          {
                             "x":"19-04-22",
                             "y":90
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Perfis com Localização = ECOS, SOS ou PLC, porém com Wiring",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":40
                          },
                          {
                             "x":"15-02-22",
                             "y":20
                          },
                          {
                             "x":"11-03-22",
                             "y":39
                          },
                          {
                             "x":"19-04-22",
                             "y":25
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Perfis com WIRING e sem Device Panel",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":5
                          },
                          {
                             "x":"15-02-22",
                             "y":0
                          },
                          {
                             "x":"11-03-22",
                             "y":3
                          },
                          {
                             "x":"19-04-22",
                             "y":3
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Perfis com WIRING porém sem definição de I/O",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":30
                          },
                          {
                             "x":"15-02-22",
                             "y":33
                          },
                          {
                             "x":"11-03-22",
                             "y":49
                          },
                          {
                             "x":"19-04-22",
                             "y":60
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Perfis sem preenchimento",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":5
                          },
                          {
                             "x":"15-02-22",
                             "y":0
                          },
                          {
                             "x":"11-03-22",
                             "y":9
                          },
                          {
                             "x":"19-04-22",
                             "y":25
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Perfis Sem Wiring e I/O definidos",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":353
                          },
                          {
                             "x":"15-02-22",
                             "y":66
                          },
                          {
                             "x":"11-03-22",
                             "y":75
                          },
                          {
                             "x":"19-04-22",
                             "y":80
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Quantidade de painéis um multicabo (conectado a dois ou mais) esta conectado",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":150
                          },
                          {
                             "x":"15-02-22",
                             "y":199
                          },
                          {
                             "x":"11-03-22",
                             "y":600
                          },
                          {
                             "x":"19-04-22",
                             "y":77
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Tags associados a Tipos de instrumento errados",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":300
                          },
                          {
                             "x":"15-02-22",
                             "y":273
                          },
                          {
                             "x":"11-03-22",
                             "y":112
                          },
                          {
                             "x":"19-04-22",
                             "y":0
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Tags com erros típicos",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":5
                          },
                          {
                             "x":"15-02-22",
                             "y":0
                          },
                          {
                             "x":"11-03-22",
                             "y":0
                          },
                          {
                             "x":"19-04-22",
                             "y":3
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Tags duplicados",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":116
                          },
                          {
                             "x":"15-02-22",
                             "y":116
                          },
                          {
                             "x":"11-03-22",
                             "y":116
                          },
                          {
                             "x":"19-04-22",
                             "y":116
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Tags não associados a Control System Tag",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":3
                          },
                          {
                             "x":"15-02-22",
                             "y":0
                          },
                          {
                             "x":"11-03-22",
                             "y":0
                          },
                          {
                             "x":"19-04-22",
                             "y":0
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Tags que não deveriam pertencer a uma malha",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":471
                          },
                          {
                             "x":"15-02-22",
                             "y":531
                          },
                          {
                             "x":"11-03-22",
                             "y":531
                          },
                          {
                             "x":"19-04-22",
                             "y":531
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Tipos de I/O",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":30
                          },
                          {
                             "x":"15-02-22",
                             "y":24
                          },
                          {
                             "x":"11-03-22",
                             "y":3
                          },
                          {
                             "x":"19-04-22",
                             "y":3
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        },
        {
           "title":"Tipos de instrumento duplicados",
           "data":{
              "data":{
                 "datasets":[
                    {
                       "type":"line",
                       "fill":false,
                       "backgroundColor":"#b71c1c77",
                       "borderColor":"#b71c1c",
                       "borderWidth":2,
                       "pointBackgroundColor":"#b71c1c",
                       "pointBorderColor":"#b71c1c",
                       "tension":0,
                       "data":[
                          {
                             "x":"23-01-22",
                             "y":1601
                          },
                          {
                             "x":"15-02-22",
                             "y":1529
                          },
                          {
                             "x":"11-03-22",
                             "y":250
                          },
                          {
                             "x":"19-04-22",
                             "y":250
                          }
                       ],
                       "id":"Problemas",
                       "label":"Problemas",
                       "normalized":true,
                       "order":0
                    }
                 ],
                 "labels":[
                    "23-01-22",
                    "15-02-22",
                    "11-03-22",
                    "19-04-22"
                 ]
              },
              "type":"line",
              "config":{
                 "responsive":true,
                 "interaction":{
                    "intersect":false,
                    "mode":"nearest",
                    "axis":"xy"
                 },
                 "scales":{
                    "y":{
                       "display":true,
                       "min":0,
                       "position":"left"
                    }
                 },
                 "plugins":{
                    "tooltip":{
                       "intersect":false,
                       "enabled":true,
                       "mode":"nearest"
                    },
                    "legend":{
                       "display":false
                    }
                 }
              },
              "allowEmpty":false
           }
        }
     ]
  }
}