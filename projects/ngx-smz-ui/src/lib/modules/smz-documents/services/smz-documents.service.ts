import { Injectable } from '@angular/core';
import { PdfMakeScriptService } from './pdfmake-script.service';

const INITIAL_ZOOM = 1.5;

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

  public generatePdf(action: 'open' | 'print' | 'download') {
    console.log(this.pdfMakeService.pdfMake);
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'open': this.pdfMakeService.pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': this.pdfMakeService.pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': this.pdfMakeService.pdfMake.createPdf(documentDefinition).download(); break;

      default: this.pdfMakeService.pdfMake.createPdf(documentDefinition).open(); break;
    }

  }

  getDocumentDefinition() {

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
