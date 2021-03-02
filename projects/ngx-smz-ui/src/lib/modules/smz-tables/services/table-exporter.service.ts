// import { CurrencyPipe, DOCUMENT } from "@angular/common";
// import { Inject, Injectable, Renderer2 } from "@angular/core";
// import jsPDF, { jsPDFOptions } from "jspdf";
// import autoTable, {
//   CellInput,
//   ColumnInput,
//   RowInput,
//   UserOptions,
// } from "jspdf-autotable";
// import isDate from "lodash-es/isDate";
// import * as moment from "moment";
// import { SmzControlType } from 'ngx-smz-dialogs';
// import { SmzTableContext } from '../models/table-config';

// // @UntilDestroy()
// @Injectable({
//   providedIn: "root",
// })
// export class TableExporterService {
//   public renderer2: Renderer2;
//   constructor(@Inject(DOCUMENT) private document: Document) { }

//   public exportPdf(
//     primeComponent: any,
//     context: SmzTableContext,
//     items: any[],
//     title: string
//   ): void {
//     // console.log(primeTable);

//     const elements = primeComponent.el.nativeElement.querySelectorAll("table");
//     const tableElement = elements.length === 3 ? elements[1].cloneNode(true) : elements[0].cloneNode(true);
//     const summaryElement = elements.length === 3 ? elements[2] : null;

//     // this.renderer2.setAttribute(table.el, 'id', 'myTableId');

//     // console.log(this.document);
//     // const elem = document.documentElement;
//     // console.log(elem);

//     // console.log('primeComponent', primeComponent);
//     console.log('tableElement', tableElement);
//     // const primeId = primeComponent.el.nativeElement.id;
//     // const exportId = UUID.UUID().split('-').join('');

//     // const primeTable = document.querySelector(`#${primeId}`);
//     // console.log('primeTable', primeTable);
//     // const allTables = primeTable.querySelectorAll('table');
//     // console.log('allTables', allTables);

//     // allTables[1].setAttribute('id', exportId);

//     // console.log("columns", data);
//     // console.log("items", items);

//     let reponsiveElements = tableElement.getElementsByClassName('p-column-title');

//     if (reponsiveElements != null) {
//       while (reponsiveElements[0]) {
//         reponsiveElements[0].parentNode.removeChild(reponsiveElements[0]);
//       }
//     }

//     const head = this.headRows(context);
//     const foot = this.footRows(context, items);
//     const columns = this.columns(context);
//     const body = this.data(context, items);

//     // console.log("head", head);
//     // console.log("foot", foot);
//     // console.log("columns", columns);
//     // console.log("body", body);

//     const docOptions: jsPDFOptions = {
//       orientation: "landscape",
//       unit: "mm",
//     };

//     const doc = new jsPDF(docOptions);

//     const options: UserOptions = {
//       head,
//       // body,
//       columns,
//       foot,
//       startY: 17,
//       showHead: "everyPage",
//       theme: "striped",
//       pageBreak: "auto",
//       tableWidth: "wrap",
//       showFoot: "lastPage",
//       didParseCell: function (data) {
//         data.cell.text = data.cell.text.map((t) => {
//           // console.log('t', t, t.split('&nbsp;').join(''));
//           return t.split('&nbsp;').join('');
//         });
//       },
//       html: tableElement,
//     };

//     if (title != null) doc.text(title, 14, 12);

//     autoTable(doc, options);

//     if (summaryElement != null) {
//       // console.log('...summaryElement');
//       const optionsSummary: UserOptions = {
//         html: summaryElement,
//       };

//       autoTable(doc, optionsSummary);
//     }


//     doc.save(`${title}.pdf`);
//   }

//   private headRows(context: SmzTableContext): RowInput[] {
//     const result: { [key: string]: CellInput }[] = [];

//     context.columns.forEach((c) => {
//       result[c.field] = c.header;
//     });

//     return result;
//   }

//   private footRows(
//     context: SmzTableContext,
//     items: any[]
//   ): RowInput[] {
//     const result: { [key: string]: CellInput }[] = [];

//     context.columns.forEach((c) => {
//       result[c.field] = c.header;
//     });

//     return result;
//   }

//   private columns(context: SmzTableContext): ColumnInput[] {
//     return context.columns
//       .filter((x) => x.isVisible && x.field !== '')
//       .map((x) => ({
//         dataKey: x.field,
//         header: x.header,
//       }));
//   }

//   private data(
//     context: SmzTableContext,
//     items: any[]
//   ): RowInput[] {
//     const result = items.map((x) => {
//       // console.log("----------");
//       const item = {};

//       context.columns.forEach((c) => {
//         const field = c.field;

//         const data = Reflect.get(x, field);
//         item[field] = this.formatData(data, c.contentType);
//       });

//       return item;
//     });

//     return result;
//   }

//   private formatData(data: any, contentType: SmzControlType): string {

//     if (isDate(data)) {
//       return moment(data).format("DD-MM-YYYY");
//     }

//     if (contentType == null) return data;

//     switch (contentType) {
//       case SmzControlType.CURRENCY:
//         let currencyPipe = new CurrencyPipe("pt-BR");
//         // console.log('currencyPipe', currencyPipe);

//         let formattedNumber = currencyPipe.transform(
//           Math.abs(Number(data)) as any,
//           "BRL",
//           "symbol"
//         );
//         return formattedNumber;

//       default:
//         return data;
//     }
//   }
// }
