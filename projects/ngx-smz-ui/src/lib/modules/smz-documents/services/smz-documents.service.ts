import { ElementRef, Injectable } from '@angular/core';
import { PdfMakeScriptService } from './pdfmake-script.service';
import { HTMLOptions, jsPDF, jsPDFOptions } from "jspdf";

const INITIAL_ZOOM = 1;

@Injectable({providedIn: 'root'})
export class SmzDocumentsService
{
  public showDownloadControl: boolean; // deixar o usuário baixar o pdf
  public showExportControl: boolean; // exportar o pdf em formato blob para o component pai
  public zoom = INITIAL_ZOOM;

  constructor(private pdfMakeService: PdfMakeScriptService)
  {
      this.zoom = INITIAL_ZOOM;

      this.showDownloadControl = true;
      this.showExportControl = true;
  }

  public generatePdf(action: 'open' | 'print' | 'download', element: ElementRef) {

    // const document = this.getDocumentWithHtmlToPdfMake(element.nativeElement);

    // console.log('document', document);

    // switch (action) {
    //   case 'open': this.pdfMakeService.pdfMake.createPdf(document).open(); break;
    //   case 'print': this.pdfMakeService.pdfMake.createPdf(document).print(); break;
    //   case 'download': this.pdfMakeService.pdfMake.createPdf(document).download(); break;
    // }


    // const document = this.getDocumentWithHtml2Canvas(element.nativeElement, (document) => {
    //     console.log('document', document);

    //     switch (action) {
    //       case 'open': this.pdfMakeService.pdfMake.createPdf(document).open(); break;
    //       case 'print': this.pdfMakeService.pdfMake.createPdf(document).print(); break;
    //       case 'download': this.pdfMakeService.pdfMake.createPdf(document).download(); break;
    //     }
    // });

    const docOptions: jsPDFOptions = {
      orientation: "portrait",
      unit: "pt",
      format: 'A4',
      userUnit: 1,
      precision: 2,
      compress: true,
      putOnlyUsedFonts: true
    };

    const doc = new jsPDF(docOptions)

    const margin = 15;
    const options: HTMLOptions = {
      width: 595.276 - (margin * 2),
      windowWidth: (595.276 - (margin * 2)) * 1.5,
      margin: margin,
      autoPaging: true,
      x: 0,
      y: 0,
      html2canvas: {
        svgRendering: true
      }
    };

    doc.addFont('assets/fonts/Roboto-Thin.ttf', 'Thin', 'normal', 100);
    doc.addFont('assets/fonts/Roboto-Light.ttf', 'Light', 'normal', 300);
    doc.addFont('assets/fonts/Roboto-Regular.ttf', 'Roboto', 'normal', 400);
    doc.addFont('assets/fonts/Roboto-Medium.ttf', 'Medium', 'normal', 500);
    doc.addFont('assets/fonts/Roboto-Bold.ttf', 'Bold', 'normal', 700);

    doc.html(element.nativeElement, options).then(() => {


        switch (action) {
          case 'open': {
            doc.output('dataurlnewwindow');
            break;
          }
          // case 'print': this.pdfMakeService.pdfMake.createPdf(document).print(); break;
          case 'download': doc.save('teste.pdf'); break;
        }
    });

  }

  public getDocumentWithHtmlToPdfMake(html: any): any {
    return { content: this.pdfMakeService.htmlToPdfmake(html.innerHTML) };
  }

  public getDocumentWithHtml2Canvas(html: any, callback: (document) => void): void {

    this.pdfMakeService.html2canvas(html).then(
      (canvas) => {
        console.log('canvas', canvas);
        var data = canvas.toDataURL();
        var docDefinition = {
            content: [{
                image: data,
                width: 500,
            }]
        };

        callback(docDefinition);
    }
    );

  }

  public getDocumentDefinition(): any {

    return {
      content: [
        {
          text: 'RESUME',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
      ],
      info: {
        title: 'title',
        author: 'author',
        subject: 'RESUME',
        keywords: 'RESUME, ONLINE RESUME',
      },
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 20, 0, 10],
            decoration: 'underline'
          },
          name: {
            fontSize: 16,
            bold: true
          },
          jobTitle: {
            fontSize: 14,
            bold: true,
            italics: true
          },
          sign: {
            margin: [0, 50, 0, 10],
            alignment: 'right',
            italics: true
          },
          tableHeader: {
            bold: true,
          }
        }
    };
  }

}
